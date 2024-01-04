import { Exist, _container } from "./exist.js";
import { Branch } from "./branch.js";
const log = console.log;

/** StrRefSrc
 * 
 * Leafの値をNodetで利用する際、小数点フォーマットのようなアレンジも一意に扱うためのインターフェース。
 * 
*/

const default_tostr = < V > ( value : V ) : string => String( value ); 

export abstract class LeafrRefFactory < V > extends Exist
{
	public abstract createRef
	(
		refs : Exist.Refs,
		update : Leafr.update < V >,
	) : LeafrRef < V >;

	public tostr : Leafr.tostr < V > | null = default_tostr;
}

export class Conv < V > extends LeafrRefFactory < V >
{
	protected source : Leafr < V > | null ;

	constructor
	(
		source : Leafr < V >,
		tostr : Leafr.tostr < V >
	)
	{
		super( source );
		this.tostr = tostr;
		this.source = source;
	}

	public override createRef
	(
		refs : Exist.Refs,
		update : Leafr.update < V >,
	
	) : LeafrRef < V >
	{
		return new LeafrRef < V > ( refs, update, this.source );
	}

	public override terminate() : void
	{
		this.source = null;
		this.tostr = null;
		super.terminate();	
	}
}




/** Leaf Readonly */

export class Leafr < V > extends LeafrRefFactory < V >
{
	constructor( container : Exist, protected _value : V )
	{
		super( container );
	}

	/** ref */

	public override createRef
	(
		refs : Exist.Refs,
		update : Leafr.update < V >
	
	) : LeafrRef < V >
	{
		return new LeafrRef < V > ( refs, update, this );
	}

	public sc( conv : ( value : V ) => string ) : LeafrRefFactory < V > { return new Conv < V > ( this, conv ); }

	/** value */

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }
	public get() : V { return this._value; }

	public setreadonlyvalue( newv : V, changer ? : LeafrRef < V > | Branch ) : boolean
	{
		if( newv === this._value )  return false;

		const oldv = this._value;
		this._value = newv;

		if( changer != this[ _container ] && this[ _container ] instanceof Branch )
		{
			this[ _container ].update();
		}

		this._refs.forEach( ref =>
		{
			( ref instanceof LeafrRef ) &&
			ref != changer &&
			ref._new_value( newv, oldv );
		});

		return true;
	}

	/**  */

	// protected lf( event : string, info : string = "" ) { return `LeafRo[${this.ru}] ${ event }`; }
}

class LeafrRef < V = any > extends Exist.Ref
{
	constructor
	(
		refs : Exist.Refs,
		protected update : Leafr.update < V >,
		source : Leafr < V > | null
	)
	{
		super( refs );
		this.source = source;
	}

	/** value */

	public get v() : V | undefined { return this.value; }
	public get val() : V | undefined { return this.value; }
	public get value() : V | undefined { return this.source?.get(); }

	/** source */

	public override set source( news : Leafr < V > | null ) { super._source = news; }

	public override get source() : Leafr < V > | null
	{
		return ( this._source instanceof Leafr ) && this._source || null;
	}

	public override _new_source( news : Exist | null, olds : Exist | null ) : void
	{
		this.update( this.value );
	}

	public _new_value( newv : V, oldv ? : V ) : void
	{
		this.update( newv, oldv );
	}

	/**  */
}

export namespace Leafr
{
	/** プリミティブ型シュガー */

	export class String extends Leafr < string > {}
	export class Number extends Leafr < number > {}
	export class Boolean extends Leafr < boolean > {}

	export namespace LoL
	{
		type lol < T > = T | Leafr < T > ; 
		export type String = lol < string > ;
		export type Bigint = lol < bigint > ;
		export type Number = lol < number > ;
		export type Boolean = lol < boolean > ;
		export type Object = lol < object > ;
		export type Symbol = lol < symbol > ;
	};

	export type update < V > = ( newv ? : V, oldv ? : V ) => void;
	export type tostr < V > = ( value : V ) => string ;
}


/** Leaf RW  */

export class Leaf < V > extends Leafr < V >
{
	public set( newv : V, changer ? : LeafrRef < V > | Branch ) : boolean
	{
		return this.setreadonlyvalue( newv, changer );
	}

	public override set v( newv : V ) { this.setreadonlyvalue( newv ); }
	public override set val( newv : V ) { this.setreadonlyvalue( newv ); }
	public override set value( newv : V ) { this.setreadonlyvalue( newv ); }

	public override get v() : V { return this._value; }
	public override get val() : V { return this._value; }
	public override get value() : V { return this._value; }
}

/** class Ref < V > */

export class LeafRef < V = any > extends LeafrRef < V >
{
	/** value */

	public override get v() : V | undefined { return this.value; }
	public override get val() : V | undefined { return this.value; }
	public override get value() : V | undefined { return this.source?.get(); }

	public override set v( newv : V | undefined ) { this.value = newv; }
	public override set val( newv : V | undefined ) { this.value = newv; }
	public override set value( newv : V | undefined )
	{
		if( ! this.source )
		{
			return;
		}

		newv !== undefined && this.source?.set( newv, this );
	}

	/** source */

	public override set source( news : Leaf < V > | null ) { super._source = news; }

	public override get source() : Leaf < V > | null
	{
		return ( this._source instanceof Leaf ) && this._source || null;
	}
}

export namespace Leaf
{
	/** プリミティブ型シュガー */

	export class String extends Leaf < string > {}
	export class Number extends Leaf < number > {}
	export class Boolean extends Leaf < boolean > {}


	export namespace LoL
	{
		type lol < T > = T | Leaf < T > ; 
		export type String = lol < string > ;
		export type Bigint = lol < bigint > ;
		export type Number = lol < number > ;
		export type Boolean = lol < boolean > ;
		export type Object = lol < object > ;
		export type Symbol = lol < symbol > ;
	};

}
