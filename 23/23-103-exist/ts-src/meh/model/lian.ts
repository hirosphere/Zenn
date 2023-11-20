/*
	[ class Lian ]

	要素の順序・構成の変更通知が得られるArray。

	DOMエレメントのchildNodesの動的な構成変更を実現するために、モデルとして使用。
*/

import { Leaf, setRoValue } from "./leaf.js";

const log = console.log;

/** owner : symbol  OederがLianを保持するために使用。 */

const owner = Symbol();
const readonlykey = {};


/** class Lian */

export class Lian < O extends Order = any > extends Array < O >
{
	public readonly vlength = new Leaf.Ro.Number( 0, { readonlykey } );
	protected refs = new Set < Lian.Ref > ();
	protected _array = this;

	//  //

	public ref( ref : Lian.Ref ) : void
	{
		this.refs.add( ref );
		ref.add?.( 0, this._array.length );
	}

	// order life methods //

	public insert( create : () => O, count : number ) :void
	{
		const ords = [];
		for( let i = 0; i < count; i ++ )  ords.push( create() );
		this.addOrders( ords, this._array.length );
	}

	public addOrder( order : O, pos ? : number ) : void
	{
		this.addOrders( [ order ], pos );
	}

	public removeOrder( order: O ) : void
	{
		if( order[ owner ] != this ) return;
		this.removeOrders( order.pos.val, 1 );
	}

	public addOrders( orders : O[], start ? : number ) : this
	{
		if( orders.length == 0 ) return this;

		const st = regnext( this, start );
		this._array.splice( st, 0, ... orders );

		orders.forEach( order => order[ owner ] = this );

		this.vlength[ setRoValue ]( readonlykey, this.length );
		this.reposit( st, this._array.length );
		this.refs.forEach(  ref => ref.add?.( st, orders.length )  );

		return this;
	}

	public removeOrders( start : number, count ? : number ) : void
	{
		if( start < 0 || this._array.length <= start )  return;

		const rems = this._array.splice( start, count );

		rems.forEach( rem => rem[ owner ] = null );

		this.vlength[ setRoValue ]( readonlykey, this._array.length );
		this.reposit( start );
		this.refs.forEach(  ref => ref.remove?.( start, rems.length )  );
	}

	public clear() : void
	{
		const len = this._array.length;
		this.refs.forEach(  ( ref ) => ref.remove?.( 0, len )  );
		this._array.length = 0;
		this.vlength[ setRoValue ]( readonlykey, this._array.length );
	}

	//  //

	protected reposit( start : number, next : number = this._array.length ) : void
	{
		next = Math.min( next, this._array.length );
		for( let pos = start; pos < next ; pos ++ )
		{
			this._array[ pos ].pos[ setRoValue ]( readonlykey, pos );
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
	public [ owner ] : Lian | null = null;
	public readonly pos : Leaf.Ro.Number ;

	constructor ()
	{
		this.pos = new Leaf.Ro.Number( -1, { readonlykey } );
	}

	public remove() : void { log( "remove", this.pos.v ); this[ owner ]?.removeOrder( this ); }

	public terminate()
	{
		this.remove();
		this[ owner ] = null;
	}
}

const regnext = ( ar : Array < any >, pos ? : number ) : number =>
{
	if( pos == undefined || pos > ar.length  ) return ar.length;
	if( pos < 0 ) return 0;
	return pos;
}

//   //

export class LianV < V > extends Lian < OrderV < V > >
{
	static create < V > ( values : V[] ) : LianV < V >
	{
		return new LianV < V > ().addValues( values );
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
		const orders = values.map( value => new OrderV( value ) );
		this.addOrders( orders, start );
		return this;
	}

	public addValue( value : V, position ? : number ) : void
	{
		const o = new OrderV( value );
		this.addOrder( o, position );
	}
}

export class OrderV < V > extends Order
{	
	constructor ( public readonly value : V ) { super(); }
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

