import { _value_, _set_, _refs_, log } from "../common.js";


export class Leaf < V >
{
	constructor
	(
		value : V,
		protected rel ? : Leaf.Rel
	)
	{
		this[ _value_ ] = value;
	}

	public [ _refs_ ] = new Set < Leaf.Ref < V > >;

	public [ _value_ ] : V ;

	public get value() : V
	{
		return this[ _value_ ];
	}

	public set value( new_value : V )
	{
		this[ _set_ ] ( new_value );
	}

	public [ _set_ ] ( new_value : V )
	{
		if( new_value === this[ _value_ ] )  return;

		const old_value = this[ _value_ ];
		this[ _value_ ] = new_value;

		this.rel?.update();

		this[ _refs_ ].forEach
		(
			ref => ref.on_value_change
			(
				new_value,
				old_value
			)
		);
	}
}

export namespace Leaf
{
	export class Ref < V >
	{
		public set src( new_src : Leaf < V > | undefined )
		{
			if( new_src == this._src_ )  return;

			const old_src = this._src_;
			old_src?.[ _refs_ ].delete( this );

			this._src_ = new_src;
			new_src?.[ _refs_ ].add( this );
			
			this.on_value_change( new_src?.[ _value_ ],  old_src?.[ _value_ ] );
		}

		protected _src_ ? : Leaf < V >;

		public on_value_change
		(
			new_value ? : V,
			old_value ? : V
		) {}

		public term() {}
	}

	export interface Rel
	{
		update() : void ;
	}

	export class str extends Leaf < string > {}
	export class num extends Leaf < number > {}
	export class bool extends Leaf < boolean > {}
}

Leaf.str;

export type lol < V > = V | Leaf < V >;

export namespace lol
{
	export type str = lol < string >;
	export type num = lol < number >;
	export type bool = lol < boolean >;
}

export class Leafr < V > extends Leaf < V >
{
	public override get value() : V
	{
		return this[ _value_ ];
	}
}

export type lolr < V > = V | Leaf < V >;

export namespace lolr
{
	export type str = lolr < string >;
	export type num = lolr < number >;
	export type bool = lolr < boolean >;
}

