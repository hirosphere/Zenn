import { log } from "../common.js";

import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

export const create_place =
(
	ce : Element ,
	df : DocumentFragment ,
	def : defs.parts
) : Place | undefined =>
(
	next_place( ce, df, def.flat( 20 ) as defs.part_items, 0 )
);

const next_place =
(
	ce : Element ,
	df : DocumentFragment ,
	def : defs.part_items,
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
		pdef : defs.part_item ,
	)
	 : boolean
	{
		let is_period = false

		if( pdef instanceof nodet.Nodet )
		{
			pdef.node && df.appendChild( pdef.node );
		}

		else if( pdef instanceof Node )
		{
			df.appendChild( pdef );
		}

		else if( ! ( pdef instanceof defs.Place ) )
		{
			const n = new nodet.Text( pdef ) ;
			n.node && df.appendChild( n.node ) ;
		}

		else is_period = true ;

		return is_period ;
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
		def : defs.part_items ,
		pos : number ,
	)

	{
		super();

		while( pos < def.length )
		{
			const pdef = def[ pos ] ;

			if( this.make_part( df, pdef ) )
			{
				break ;
			}

			pos ++ ;
		}

		this.next = next_place( ce, df, def, pos );
	}
}

class EachPlace extends Place
{
	constructor
	(
		ce : Element,
		df : DocumentFragment,
		edef : defs.Each,
		def : defs.part_items ,
		pos : number ,
	)
	{
		super();

		log( "EachPlace", edef.source.items )

		edef.source.items.forEach
		(
			value => this.make_part
			(
				df ,
				edef.create_node( value )
			)
		);

		this.next = next_place( ce, df, def, pos );
	}
}
