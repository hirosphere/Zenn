import { Exist, Owner } from "./exist.js";
import { Branch } from "./branch.js";
const log = console.log;

/**  */

export class Leaf < V > extends Exist
{
	constructor( owner : Owner, protected _value : V )
	{
		super( owner );
	}

	/**  */

	public set v( newv : V ) { this.set( newv ); }
	public set val( newv : V ) { this.set( newv ); }
	public set vlaue( newv : V ) { this.set( newv ); }

	public get v() : V { return this._value; }
	public get val() : V { return this._value; }
	public get value() : V { return this._value; }

	public set( newv : V, changer ? : Leaf.Ref < V > | Branch )
	{
		if( newv === this._value )  return;

		const oldv = this._value;
		this._value = newv;

		// log( this.lf( "set" ), newv, oldv, [...this.refs].length );

		if( changer != this.owner && this.owner instanceof Branch )
		{
			this.owner.update();
		}

		this.refs.forEach( ref =>
		{
			( ref instanceof Leaf.Ref ) &&
			ref != changer &&
			ref.onValueChange( newv, oldv );
		});
	}

	public get() : V { return this._value; }

	/** Branch 向けメソッド */

	public setStatic( owner : Branch, newv : V ) { if( owner == this.owner ) this._value = newv; }
	public noteChange( owner : Branch )
	{
		if( owner != this.owner ) return;
	}

	/**  */

	protected lf( event : string, info : string = "" ) { return `Leaf[${this.ru}] ${ event }`; }
}

/**  */

export namespace Leaf
{
	/** class Ref < V > */

	export class Ref < V > extends Exist.Ref
	{
		/** value */

		public set v( newv : V | undefined ) { this.value = newv; }
		public set val( newv : V | undefined ) { this.value = newv; }
		public get v() : V | undefined { return this.value; }
		public get val() : V | undefined { return this.value; }

		public get value() : V | undefined { return this.source?.get(); }
		public set value( newv : V | undefined )
		{
			if( ! this.source )
			{
				console.error( this.lf( "set value" ), "source の無きに 値をセット。" );
				return;
			}

			// log( this.lf( "set value" ), newv );
			newv !== undefined && this.source?.set( newv, this );
		}

		/** source */

		public setSource( newsource : Leaf < V > | undefined )
		{
			super.setSource( newsource );
		}

		public set source( newSource : Leaf < V > | undefined ) { super.setSource( newSource ); }
		public get source() : Leaf < V > | undefined
		{
			return ( this._source instanceof Leaf ) && this._source || undefined;
		}

		public onValueChange( newv : V, oldv ? : V )
		{
			log( this.lf( "onValueChange" ), newv, oldv )
		}

		/**  */

		protected lf( event : string ) { return `Leaf.Ref[${ this.id }-${ this.source?.ru ?? "?" }] ${ event }`; }
	}



	/** プリミティブ型 */

	export class String extends Leaf < string > {}
	export class Number extends Leaf < number > {}
	export class Boolean extends Leaf < boolean > {}

}
