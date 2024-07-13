import { Exist } from "./exist.js";
import { _composition, _refs, _setvalue } from "./shadow-props.js";
import { Branch } from "./branch.js";
const log = console.log;

/** Leaf Readonly */

type relact < V > = ( new_v : V, old_v ? : V ) => void;

export class Leafr < V > extends Exist
{
	static make < V > ( container : Exist.Container, lol : Leafr.LoL < V > ) : Leafr < V >
	{
		return lol instanceof Leafr ? lol : new Leafr < V > ( container, lol );
	};

	static values < V > ( composition : Exist, values : V [] ) : Leafr < V > []
	{
		return values.map( value => new Leafr( composition, value ) );
	}


	/*  */

	constructor( composition : Exist, protected _value : V, protected _rel ? : relact < V > )
	{
		super( composition );
	}

	/* value */

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }
	public get() : V { return this._value; }

	public [ _setvalue ]( new_v : V, changer ? : Leafr.Ref < V > | Branch ) : boolean
	{
		if( new_v === this._value )  return false;

		const old_v = this._value;
		this._value = new_v;

		this._rel?.( new_v, old_v );

		if( changer != this[ _composition ] && this[ _composition ] instanceof Branch )
		{
			this[ _composition ]?.update();
		}

		this[ _refs ].forEach( ref =>
		{
			( ref instanceof Leafr.Ref )
			 && ref.notify_new_value( new_v, old_v );
		});

		return true;
	}

	/* life */

	public override terminate() : void
	{
		this._rel = undefined;
		super.terminate();
	}
}

export namespace Leafr
{
	/* Ref */

	export class Ref < V > extends Exist.Ref
	{
		constructor( owner : Exist, protected leafr_acts  : Acts < V >, source : Leafr < V > )
		{
			super( owner, leafr_acts, source );
			this.notify_new_value( source.value );
		}

		public notify_new_value( new_v ? : V, old_v ? : V )
		{
			this.leafr_acts.new_value?.( new_v, old_v );
		}
	}

	export interface Acts < V > extends Exist.Acts
	{
		new_value?( newv ? : V, oldv ? : V ) : void ;
	}


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
