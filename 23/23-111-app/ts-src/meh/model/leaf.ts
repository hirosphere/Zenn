import { Exist, Owner } from "./exist.js";
import { Branch } from "./branch.js";
const log = console.log;

/** String Source
 * 
 * Leafの値をNodetで利用する際、小数点フォーマットのようなアレンジも一意に扱うためのインターフェース。
 * 
*/

export abstract class StrSrcFactory extends Exist
{
	public abstract createStrSrc() : StrSrc < any > ;
}

export class StrSrc < V >
{
	constructor
	(
		public source : Leafr < V >,
		public tostr : ( value : V ) => string
	){}
}

/** Leaf Readonly */

export class Leafr < V > extends StrSrcFactory
{
	constructor( owner : Owner, protected _value : V )
	{
		super( owner );
	}

	/** to string converter */

	public createStrSrc(): StrSrc < any >
	{
		return new StrSrc < V > ( this, value => String( value ) );
	}

	public sc( conv : ( value : V ) => string ) : StrSrc < V > { return new StrSrc < V > ( this, conv ); }
	public sconv( conv : ( value : V ) => string ) : StrSrc < V > { return new StrSrc < V > ( this, conv ); }
	public strconv( conv : ( value : V ) => string ) : StrSrc < V > { return new StrSrc < V > ( this, conv ); }

	/** value */

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }
	public get() : V { return this._value; }

	public setreadonlyvalue( newv : V, changer ? : Leafr.Ref < V > | Branch ) : boolean
	{
		if( newv === this._value )  return false;

		const oldv = this._value;
		this._value = newv;

		if( changer != this.owner && this.owner instanceof Branch )
		{
			this.owner.update();
		}

		this.refs.forEach( ref =>
		{
			( ref instanceof Leafr.Ref ) &&
			ref != changer &&
			ref.onValueChange( newv, oldv );
		});

		return true;
	}

	/**  */

	// protected lf( event : string, info : string = "" ) { return `LeafRo[${this.ru}] ${ event }`; }
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

	/** class Ref < V > */

	export class Ref < V = any > extends Exist.Ref
	{
		/** value */

		public get v() : V | undefined { return this.value; }
		public get val() : V | undefined { return this.value; }
		public get value() : V | undefined { return this.source?.get(); }

		/** source */

		public set s( newSource : Leafr < V > | undefined ) { super.setSource( newSource ); }
		public set src( newSource : Leafr < V > | undefined ) { super.setSource( newSource ); }
		public set source( newSource : Leafr < V > | undefined ) { super.setSource( newSource ); }

		public get s() : Leafr < V > | undefined { return this.source; }
		public get src() : Leafr < V > | undefined { return this.source; }
		public get source() : Leafr < V > | undefined
		{
			return ( this._source instanceof Leafr ) && this._source || undefined;
		}

		public onValueChange( newv : V, oldv ? : V ) : void { log( this.lf( "onValueChange" ), newv, oldv ) }

		/**  */

		protected lf( event : string ) { return `LeafRo.Ref[${ this.id }-${ this.source?.ru ?? "?" }] ${ event }`; }
	}
}


/** Leaf RW  */

export class Leaf < V > extends Leafr < V >
{
	public set( newv : V, changer ? : Leafr.Ref < V > | Branch ) : boolean
	{
		return this.setreadonlyvalue( newv, changer );
	}

	public set v( newv : V ) { this.setreadonlyvalue( newv ); }
	public set val( newv : V ) { this.setreadonlyvalue( newv ); }
	public set value( newv : V ) { this.setreadonlyvalue( newv ); }

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }
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

	/** class Ref < V > */

	export class Ref < V = any > extends Leafr.Ref < V >
	{
		/** value */

		public get v() : V | undefined { return this.value; }
		public get val() : V | undefined { return this.value; }
		public get value() : V | undefined { return this.source?.get(); }

		public set v( newv : V | undefined ) { this.value = newv; }
		public set val( newv : V | undefined ) { this.value = newv; }
		public set value( newv : V | undefined )
		{
			if( ! this.source )
			{
				console.error( this.lf( "set value" ), "source の無きに 値をセット。" );
				return;
			}

			newv !== undefined && this.source?.set( newv, this );
		}

		/** source */

		public set s( newSource : Leaf < V > | undefined ) { super.setSource( newSource ); }
		public set src( newSource : Leaf < V > | undefined ) { super.setSource( newSource ); }
		public set source( newSource : Leaf < V > | undefined ) { super.setSource( newSource ); }

		public get s() : Leaf < V > | undefined { return this.source; }
		public get src() : Leaf < V > | undefined { return this.source; }
		public get source() : Leaf < V > | undefined
		{
			return ( this._source instanceof Leaf ) && this._source || undefined;
		}

		/** イベントハンドラ */

		public onValueChange( newv : V, oldv ? : V ) : void { log( this.lf( "onValueChange" ), newv, oldv ) }

		/**  */

		protected lf( event : string ) { return `Leaf.Ref[${ this.id }-${ this.source?.ru ?? "?" }] ${ event }`; }
	}
}
