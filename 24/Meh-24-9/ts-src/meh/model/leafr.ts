import { log } from "../common.js" ;

export const set_value = Symbol() ;

export abstract class Leafr < V >
{
	protected p_refs = new Set < Leafr.Ref < V > > ;

	public add_ref ( ref : Leafr.Ref< V > ) : void
	{
		this.p_refs.add ( ref );
		ref.value_change ( this.value ) ;
	}

	public remove_ref ( ref : Leafr.Ref < V > ) : void
	{
		this.p_refs.delete( ref );
	}

	public abstract get value () : V ;
}


export namespace Leafr
{
	export type Rel = { update : () => void } ;
	export type update < V > = ( new_v : V , old_v ? : V ) => void ;
}


export namespace Leafr
{
	export class Ref < V >
	{
		constructor
		(
			protected src : Leafr < V > | undefined ,
			public readonly value_change : update < V >
		)
		{
			src?.add_ref ( this ) ;
		}

		public terminate()
		{
			this.src ?.remove_ref ( this ) ;
			this.src = undefined ;
		}
	}
}

export namespace Leafr
{
	export class Entity < V > extends Leafr < V >
	{
		constructor
		(
			protected p_value : V ,
			protected p_rel ? : Rel
		)
		{ super(); }

		public override get value () : V
		{
			return this.p_value ;
		}

		public [ set_value ] ( new_v : V, is_permeating ? : boolean ) : void
		{
			if( new_v === this.p_value )  return ;

			const old_v = this.p_value ;
			this.p_value = new_v ;

			( ! is_permeating ) && this.p_rel ?.update () ;

			this.p_refs.forEach
			(
				ref =>
				{
					ref.value_change ( new_v , old_v ) ;
				}
			);
		}
	}
}

export namespace Leafr
{
	export class Converter < S , R = S > extends Leafr < R >
	{
		constructor
		(
			protected src : Leafr < S > ,
			protected to_ref : ( value : S ) => R
		)
		{
			super() ;

			new Ref < S >
			(
				src ,
				( new_v , old_v ) => this.notify ( new_v , old_v )
			) ;
		}

		public override get value() : R
		{
			return this.to_ref( this.src.value );
		}

		protected notify( new_sv : S , old_sv ? : S )
		{
			const new_rv = this.to_ref ( new_sv ) ;
			const old_rv = old_sv !== undefined ? this.to_ref ( old_sv ) : undefined ;

			this.p_refs.forEach
			(
				ref => ref.value_change ( new_rv , old_rv )
			)
		}
	}
}

export namespace Leafr
{
	export type str = Leafr < string > ;
	export type num = Leafr < number > ;
	export type bool = Leafr < boolean > ;
}


export function leafr < V > ( value : V , rel ? : Leafr.Rel )
{
	return new Leafr.Entity ( value, rel ) ;
}

export namespace leafr
{
	export const str = leafr < string > ;
	export const num = leafr < number > ;
	export const bool = leafr < boolean > ;

	export const type = Leafr ;
}

