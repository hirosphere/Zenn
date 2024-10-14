import { _set_value_, log } from "../common.js";
import { Leafr, Srcr } from "./leaf.js";

export class Renn < S >
{
	public readonly orders : Order < S > [] = [] ;

	constructor( items ? : S [] )
	{
		if( items ) this.insert( items );
	}


	public insert
	(
		srcs : S [],
		start ? : Order.pos
	)
	: void
	{
		start = pos_trim( start, this.orders ) ;

		this.orders.splice
		(
			start, 0,
			... srcs.map( src => new Order( src ) )
		);

		this.update_orders( start, this.orders.length );
	}

	protected update_orders
	(
		start : number,
		next : number
	)
	{
		for
		(
			let pos = start ;
			pos < next ;
			pos ++
		)
		{
			this.orders [ pos ] [ _set_value_ ] ( pos );
		}
	}
}

const pos_trim = ( pos : Order.pos, ar : Array < any > ) =>
{
	if( pos === undefined || pos >= ar.length )  return ar.length ;
	if( pos < 0 )  return 0 ;
	return pos ;
}

export class Order < S > extends Leafr < Order.pos >
{
	constructor
	(
		public readonly src : S,
		order : Order.pos = undefined
	)
	{
		super( order );
	}

	protected _count_ ? : Leafr.Conv < Order.pos > ;

	public get count ()
	{
		return this._count_ ??= new Leafr.Conv
		(
			this,
			v => typeof v == "number" ? v + 1 : v
		)
	}
}

export namespace Order
{
	export type pos = number | undefined ;	
}


