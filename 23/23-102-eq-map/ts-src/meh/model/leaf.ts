const log = console.log;

export type leaf_t = string | number | boolean;

export const iss = ( value : leaf_t ) : value is string => ( typeof value == "string" );
export const isn = ( value : leaf_t ) : value is number => ( typeof value == "number" );
export const isb = ( value : leaf_t ) : value is boolean => ( typeof value == "boolean" );

//

type LeafArgs < T > =
{
	rel ?: () => void ;
};

type Update < T > = ( value : T, old ? :T ) => void;

export abstract class ToString
{
	abstract ref( update : () => void ) : Ref ;
	abstract toString() : string ;
}

export class Leaf < T > extends ToString
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

	strconv( toref : ( value : T ) => string )
	{
		return new ToStringTemplate < T > ( this, toref );
	}

	toString() { return String( this._value ); }

	ref( update : Update < T > )
	{
		const ref = new RefImpl < T > ( this, update );
		this.refs.add( ref );
		return ref;
	}

	removeref( ref : RefImpl < T > )
	{
		this.refs.delete( ref );
	}

	// value //

	get value() { return this._value; }
	set value( value : T ) { this.set( value ); }

	get() : T { return this._value; }

	set( value : T, sender ? : Ref )
	{
		if( value === this._value ) return;

		const old = this._value;
		this._value = value;

		this.rel?.();
		this.refs.forEach( ref => ref.update( value, old ) );
	}

	// life //

	delete()
	{
		this.refs.forEach( ref => ref.release() );
		delete this.rel;
	}
}

//

export interface Ref
{
	release() : void ;
}

class RefImpl < T > implements Ref
{
	constructor( protected source : Leaf < T > | null, protected _update : Update < T > | null )
	{
		this.source && this._update?.( this.source.value );
	}

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

class ToStringTemplate < T > extends ToString
{
	constructor( readonly source : Leaf < T >, readonly toref : ( value : T ) => string )
	{
		super();
	}

	ref( update : () => void ) { return this.source.ref( update ); }
	toString() { return this.toref( this.source.value ); }
}

//

export namespace Leaf
{
	export class String extends Leaf < string > {};
	export class Number extends Leaf < number > {};
	export class Boolean extends Leaf < boolean > {};
}

export function leaf < T > ( initv : T | Leaf < T >, args ? : LeafArgs < T > )
{
	return initv instanceof Leaf ? initv : new Leaf < T > ( initv, args );
}

export namespace leaf
{
	export const str = leaf < string > ;
	export const num = leaf < number > ;
	export const bool = leaf < boolean > ;
	
	export const string = leaf < string > ;
	export const number = leaf < number > ;
	export const boolean = leaf < boolean > ;
	
	export const Str = leaf < string > ;
	export const Num = leaf < number > ;
	export const Bool = leaf < boolean > ;
	
	export const String = leaf < string > ;
	export const Number = leaf < number > ;
	export const Boolean = leaf < boolean > ;
}

type lol < T > = T | Leaf < T >;

export namespace lol
{
	export type num = lol < number > ;
	export type str = lol < string > ;
	export type bool = lol < boolean > ;
}

export namespace LoL
{
	export type Number = lol < number > ;
	export type String = lol < string > ;
	export type Boolean = lol < boolean > ;
}

