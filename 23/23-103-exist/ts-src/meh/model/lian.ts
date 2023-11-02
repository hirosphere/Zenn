// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //

import { Leaf } from "./leaf.js";

const log = console.log;

export class Lian < V = any > extends Array < Item < V > >
{
	static create < V > ( srcvalue : Array < V > = [] ) : Lian < V >
	{
		const rt = new Lian();
		rt.set( srcvalue );
		return rt;
	}

	//  //

	public set( array : Array < V > ) : void
	{
		this.clear();
		array.forEach( ( value, order ) => this[ order ] = new Item( this, order, value ) );
	}

	protected refs = new Set < Lian.Ref > ();

	public ref( ref : Lian.Ref ) : void
	{
		log( "Lian ref", ref );
		this.refs.add( ref );
	}

	// order operations //

	public swap( orderA : number, orderB : number ) : void
	{
		;
	}
	
	public add( itemValue : V, order ? : number ) : void
	{
		const ord = regnext( this, order );
		this.splice( ord, 0, new Item( this, ord, itemValue ) );

		this.reorder( ord, this.length );
		this.refs.forEach(  ref => ref.add?.( ord, 1 )  );
	}

	public remove( item : Item < V > ) : void
	{
		const order = item.order.value;
		if( order < 0 || this.length <= order ) return;
		this.splice( order, 1 );

		this.reorder( order, this.length );
		this.refs.forEach(  ref => ref.remove?.( order, 1 )  );
	}

	public clear() : void
	{
		const len = this.length;
		this.refs.forEach(  ( ref ) => ref.remove?.( 0, len )  );
		this.length = 0;
	}

	//  //

	protected reorder( start : number, next : number ) : void
	{
		for( let ord = start; ord < next; ord ++ )
		{
			this[ ord ].order.value = ord;
		}
	}
}

const regnext = ( ar : Array < any >, order ? : number ) : number =>
{
	if( order == undefined || order > ar.length || order < 0 ) return ar.length;
	return order;
}

class Item < V > extends Leaf < V >
{
	public readonly order;
	public readonly isLast = new Leaf.Boolean( false );
	protected lian : Lian < V > | null;

	constructor( lian : Lian < V >, order : number, value : V )
	{
		super( value );
		this.order = new Leaf.Number( order );
		this.lian = lian;
	}

	remove()
	{
		this.lian?.remove( this );
		this.lian = null;
	}
}

export const LianItem = Item;


export namespace Lian
{
	export interface Ref
	{
		swap ? ( low : number, high : number ) : void ;
		move ? ( from : number, to : number ) : void ;
		add ? ( order : number, count : number ) : void ;
		remove ? ( order : number, count : number ) : void ;
	}
}
