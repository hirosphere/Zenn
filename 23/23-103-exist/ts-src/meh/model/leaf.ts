const log = console.log;

//

type LeafArgs < T > =
{
	rel ?: Leaf.Update < T > ;
	readonlykey ? : {}
};

//  Leafから変更通知を受け取るRefの作成と、Leaf値のstringへの変換を受け持ち、  //
//  NodetのAttr, Style, Part など、あらゆる値をリアクティブ化。  //

export abstract class StringSource
{
	abstract createRef( update : () => void ) : Ref ;
	abstract toString() : string ;
}

//  LeafRo : 書き込み防止機能付き　プリミティブ値オブジェクト  //

export const setRoValue = Symbol();

class LeafRo < T > extends StringSource
{
	protected _value : T;
	protected refs = new Set < RefImpl < T > > ;

	constructor( value : T, protected args ? : LeafArgs < T > )
	{
		super();
		this._value = value;
	}

	// ref //

	public cv( toref : ( value : T ) => string )
	{
		return new ConvStrSrc < T > ( this, toref );
	}

	public toString() { return String( this._value ); }

	public createRef( update : Leaf.Update < T > )
	{
		const ref = new RefImpl < T > ( this, update );
		this.refs.add( ref );
		return ref;
	}

	public removeRef( ref : RefImpl < T > )
	{
		this.refs.delete( ref );
	}

	// value //

	public get v() { return this._value ; }
	public get val() { return this._value ; }
	public get value() { return this._value; }

	public get() : T { return this._value; }

	public [ setRoValue ]( readonlykey : object, value : T, sender ? : Ref ) : void
	{
		if( readonlykey == this.args?.readonlykey ) this._set( value, sender );
	}

	protected _set( value : T, sender ? : Ref )
	{
		if( value === this._value ) return;

		const old = this._value;
		this._value = value;

		this.args?.rel?.( value, old );
		this.refs.forEach( ref => ref.update( value, old ) );
	}

	// life //

	public delete()
	{
		this.refs.forEach( ref => ref.release() );
		delete this.args;
	}
}

export class Leaf < T > extends LeafRo < T >
{
	public get v() { return this._value ; }
	public get val() { return this._value ; }
	public get value() { return this._value; }
	
	public set v( value : T ) { this._set( value ); }
	public set val( value : T ) { this._set( value ); }
	public set value( value : T ) { this.set( value ); }

	public set( value : T, sender ? : Ref ) { this._set( value, sender ); }
}

	// Readonly //

export namespace Leaf
{
	export type Update < T > = ( value : T, old ? : T ) => void;

	export class String extends Leaf < string > {};
	export class Number extends Leaf < number > {};
	export class Boolean extends Leaf < boolean > {};

	export class Ro < T > extends LeafRo < T > {}

	export namespace Ro
	{
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


// Ref //

export interface Ref
{
	release() : void ;
}


class RefImpl < T > implements Ref
{
	constructor (
		protected source : LeafRo < T > | null,
		protected _update : Leaf.Update < T > | null
	)
	{ this.source && this._update?.( this.source.value ); }

	update( value : T, old ? : T ) : void
	{
		this._update?.( value, old );
	}

	release() : void
	{
		if( this.source == null ) return;
		this.source.removeRef( this );
		this.source = null;
		this._update = null;
	}
}

//  //

class ConvStrSrc < T > extends StringSource
{
	constructor (
		readonly source : LeafRo < T >,
		readonly toref : ( value : T ) => string
	)
	{ super(); }

	createRef( update : () => void ) { return this.source.createRef( update ); }
	toString() { return this.toref( this.source.value ); }
}

