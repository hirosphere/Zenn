import { log } from "../common.js";

import { Renn, Order } from "../model/index.js";
import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

export const create_place =
(
	ce : Element ,
	def : defs.parts ,
	rel_n ? : Node ,
)
: Place | undefined =>
(
	next_place( ce, def, 0 )
);

const next_place =
(
	ce : Element ,
	def : defs.parts,
	pos : number,
)
: Place | undefined =>
{
	const cur = def[ pos ];
	
	if( cur instanceof defs.Place )
	{
		pos ++ ;

		if( cur instanceof defs.Each )
		{
			return new EachPlace( ce, cur, def, pos );
		}

		return ;
	}

	if( cur !== undefined )
	{
		return new StaticPlace( ce, def, pos );
	}
};

/* */


export abstract class Place
{
	protected next ? : Place ;
	public abstract get first_node () : Node | undefined ;

	protected make_part
	(
		df : DocumentFragment ,
		pdef : defs.part ,
	)
	 : nodet.Nodet | Node | undefined
	{
		if( pdef instanceof nodet.Nodet )
		{
			pdef.node && df.appendChild( pdef.node );
			return pdef ;
		}

		else if( pdef instanceof Node )
		{
			df.appendChild( pdef );
			return pdef ;
		}

		else if( ! ( pdef instanceof defs.Place ) )
		{
			const text = new nodet.Text( pdef ) ;
			text.node && df.appendChild( text.node ) ;
			return text ;
		}
	}

	public destruct()
	{}
}



class StaticPlace extends Place
{
	constructor
	(
		ce : Element ,
		def : defs.parts ,
		pos : number ,
	)

	{
		super();

		const df = new DocumentFragment ;

		while( pos < def.length )
		{
			const pdef = def[ pos ] ;

			const part = this.make_part( df, pdef );

			this._first_node_ ??=
			(
				part instanceof Node ?
					part :
					part?.node
			);

			if( ! part )  break ;
			pos ++ ;
		}

		ce.appendChild( df ) ;

		this.next = next_place( ce, def, pos );
	}

	public override get first_node ()
	{
		return this._first_node_ ;
	}

	protected _first_node_ ? : Node ;
}


class EachPlace extends Place
{
	protected src : Renn < any > ;
	protected create_node : ( order : Order < any > ) => defs.node ;
	protected parts = new Map < Order < any > , Node > ;

	constructor
	(
		protected ce : Element,
		def : defs.Each,
		parts_def : defs.parts ,
		pos : number ,
	)
	{
		super();

		this.src = def.source ;
		this.create_node = def.create_node ;

		def.source.add_ref ( this ) ;
		this.next = next_place( ce, parts_def, pos );
	}

	public add ( { src , start , next } : Renn.note )
	{
		const df = new DocumentFragment ;

		for
		(
			let pos = start ;
			pos < next ;
			pos ++
		)
		{
			const order = src.orders [ pos ] ;
			if( this.parts.has( order ) )  return ;

			const part = this.make_part
			(
				df ,
				this.create_node( order )
			);

			const node = part instanceof Node ? part : part ?.node ;
			node && this.parts.set
			(
				order , node
			) ;
		}

		const next_ord = this.src.orders [ next ];

		this.ce.insertBefore
		(
			df,
			(
				this.parts.get( next_ord ) ??
				this.next ?.first_node ??
				null
			)
		);
	}

	public remove ( { src, start, next } : Renn.note )
	{
	}

	public override get first_node (): Node | undefined
	{
		return this.parts.get
		(
			this.src.orders [ 0 ]
		);
	}
}
