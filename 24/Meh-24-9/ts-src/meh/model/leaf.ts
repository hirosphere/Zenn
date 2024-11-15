import { log } from "../common.js" ;


/* W/R 実体生成 */

export function leaf < V > ( value : V , branch ? : leaf.branch < V > ) : leaf < V >
{
	return new leaf.Entity ( value , branch ) ;
}

export namespace leaf
{
	export const str = leaf < string > ;
	export const num = leaf < number > ;
	export const bool = leaf < boolean > ;

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

export interface leaf < V > extends leaf.r < V >
{
	get value () : V ;
	set value ( value : V ) ;

	set ( value : V , changer ? : object ) : void ;
	cv < R >
	(
		to_ref : leaf.conv < V , R > ,
		to_src ? : leaf.conv < R , V >

	) : leaf < R > ;
}

export namespace leaf
{
	export type str = leaf < string > ;
	export type num = leaf < number > ;
	export type bool = leaf < boolean > ;
}

export namespace leaf
{
	export type ll < V > = leaf < V > | V ;

	export namespace ll
	{
		export type str = ll < string > ;
		export type num = ll < number > ;
		export type bool = ll < boolean > ;
	}
}

/* readonly */

export namespace leaf
{
	/* R 実体生成 */

	export function r < V > ( value : V , branch ? : leaf.branch < V > ) : r < V >
	{
		return new leaf.Entity ( value , branch ) ;
	}

	export namespace r
	{
		export const str = r < string > ;
		export const num = r < number > ;
		export const bool = r < boolean > ;
	}
	
	/* R 型定義 */

	export interface r < V >
	{
		add_ref ( ref : leaf.ref < V > , old_v ? : V ) : void ;
		remove_ref ( ref : leaf.ref < V > ) : void ;

		get value () : V ;
		[ set_value ] ( value : V , changer ? : object ) : void ;
		
		mk_str ( to_cv ? : ( src : V ) => string ) : leaf.str ;
		cv < R >
		(
			to_ref : leaf.conv < V , R > ,
	
		) : r < R > ;
	}

	export namespace r
	{
		export type str = r < string > ;
		export type num = r < number > ;
		export type bool = r < boolean > ;
	}

	export namespace r
	{
		export type ll < V > = r < V > | V ;

		export namespace ll
		{
			export type str = ll < string > ;
			export type num = ll < number > ;
			export type bool = ll < boolean > ;
		}	
	}
}

/* */

export namespace leaf
{
	/* 基底抽象クラス */

	export abstract class Src < V > implements leaf < V >
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
		public abstract set value ( value : V ) ;

		public abstract set ( value : V , changer ? : object ) : void ;

		public [ set_value ] ( new_v: V , changer ? : object ) : void
		{
			this.set ( new_v , changer ) ;
		}

		/* */

		public mk_str
		(
			to_cv : conv < V , string > = def_to_str < V >
		
		) : leaf < string >
		{
			return new Conv < V , string > ( this , to_cv ) ;
		}

		public cv < R > ( to_ref : conv < V , R > , to_src ? : conv < R , V > ) : leaf < R >
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

		public override set value ( new_v : V )
		{
			this.set ( new_v )
		}

		public override set( new_v: V , changer ? : object ) : void
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
		constructor
		(
			protected src : Src < S > ,
			protected to_ref : conv < S , R > ,
			protected to_src ? : conv < R , S >
		)
		{
			super () ;
			src.add_ref( this ) ;
		}

		/* value */

		public override get value () : R
		{
			return this.to_ref ( this.src.value ) ;
		}

		public override set value ( new_v : R )
		{ /* 未実装 */ }

		public override set ( value : R, changer ? : object ) : void
		{
			/* 未実装 */ ;
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

	export type conv < S ,R > = ( s : S ) => R ;

	/* */

	export const ref = < V >
	(
		src : leaf < V > ,
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
			protected src : leaf < V > ,
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
