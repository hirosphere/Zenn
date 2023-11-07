const log = console.log;

//

type LeafArgs < T > =
{
	rel ?: () => void ;
};

type Update < T > = ( value : T, old ? :T ) => void;

export abstract class StringSource
{
	abstract ref( update : () => void ) : Ref ;
	abstract toString() : string ;
}

export const setRoValue = Symbol();

class LeafRo < T > extends StringSource
{
	protected _value : T;
	protected rel ? : () => void ;
	protected refs = new Set < RefImpl < T > > ;

	constructor( value : T, args ? : LeafArgs < T > )
	{
		super();
		this._value = value;
		this.rel = args?.rel;
	}

	// ref //

	public strconv( toref : ( value : T ) => string )
	{
		return new ConvStrSrc < T > ( this, toref );
	}

	public toString() { return String( this._value ); }

	public ref( update : Update < T > )
	{
		const ref = new RefImpl < T > ( this, update );
		this.refs.add( ref );
		return ref;
	}

	public removeref( ref : RefImpl < T > )
	{
		this.refs.delete( ref );
	}

	// value //

	public get v() { return this._value ; }
	public get val() { return this._value ; }
	public get value() { return this._value; }

	public get() : T { return this._value; }

	public [ setRoValue ]( value : T, sender ? : Ref )
	{
		if( value === this._value ) return;

		const old = this._value;
		this._value = value;

		this.rel?.();
		this.refs.forEach( ref => ref.update( value, old ) );
	}

	// life //

	public delete()
	{
		this.refs.forEach( ref => ref.release() );
		delete this.rel;
	}
}

export class Leaf < T > extends LeafRo < T >
{
	public get v() { return this._value ; }
	public get val() { return this._value ; }
	public get value() { return this._value; }
	
	public set v( value : T ) { this[ setRoValue ]( value ); }
	public set val( value : T ) { this[ setRoValue ]( value ); }
	public set value( value : T ) { this[ setRoValue ]( value ); }

	public set( value : T, sender ? : Ref ) { this[ setRoValue ]( value, sender ); }
}

//

export interface Ref
{
	release() : void ;
}

export namespace Leaf
{
	export class String extends Leaf < string > {};
	export class Number extends Leaf < number > {};
	export class Boolean extends Leaf < boolean > {};

	// Readonly //

	export namespace Ro
	{
		export const Leaf = LeafRo;

		export class String extends LeafRo < string > {};
		export class Number extends LeafRo < number > {};
		export class Boolean extends LeafRo < boolean > {};	
	}

}

export namespace LoL
{
	type lol < T > = T | Leaf < T >;
	export type Number = lol < number > ;
	export type String = lol < string > ;
	export type Boolean = lol < boolean > ;
}


//  //

class RefImpl < T > implements Ref
{
	constructor (
		protected source : LeafRo < T > | null,
		protected _update : Update < T > | null
	)
	{ this.source && this._update?.( this.source.value ); }

	update( value : T, old ? : T ) : void
	{
		this._update?.( value, old );
	}

	release() : void
	{
		if( this.source == null ) return;
		this.source.removeref( this );
		this.source = null;
		this._update = null;
	}
}

class ConvStrSrc < T > extends StringSource
{
	constructor (
		readonly source : LeafRo < T >,
		readonly toref : ( value : T ) => string
	)
	{ super(); }

	ref( update : () => void ) { return this.source.ref( update ); }
	toString() { return this.toref( this.source.value ); }
}

