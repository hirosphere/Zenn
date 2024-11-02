import { log } from "../common.js";
import { Leafr , set_value } from "./leafr.js";

export class Renn < S >
{
	constructor( items ? : S [] )
	{
		if( items ) this.new( items );
	}

	public readonly length = new Leafr.Entity ( 0 );
	public readonly orders : Order < S > [] = [] ;
	protected p_refs = new Set < Renn.Ref < S > > ;

	public add_ref( ref : Renn.Ref < S > )
	{
		this.p_refs.add ( ref ) ;

		ref.add
		(
			{
				src : this ,
				start : 0 ,
				next : this.orders.length ,
				orders : this.orders ,
			}
		);
	}

	public clear ()
	{
		this.remove ( 0, this.orders.length ) ;
	}

	public new
	(
		srcs : S [],
		start ? : Order.pos
	)
	: void
	{
		start = pos_trim( start, this.orders ) ;

		const orders = srcs.map
		(
			src => new Order( this, src )
		);

		this.orders.splice
		(
			start, 0,
			... orders
		);

		this.update_orders( start, this.orders.length ) ;

		const note =
		{
			src : this ,
			start ,
			next : start + srcs.length ,
			orders ,
		} ;

		this.p_refs.forEach
		(
			ref => ref.add( note )
		);

		this.length [ set_value ] ( this.orders.length ) ;
	}

	public remove
	(
		start : number ,
		count : number = 1,
	)
	{
		const next = pos_trim
		(
			start + count ,
			this.orders
		);

		start = pos_trim( start, this.orders ) ;

		const orders = this.orders.splice
		(
			start,
			next - start,
		);

		orders.forEach
		(
			order => order [ _set_renn_ ] ()
		);

		this.update_orders( start, this.orders.length ) ;

		const note =
		{
			src : this ,
			start ,
			next ,
			orders ,
		};

		log( start , next );

		this.p_refs.forEach
		(
			ref => ref.remove( note )
		);

		this.length [ set_value ] ( this.orders.length ) ;
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
			this.orders [ pos ] [ set_value ] ( pos );
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
		public add ( range : note < S > ) {}
		public remove ( range : note < S > ) {}
	}

	export type range =
	{
		readonly start : number ;
		readonly next : number ;
	};

	export type note < S = any > = range &
	{
		readonly src : Renn < S > ;
		readonly orders : Order < S > [] ;
	};
}



/* */

export const _set_renn_ = Symbol();

export class Order < S > extends Leafr.Entity < Order.pos >
{
	constructor
	(
		protected renn : Renn < S > | undefined,
		public readonly src : S,
	)
	{
		super( undefined );
	}

	protected _count_ ? : Leafr.Converter < Order.pos > ;

	public get count ()
	{
		return this._count_ ??= new Leafr.Converter
		(
			this,
			to_count
		);
	}

	public [ _set_renn_ ] ( renn ? : Renn < S > )
	{
		this.renn = renn ;
	}

	public remove()
	{
		this.value !== undefined &&
		(
			this.renn ?.remove ( this.value, 1 )
		);
	}

	protected term ()
	{
		this.renn = undefined ;
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


