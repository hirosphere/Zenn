import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_, log } from "../common.js";

/* */

export abstract class Leafr < V >
{
	/*   */

	public static new < V > ( value : V , rel ? : Leafr.Rel ) : Leafr.Entity < V >
	{
		return new Leafr.Entity ( value , rel ) ;
	}

	/*   */

	public abstract get value() : V ;
	protected refs = new Set < Leafr.Ref < V > > ;

	/*   */

	public [ _add_ref_ ]
	(
		ref : Leafr.Ref < V > ,
		old_value ? : V
	)
	: void
	{
		this.refs.add( ref );
		ref [ _on_value_change_ ]
		(
			this.value,
			old_value
		) ;
	}


	public [ _remove_ref_ ] ( ref : Leafr.Ref < V > ) : void
	{
		this.refs.delete( ref );
	}
}

export namespace Leafr
{
	export class Ref < V, R = V >
	{
		constructor
		(
			public readonly src : Leafr < V > ,
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

	export abstract class str extends Leafr < string > {}
	export abstract class num extends Leafr < number > {}
	export abstract class bool extends Leafr < boolean > {}

	/* */

	export class Conv < V, R = V > extends Leafr < R >
	{
		protected src_ref : Leafr.Ref < V > ;

		constructor
		(
			src : Leafr < V > ,
			protected toref : conv_fn < V, R >
		)
		{
			super() ;
			
			const ref = this.src_ref = new Leafr.Ref < V >
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

	/*  Entity  */

	export class Entity < V > extends Leafr < V >
	{
		protected [ _value_ ] : V ;
	
		constructor
		(
			value : V,
			protected rel ? : Leafr.Rel
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

export type lolr < V > = V | Leaf < V >;

export namespace lolr
{
	export type str = lolr < string >;
	export type num = lolr < number >;
	export type bool = lolr < boolean >;
}

export function leafr < V >
(
	value : V ,
	rel ? : Leafr.Rel
)
{
	return new Leafr.Entity ( value, rel ) ; 
}

export namespace leafr
{
	export const str = leafr < string > ;
	export const num = leafr < number > ;
	export const bool = leafr < boolean > ;
}


/* Leaf W/R */

export abstract class Leaf < V >  extends Leafr < V >
{
	public static override new < V > ( value : V , rel ? : Leafr.Rel ) : Leaf.Entity < V >
	{
		return new this.Entity( value , rel ) ;
	}

	public abstract override get value () : V ;
	public abstract override set value ( value : V ) ;
}

export namespace Leaf
{

	export abstract class str extends Leaf < string > {}
	export abstract class num extends Leaf < number > {}
	export abstract class bool extends Leaf < boolean > {}


	export class Entity < V > extends Leafr.Entity < V >
	{
		public override set value ( new_value : V ) { this [ _set_value_ ] ( new_value ) }
		public override get value () : V { return this [ _value_ ] ; }
	}	
}

Leaf.str.new ( "" ) .value = "";

export type lol < V > = V | Leaf < V >;

export namespace lol
{
	export type str = lol < string >;
	export type num = lol < number >;
	export type bool = lol < boolean >;
}

export function leaf < V >
(
	value : V ,
	rel ? : Leafr.Rel
)
{
	return new Leaf.Entity ( value, rel ) ; 
}

export namespace leaf
{
	export const str = leafr < string > ;
	export const num = leafr < number > ;
	export const bool = leafr < boolean > ;
}



