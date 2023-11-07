/*
	[ class Lian ]

	要素の順序・構成の変更通知が得られるArray。
	要素の型は、専用のLian.Itemクラスの継承クラスのみ。

	DOMエレメントのchildNodesの動的な構成変更を実現するために、モデルとして使用。
*/

import { Leaf, setRoValue } from "./leaf.js";

const log = console.log;

export class Lian < Item extends Lian.Item > extends Array < Item >
{
	static create < Item extends Lian.Item > ( items : Item[] ) : Lian < Item >
	{
		return new Lian < Item > () .addItems( items );
	}

	protected refs = new Set < Lian.Ref > ();

	public ref( ref : Lian.Ref ) : void
	{
		this.refs.add( ref );
		ref.add?.( 0, this.length );
	}

	//  //

	public addItems( items : Item[], start ? : number ) : this
	{
		const st = regnext( this, start );
		this.splice( st, 0, ... items );

		items.forEach( i => i[ lian ] = this );
		this.reorder( st, this.length );
		this.refs.forEach(  ref => ref.add?.( st, items.length )  );

		return this;
	}

	// order operations //

	public add( item : Item, order ? : number ) : void
	{
		const ord = regnext( this, order );
		this.splice( ord, 0, item );
		item[ lian ] = this;

		this.reorder( ord, this.length );
		this.refs.forEach(  ref => ref.add?.( ord, 1 )  );
	}

	public remove( item : Item ) : void
	{
		if( item[ lian ] != this )  return;

		const order = item.order.v;

		if( order < 0 || this.length <= order )  return;
		if( item != this[ order ] )  return;

		delete item[ lian ];
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
			this[ ord ].order[ setRoValue ]( ord );
		}
	}
}

const regnext = ( ar : Array < any >, order ? : number ) : number =>
{
	if( order == undefined || order > ar.length || order < 0 ) return ar.length;
	return order;
}

const lian = Symbol();

export namespace Lian
{
	export class Item
	{
		public readonly order = new Leaf.Ro.Number( 0 );
		public [ lian ] ? : Lian < Item > ;
	
		remove()
		{
			this[ lian ]?.remove( this );
			delete this[ lian ];
		}
	}
	
	
	export interface Ref
	{
		bind ? () : void ;
		swap ? ( low : number, high : number ) : void ;
		move ? ( from : number, to : number ) : void ;
		add ? ( order : number, count : number ) : void ;
		remove ? ( order : number, count : number ) : void ;
	}
}

