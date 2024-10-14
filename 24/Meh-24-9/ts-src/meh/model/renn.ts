import { _refs_, _set_value_, log } from "../common.js";
import { Leafr, Srcr } from "./leaf.js";

export class Renn < S >
{
	constructor( items ? : S [] )
	{
		if( items ) this.new( items );
	}

	public readonly orders : Order < S > [] = [] ;
	protected [ _refs_ ] = new Set < Renn.Ref < S > > ;

	 public add_ref( ref : Renn.Ref < S > )
	 {
		this [ _refs_ ] .add ( ref ) ;

		ref.add
		(
			{
				src : this ,
				start : 0 ,
				next : this.orders.length ,
			}
		);
	 }

	public new
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

		this.update_orders( start, this.orders.length ) ;

		const note =
		{
			src : this ,
			start ,
			next : start + srcs.length
		} ;

		log( "new", note )

		this [ _refs_ ] .forEach
		(
			ref => ref.add( note )
		);
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

export namespace Renn
{
	export class Ref < S >
	{
		public add ( range : range < S > ) {}
		public remove ( range : range < S > ) {}
	}

	export type range < S = any > =
	{
		readonly src : Renn < S > ,
		readonly start : number ;
		readonly next : number ;
	};
}



/* */

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
			to_count
		)
	}
}

const to_count = ( pos : Order.pos ) : Order.pos =>
(
	typeof pos == "number" ? pos + 1 : pos
);

export namespace Order
{
	export type pos = number | undefined ;	
}


