import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_, log } from "../common.js";

export function leaf < V >
(
	value : V ,
	rel ? : leaf.r.Rel
)
{
	return new leaf.Entity ( value, rel ) ; 
}

/* */

export namespace leaf
{
	export function r < V >
	(
		value : V ,
		rel ? : leaf.r.Rel
	)
	{
		return new r.Entity ( value, rel ) ; 
	}
}

export namespace leaf.r
{
	export abstract class Leaf < V >
	{
		/*   */
	
		public abstract get value() : V ;
		protected refs = new Set < Ref < V > > ;
	
		/*   */
	
		public [ _add_ref_ ]
		(
			ref : Ref < V > ,
			old_value ? : V
		)
		: void
		{
			this.refs.add( ref );
			ref [ _on_value_change_ ]
			(
				this.value,
				old_value
			);
		}
	
	
		public [ _remove_ref_ ] ( ref : Ref < V > ) : void
		{
			this.refs.delete( ref );
		}
	}

	export namespace Leaf
	{
		export type str = Leaf < string > ;
		export type num = Leaf < number > ;
		export type bool = Leaf < boolean > ;	
	}

	export type lol < V > = V | Leaf < V >;

	export namespace lol
	{
		export type str = lol < string >;
		export type num = lol < number >;
		export type bool = lol < boolean >;
	}
}

export namespace leaf.r
{
	export class Ref < V, R = V >
	{
		constructor
		(
			public readonly src : Leaf < V > ,
			protected on_value_change : vc < V > ,
		)
		{}

		public [ _on_value_change_ ]
		(
			new_value : V ,
			old_value ? : V ,
		)
		{
			this.on_value_change
			(
				new_value ,
				old_value ,
			);
		}

		public term() {}
	}

	type vc < V > = ( new_value : V , old_value ? : V ) => void ;

	export interface Rel
	{
		update() : void ;
	}
}

export namespace leaf.r
{
	export class Conv < V, R = V > extends Leaf < R >
	{
		protected src_ref : Ref < V > ;

		constructor
		(
			src : Leaf < V > ,
			protected toref : conv_fn < V, R >
		)
		{
			super() ;
			
			const ref = this.src_ref = new Ref < V >
			(
				src,
				( new_value , old_value ) =>
				{
					this.notify ( new_value , old_value ) ;
				}
			);

			src [ _add_ref_ ] ( ref ) ;
		}

		public override get value ()
		{
			return this.toref( this.src_ref.src.value );
		}

		protected notify( new_value : V, old_value ? : V )
		{
			const new_r = this.toref ( new_value ) ;
			const old_r =
			(
				old_value !== undefined ?
					this.toref ( old_value )
					: undefined
			);

			this.refs.forEach
			(
				ref => ref [ _on_value_change_ ] ( new_r , old_r )
			);
		}
	}

	export type conv_fn < V, R = V > = ( value : V ) => R ;
}

export namespace leaf.r
{
	/*  Entity  */

	export class Entity < V > extends Leaf < V >
	{
		protected [ _value_ ] : V ;
	
		constructor
		(
			value : V,
			protected rel ? : Rel
		)
		{
			super();
			this[ _value_ ] = value;
		}
	
	
		public get value() : V
		{
			return this [ _value_ ];
		}
	
		public [ _set_value_ ] ( new_value : V )
		{
			if( new_value === this.value )  return;
	
			const old_value = this [ _value_ ];
			this [ _value_ ] = new_value;
	
			this.rel?.update();
	
			this.refs.forEach
			(
				ref => ref[ _on_value_change_ ]
				(
					new_value,
					old_value
				)
			);
		}
	}

}

export namespace leaf.r
{
	export const str = r < string > ;
	export const num = r < number > ;
	export const bool = r < boolean > ;
}


/* Leaf W/R */

export namespace leaf
{
	export abstract class Leaf < V >  extends r.Leaf < V >
	{
		public abstract override get value () : V ;
		public abstract override set value ( value : V ) ;
	}
	
	export namespace Leaf
	{
		export type str = Leaf < string > ;
		export type num = Leaf < number > ;
		export type bool = Leaf < boolean > ;
	}

	
	export class Entity < V > extends r.Entity < V >
	{
		public override set value ( new_value : V ) { this [ _set_value_ ] ( new_value ) }
		public override get value () : V { return this [ _value_ ] ; }
	}	

	/* */

	export type lol < V > = V | Leaf < V >;
	export namespace lol
	{
		export type str = lol < string >;
		export type num = lol < number >;
		export type bool = lol < boolean >;
	}

	/* */

	export const str = leaf < string > ;
	export const num = leaf < number > ;
	export const bool = leaf < boolean > ;
}

abstract class Leaf < V > extends leaf.Leaf < V > {}

const x : leaf.Leaf.str = leaf( "" ) ;
