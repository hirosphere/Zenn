import { log } from "../common.js" ;


/* Read Only 実体生成 */

export function leafr < V > ( value : V , branch ? : leafr.branch < V > ) : leafr < V >
{
	return new leafr.Entity ( value , branch ) ;
}

export type leafr < V > = leafr.Src < V > ;

export namespace leafr
{
	export const str = leafr < string > ;
	export const num = leafr < number > ;
	export const bool = leafr < boolean > ;

	export const get = < V > ( ll : ll < V > ) =>
	{
		return ll instanceof Src ? ll.value : ll ;
	}

	export const mk_str = < V > ( ll : ll < V > ) =>
	{
		// log ( ll instanceof Source , get ( ll ) )

		return ( ll instanceof Src ) ? ll.mk_str() : String( ll ) ;
	}
}

/* W/R 型定義 */

export const set_value = Symbol() ;

export namespace leafr
{
	export type str = leafr < string > ;
	export type num = leafr < number > ;
	export type bool = leafr < boolean > ;
}

export namespace leafr
{
	export function ll < V > ( ll : ll < V > ) : leafr < V >
	{
		return ll instanceof leafr.Src ? ll : leafr ( ll ) ;
	}

	export type ll < V > = leafr < V > | V ;

	export namespace ll
	{
		export function make < V > ( ll :  ll < V > ) : leafr < V >
		{
			return ll instanceof leafr.Src ? ll : leafr ( ll ) ;
		}

		export type str = ll < string > ;
		export type num = ll < number > ;
		export type bool = ll < boolean > ;
	}
}


/* 実装 */

export namespace leafr
{
	/* 基底抽象クラス */

	export abstract class Src < V >
	{
		/* ref */

		protected refs = new Set < ref < V > > ;

		public add_ref ( ref : ref < V > , old_v ? : V ) : void
		{
			this.refs.add ( ref ) ;
			ref.src_value_change ( this.value , old_v ) ;
		}

		public remove_ref ( ref : ref < V > ) : void
		{
			this.refs.delete ( ref );
		}

		/* value */

		public abstract get value () : V ;

		public abstract [ set_value ] ( new_v: V , changer ? : object ) : void ;

		/* */

		public mk_str
		(
			to_cv : conv < V , string > = def_to_str < V >
		
		) : leafr < string >
		{
			return new Conv < V , string > ( this , to_cv ) ;
		}

		public conv < R > ( to_ref : conv < V , R > , to_src ? : conv < R , V > ) : leafr < R >
		{
			return new Conv ( this , to_ref , to_src ) ;
		}
	}

	/* 値実体クラス */

	export class Entity < V > extends Src < V >
	{
		constructor
		(
			protected p_value : V ,
			protected p_branch ? : branch < V >
		)
		{
			super () ;
		}

		/* value */

		public override get value ()
		{
			return this.p_value ;
		}

		public override [ set_value ] ( new_v: V , changer ? : object ) : void
		{
			if( new_v === this.p_value )  return ;

			const old_v = this.p_value ;
			this.p_value = new_v ;

			if( changer != this.p_branch )
			{
				this.p_branch?.update ( new_v , old_v ) ;
			}

			this.refs.forEach
			(
				ref => ref != changer && 
				(
					ref.src_value_change ( new_v , old_v )
				)
			);
		}
	}

	const def_to_str = < V > ( src : V ) => String ( src ) ;



	
	/* 参照・変換クラス */

	export class Conv < S , R = S > extends Src < R >
	{
		protected p_src : leafr < S > ;

		constructor
		(
			src : leafr < S > ,
			protected to_ref : conv < S , R > ,
			protected to_src ? : conv < R , S >
		)
		{
			super () ;
			this.p_src = src ;
			src.add_ref ( this ) ;
		}

		/* source */

		public set src ( new_s : leafr < S > )
		{
			if( new_s == this.p_src )  return ;

			const old_s = this.p_src ;
			this.p_src = new_s ;
			
			old_s ?.remove_ref ( this );
			new_s ?.add_ref ( this , old_s ?.value ) ;
		}

		/* value */

		public override get value () : R
		{
			return this.to_ref ( this.p_src.value ) ;
		}

		public override [ set_value ] ( new_v: R , changer ? : object ) : void
		{
			this.to_src && this.p_src [ set_value ] ( this.to_src ( new_v ) , changer ) ;
		}

		/* */

		public src_value_change ( new_v : S , old_v ? : S )
		{
			const new_rv = this.to_ref ( new_v ) ;
			const old_rv = old_v === undefined ? undefined : this.to_ref ( old_v ) ;

			this.refs.forEach
			(
				ref => ref.src_value_change ( new_rv , old_rv )
			);
		}
	}

	export type conv < S , R > = ( value : S ) => R ;
	
}


export namespace leafr
{
	/* */

	export const ref = < V >
	(
		src : leafr < V > ,
		src_value_change : update < V >
	
	) : ref < V > => new Ref ( src , src_value_change ) ;

	export interface ref < V >
	{
		src_value_change : update < V > ;
		src_term ? () : void ;
		term ? () : void ;
	}

	export class Ref < V > implements ref < V >
	{
		constructor
		(
			protected src : leafr < V > ,
			public src_value_change : update < V > ,
		)
		{
			src ?.add_ref ( this ) ;
		}

		public term ? () : void
		{
			this.src ?.remove_ref ( this ) ;
		}
	}

	/* */

	export type update < V > = ( new_v : V , old_v ? : V ) => void ;
	export type update_ref < V > = ( new_v ? : V , old_v ? : V ) => void ;

	export interface branch < V >
	{
		update : update < V > ;
	}
}
