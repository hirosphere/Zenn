import { Owner, Exist, _owner, _refs } from "./exist.js";
import { Branch } from "./branch.js";
const log = console.log;


/** Leaf Readonly */

export const _setvalue = Symbol();

export class Leafr < V > extends Exist
{
	static make < V > ( owner : Owner, lol : Leafr.LoL < V > ) : Leafr < V >
	{
		return lol instanceof Leafr ? lol : new Leafr < V > ( owner, lol );
	};

	/**  */

	constructor( container : Owner, protected _value : V )
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

		if( changer != this[ _owner ] && this[ _owner ] instanceof Branch )
		{
			this[ _owner ].update();
		}

		log( this.runiq, "_setvalue", newv, this[ _refs ].size );

		this[ _refs ].forEach( ref =>
		{
			( ref instanceof Leafr.Ref ) &&
			ref._new_value( newv, oldv );
		});

		return true;
	}
}

const default_tostr = < V > ( value : V | undefined ) => String( value || ".." );

export namespace Leafr
{
	export class Ref < V > extends Exist.Ref
	{
		constructor( refs : Exist.RefCon, protected leafr_acts ? : Ref.Acts < V > )
		{
			super( refs );
		}

		/** source */

		public override set source( news : Leafr < V > | undefined )
		{
			super.source = news;
		}
	
		public override get source() : Leafr < V > | undefined
		{
			return ( this._source instanceof Leafr ) && this._source || undefined;
		}
	
		public override _new_source( news : Exist | undefined, olds : Exist | undefined ) : void
		{
			super._new_source( news, olds );
			this._new_value( this.source?.value );
		}
	
		/** value */
	
		public get v() : V | undefined { return this.value; }
		public get val() : V | undefined { return this.value; }
		public get value() : V | undefined { return this.source?.get(); }
	
		public get letter() : string { return this.tostr( this.source?.get() ); } 
		public tostr : ( value : V | undefined ) => string = default_tostr;
	
		/** event */
	
		public _new_value( newv ? : V, oldv ? : V ) : void
		{
			this.leafr_acts?.new_value?.( newv, oldv );
		}

		/** life */
		
		public override ref_term() : void
		{
			super.ref_term();
		}
	}

	export namespace Ref
	{
		export interface Acts < V > extends Exist.Ref.Acts
		{
			new_value?( newv ? : V, oldv ? : V ) : void ;
		}
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
	static override make < V > ( owner : Owner, lol : Leaf.LoL < V > ) : Leaf < V >
	{
		return lol instanceof Leaf ? lol : new Leaf < V > ( owner, lol );
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
		/** source */

		public override set source( news : Leaf < V > | undefined ) { super._source = news; }

		public override get source() : Leaf < V > | undefined
		{
			return ( this._source instanceof Leaf ) && this._source || undefined;
		}
		
		/** value */

		public override get v() : V | undefined { return this.value; }
		public override get val() : V | undefined { return this.value; }
		public override get value() : V | undefined { return this.source?.get(); }

		public override set v( newv : V | undefined ) { this.value = newv; }
		public override set val( newv : V | undefined ) { this.value = newv; }
		public override set value( newv : V | undefined )
		{
			this.source && newv !== undefined && this.source.set( newv, this );
		}
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
