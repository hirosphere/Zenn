import { log } from "../common.js";

import { Renn, Order } from "../model/index.js";
import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

export const create_place =
(
	ce : Element ,
	df : DocumentFragment ,
	def : defs.parts
)
: Place | undefined =>
(
	next_place( ce, df, def, 0 )
);

const next_place =
(
	ce : Element ,
	df : DocumentFragment ,
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
			return new EachPlace( ce, df, cur, def, pos );
		}

		return ;
	}

	if( cur !== undefined )
	{
		return new StaticPlace( ce, df, def, pos );
	}
};

/* */


export class Place
{
	protected next ? : Place ;

	protected make_part
	(
		df : DocumentFragment ,
		pdef : defs.part ,
	)
	 : nodet.Nodet | Node | undefined
	{
		let is_period = false

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
		df : DocumentFragment ,
		def : defs.parts ,
		pos : number ,
	)

	{
		super();

		while( pos < def.length )
		{
			const pdef = def[ pos ] ;

			if( ! this.make_part( df, pdef ) )
			{
				break ;
			}

			pos ++ ;
		}

		this.next = next_place( ce, df, def, pos );
	}
}


type part = nodet.Nodet | Node ;

class EachPlace extends Place
{
	protected parts = new Map < Order < any > , part > ;

	constructor
	(
		ce : Element,
		protected df : DocumentFragment,
		protected def : defs.Each,
		parts_def : defs.parts ,
		pos : number ,
	)
	{
		super();

		def.source.add_ref ( this ) ;

		false && def.source.orders.forEach
		(
			order => this.make_part
			(
				df ,
				def.create_node( order )
			)
		);

		this.next = next_place( ce, df, parts_def, pos );
	}

	public add ( { src , start , next } : Renn.range )
	{
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
				this.df ,
				this.def.create_node( order )
			);

			part && this.parts.set
			(
				order ,
				part,
			) ;
		}
	}

	public remove ( range : Renn.range ){}
}
