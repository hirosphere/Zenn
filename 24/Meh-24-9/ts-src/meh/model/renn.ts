import { log } from "../common.js";
import { leaf , set_value } from "./leaf.js";

export class Renn < S >
{
	constructor( items ? : S [] )
	{
		if( items ) this.new( items );
	}

	public readonly length = leaf.num ( 0 );
	public readonly orders : Order < S > [] = [] ;
	protected p_refs = new Set < Renn.Ref < S > > ;

	public add_ref( ref : Renn.Ref < S > )
	{
		this.p_refs.add ( ref ) ;

		ref.src_add_orders
		(
			{
				src : this ,
				start : 0 ,
				next : this.orders.length ,
				items : this.orders ,
			}
		);
	}

	public replace ( targets : S [] ) : void
	{
		this.clear () ;
		this.new ( targets ) ;
	}

	public clear () : void
	{
		this.remove ( 0, this.orders.length ) ;
	}

	public new ( srcs : S [] , start ? : Order.value ) : void
	{
		start = pos_trim( start, this.orders ) ;

		const items = srcs.map
		(
			src => new Order( this, src )
		);

		this.orders.splice
		(
			start, 0,
			... items
		);

		this.update_items( start, this.orders.length ) ;

		const note =
		{
			src : this ,
			start ,
			next : start + srcs.length ,
			items ,
		} ;

		this.p_refs.forEach
		(
			ref => ref.src_add_orders( note )
		);

		this.length [ set_value ] ( this.orders.length ) ;
	}

	public remove ( start : number , count : number = 1 ) : void
	{
		const next = pos_trim
		(
			start + count ,
			this.orders
		);

		start = pos_trim( start, this.orders ) ;

		const removed = this.orders.splice
		(
			start,
			next - start,
		);

		removed.forEach
		(
			pos => pos [ set_renn ] ()
		);

		this.update_items( start, this.orders.length ) ;

		const note =
		{
			src : this ,
			start ,
			next ,
			items: removed ,
		};

		this.p_refs.forEach
		(
			ref => ref.src_remove_orders( note )
		);

		this.length [ set_value ] ( this.orders.length ) ;
	}

	protected update_items
	(
		start : number,
		next : number
	)
	{
		for ( let pos = start ; pos < next ; pos ++ )
		{
			this.orders [ pos ] [ set_value ] ( pos );
		}
	}
}

const pos_trim = ( pos : Order.value, ar : Array < any > ) =>
{
	if( pos === undefined || pos >= ar.length )  return ar.length ;
	if( pos < 0 )  return 0 ;
	return pos ;
}

export namespace Renn
{
	export interface Ref < S >
	{
		src_add_orders ( range : note < S > ) : void ;
		src_remove_orders ( range : note < S > ) : void ;
	}

	export type range =
	{
		readonly start : number ;
		readonly next : number ;
	};

	export type note < S = any > = range &
	{
		readonly src : Renn < S > ;
		readonly items : Order < S > [] ;
	};
}



/* */

const set_renn = Symbol();

export class Order < S > extends leaf.Entity < Order.value >
{
	constructor
	(
		protected renn : Renn < S > | undefined,
		public readonly target : S,
	)
	{
		super( undefined );
	}

	protected p_count ? : leaf.r < Order.value > ;

	public get count ()
	{
		return this.p_count ??= new leaf.Conv
		(
			this,
			to_count
		);
	}

	public [ set_renn ] ( renn ? : Renn < S > )
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
}

const to_count = ( pos : Order.value ) : Order.value =>
(
	typeof pos == "number" ? pos + 1 : pos
);

export namespace Order
{
	export type value = number | undefined ;	
}


