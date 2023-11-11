/*
	[ class Lian ]

	要素の順序・構成の変更通知が得られるArray。

	DOMエレメントのchildNodesの動的な構成変更を実現するために、モデルとして使用。
*/

import { Leaf, setRoValue } from "./leaf.js";

const log = console.log;

export class Lian < O extends Order = Order > extends Array < O >
{
	public readonly vlength = new Leaf.Ro.Number( 0, { owner: this } );
	protected refs = new Set < Lian.Ref > ();

	public ref( ref : Lian.Ref ) : void
	{
		this.refs.add( ref );
		ref.add?.( 0, this.length );
	}

	// order operations //

	public addOrders( orders : O[], start ? : number )
	{
		const st = regnext( this, start );
		this.splice( st, 0, ... orders );

		this.vlength[ setRoValue ]( this, this.length );
		this.reposit( st, this.length );
		this.refs.forEach(  ref => ref.add?.( st, orders.length )  );

		return this;
	}

	public addOrder( order : O, position ? : number ) : void
	{
		const pos = regnext( this, position );
		this.splice( pos, 0, order );

		this.vlength[ setRoValue ]( this, this.length );
		this.reposit( pos, this.length );
		this.refs.forEach(  ref => ref.add?.( pos, 1 )  );
	}

	public remove( order : O ) : void
	{
		if( order.owner != this )  return;

		const pos = order.pos.v;

		if( pos < 0 || this.length <= pos )  return;
		if( order != this[ pos ] )  return;

		this.splice( pos, 1 );

		this.vlength[ setRoValue ]( this, this.length );
		this.reposit( pos, this.length );
		this.refs.forEach(  ref => ref.remove?.( pos, 1 )  );
	}

	public clear() : void
	{
		const len = this.length;
		this.refs.forEach(  ( ref ) => ref.remove?.( 0, len )  );
		this.length = 0;
		this.vlength[ setRoValue ]( this, this.length );
	}

	//  //

	protected reposit( start : number, next : number ) : void
	{
		for( let pos = start; pos < next; pos ++ )
		{
			this[ pos ].pos[ setRoValue ]( this, pos );
		}
	}

	//  //

	public terminate()
	{
		this.clear();
		this.refs.clear();	
	}
}

export class Order
{	
	public readonly pos : Leaf.Ro.Number ;
	constructor ( public readonly owner ? : Lian )
	{
		this.pos = new Leaf.Ro.Number( -1, { owner } );
	}

	public remove() : void { this.owner?.remove( this ); }

	public terminate()
	{
	}
}

const regnext = ( ar : Array < any >, order ? : number ) : number =>
{
	if( order == undefined || order > ar.length || order < 0 ) return ar.length;
	return order;
}

//   //

export class ValueLian < V > extends Lian < ValueOrder < V > >
{
	static create < V > ( items : V[] ) : ValueLian < V >
	{
		return new ValueLian < V > ().addValues( items );
	}

	protected refs = new Set < Lian.Ref > ();

	public ref( ref : Lian.Ref ) : void
	{
		this.refs.add( ref );
		ref.add?.( 0, this.length );
	}

	//  //

	public addValues( values : V[], start ? : number ) : this
	{
		this.addOrders( values.map( val => this.createOrder( val ) ), start );
		return this;
	}

	protected createOrder( value : V ) : ValueOrder < V >
	{
		return new ValueOrder( this, value );
	}

	public add( value : V, position ? : number ) : void
	{
		const o = new ValueOrder < V > ( this, value );
		this.addOrder( o, position );
	}
}

export class ValueOrder < V > extends Order
{	
	constructor (
		owner : ValueLian < V >,
		public readonly value : V
	) {
		super( owner );
	}

	get v() { return this.value }
	get val() { return this.value }
}

export namespace Lian
{
	export interface Ref
	{
		bind ? () : void ;
		swap ? ( low : number, high : number ) : void ;
		move ? ( from : number, to : number ) : void ;
		add ? ( order : number, count : number ) : void ;
		remove ? ( order : number, count : number ) : void ;
	}
}

