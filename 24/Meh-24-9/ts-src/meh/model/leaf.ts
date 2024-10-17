import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_, log } from "../common.js";

/* */

export abstract class Budr < V >
{
	public abstract get value() : V ;
	protected refs = new Set < Budr.Ref < V > > ;

	public [ _add_ref_ ]
	(
		ref : Budr.Ref < V > ,
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
	public [ _remove_ref_ ] ( ref : Budr.Ref < V > ) : void
	{
		this.refs.delete( ref );
	}
}

export namespace Budr
{
	export class Ref < V, R = V >
	{
		constructor
		(
			public readonly src : Budr < V > ,
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
}

export class Leafr < V > extends Budr < V >
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

export namespace Leafr
{
	export interface Rel
	{
		update() : void ;
	}

	export class str extends Leafr < string > {}
	export class num extends Leafr < number > {}
	export class bool extends Leafr < boolean > {}

	/* */

	export class Conv < V, R = V > extends Budr < R >
	{
		protected src_ref : Budr.Ref < V > ;

		constructor
		(
			src : Budr < V > ,
			protected toref : conv_fn < V, R >
		)
		{
			super() ;
			
			const ref = this.src_ref = new Budr.Ref < V >
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
			this.refs.forEach
			(
				ref => ref [ _on_value_change_ ]
				(
					this.toref( new_value ) ,
					old_value !== undefined ? this.toref ( old_value ) : undefined
				)
			);
		}
	}

	export type conv_fn < V, R = V > = ( value : V ) => R ;
}

export type lolr < V > = V | Leaf < V >;

export namespace lolr
{
	export type str = lolr < string >;
	export type num = lolr < number >;
	export type bool = lolr < boolean >;
}


/* Leaf W/R */


export class Leaf < V > extends Leafr < V >
{
	public override set value ( new_value : V ) { this [ _set_value_ ] ( new_value ) }
	public override get value () : V { return this [ _value_ ] ; }
}

export namespace Leaf
{
	export class str extends Leaf < string > {}
	export class num extends Leaf < number > {}
	export class bool extends Leaf < boolean > {}
}

new Leaf.str( "" ).value = "1";

export type lol < V > = V | Leaf < V >;

export namespace lol
{
	export type str = lol < string >;
	export type num = lol < number >;
	export type bool = lol < boolean >;
}

