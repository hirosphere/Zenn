import { log } from "../common.js";
import { Leafr , set_value } from "./leafr.js";

export class Renn < S >
{
	constructor( items ? : S [] )
	{
		if( items ) this.new( items );
	}

	public readonly length = new Leafr.Entity ( 0 );
	public readonly items : Position < S > [] = [] ;
	protected p_refs = new Set < Renn.Ref < S > > ;

	public add_ref( ref : Renn.Ref < S > )
	{
		this.p_refs.add ( ref ) ;

		ref.add
		(
			{
				src : this ,
				start : 0 ,
				next : this.items.length ,
				items : this.items ,
			}
		);
	}

	public clear ()
	{
		this.remove ( 0, this.items.length ) ;
	}

	public new
	(
		srcs : S [],
		start ? : Position.value
	)
	: void
	{
		start = pos_trim( start, this.items ) ;

		const items = srcs.map
		(
			src => new Position( this, src )
		);

		this.items.splice
		(
			start, 0,
			... items
		);

		this.update_items( start, this.items.length ) ;

		const note =
		{
			src : this ,
			start ,
			next : start + srcs.length ,
			items ,
		} ;

		this.p_refs.forEach
		(
			ref => ref.add( note )
		);

		this.length [ set_value ] ( this.items.length ) ;
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
			this.items
		);

		start = pos_trim( start, this.items ) ;

		const removed = this.items.splice
		(
			start,
			next - start,
		);

		removed.forEach
		(
			pos => pos [ set_renn ] ()
		);

		this.update_items( start, this.items.length ) ;

		const note =
		{
			src : this ,
			start ,
			next ,
			items: removed ,
		};

		this.p_refs.forEach
		(
			ref => ref.remove( note )
		);

		this.length [ set_value ] ( this.items.length ) ;
	}

	protected update_items
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
			this.items [ pos ] [ set_value ] ( pos );
		}
	}
}

const pos_trim = ( pos : Position.value, ar : Array < any > ) =>
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
		readonly items : Position < S > [] ;
	};
}



/* */

const set_renn = Symbol();

export class Position < S > extends Leafr.Entity < Position.value >
{
	constructor
	(
		protected renn : Renn < S > | undefined,
		public readonly src : S,
	)
	{
		super( undefined );
	}

	protected _count_ ? : Leafr.Converter < Position.value > ;

	public get count ()
	{
		return this._count_ ??= new Leafr.Converter
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

	protected term ()
	{
		this.renn = undefined ;
	}
}

const to_count = ( pos : Position.value ) : Position.value =>
(
	typeof pos == "number" ? pos + 1 : pos
);

export namespace Position
{
	export type value = number | undefined ;	
}


