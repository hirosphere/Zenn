import { Exist, _container, _refs } from "./exist.js";
import { Branch } from "./branch.js";
const log = console.log;


/** Leaf Readonly */

export const _setvalue = Symbol();

export class Leafr < V > extends Exist
{
	static make < V > ( container : Exist.Container, lol : Leafr.LoL < V > ) : Leafr < V >
	{
		return lol instanceof Leafr ? lol : new Leafr < V > ( container, lol );
	};

	/**  */

	constructor( container : Exist.Container, protected _value : V )
	{
		super( container );
	}

	/** value */

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }
	public get() : V { return this._value; }

	public [ _setvalue ]( newv : V, changer ? : Leafr.Ref < V > | Branch ) : boolean
	{
		if( newv === this._value )  return false;

		const oldv = this._value;
		this._value = newv;

		if( changer != this[ _container ] && this[ _container ] instanceof Branch )
		{
			this[ _container ].update();
		}

		this[ _refs ].forEach( ref =>
		{
			( ref instanceof Leafr.Ref )
			 && ref._new_value( newv, oldv );
		});

		return true;
	}
}

export namespace Leafr
{
	export class Ref < V > extends Exist.Ref
	{
		constructor( refcon : Exist.Ref.Container, protected leafr_acts  : Acts < V >, source ? : Leafr < V > )
		{
			super( refcon, leafr_acts );
			this.source = source;
		}

		public override _new_source( news? : Exist | undefined, olds? : Exist | undefined ) : void
		{
			if( news instanceof Leafr ) this._new_value( news.value );
		}

		public _new_value( newv ? : V, oldv ? : V )
		{
			this.leafr_acts.new_value?.( newv, oldv );
		}
	}

	export interface Acts < V > extends Exist.Acts
	{
		new_value?( newv ? : V, oldv ? : V ) : void ;
	}
}

export namespace Leafr
{
	/** プリミティブ型シュガー */

	export class String extends Leafr < string > {}
	export class Number extends Leafr < number > {}
	export class Boolean extends Leafr < boolean > {}

	export type LoL < T > = T | Leafr < T > ; 
	export namespace LoL
	{
		export type String = LoL < string > ;
		export type Bigint = LoL < bigint > ;
		export type Number = LoL < number > ;
		export type Boolean = LoL < boolean > ;
		export type Object = LoL < object > ;
		export type Symbol = LoL < symbol > ;
	};
}




/** Leaf RW  */

export class Leaf < V > extends Leafr < V >
{
	static override make < V > ( container : Exist.Container, lol : Leaf.LoL < V > ) : Leaf < V >
	{
		return lol instanceof Leaf ? lol : new Leaf < V > ( container, lol );
	};

	/**  */

	public set( newv : V, changer ? : Leafr.Ref < V > | Branch ) : boolean
	{
		return this[ _setvalue ]( newv, changer );
	}

	public override set v( newv : V ) { this[ _setvalue ]( newv ); }
	public override set val( newv : V ) { this[ _setvalue ]( newv ); }
	public override set value( newv : V ) { this[ _setvalue ]( newv ); }

	public override get v() : V { return this._value; }
	public override get val() : V { return this._value; }
	public override get value() : V { return this._value; }
}

export namespace Leaf
{
	/** class Ref < V > */

	export class Ref < V = any > extends Leafr.Ref < V >
	{
	}
}

export namespace Leaf
{
	/** プリミティブ型シュガー */

	export class String extends Leaf < string > {}
	export class Number extends Leaf < number > {}
	export class Boolean extends Leaf < boolean > {}


	export type LoL < T > = T | Leaf < T > ; 
	export namespace LoL
	{
		export type String = LoL < string > ;
		export type Bigint = LoL < bigint > ;
		export type Number = LoL < number > ;
		export type Boolean = LoL < boolean > ;
		export type Object = LoL < object > ;
		export type Symbol = LoL < symbol > ;
	};
}
