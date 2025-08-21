import { log } from "../Util.js" ;
import { DD , MehElement, MehText , MehNode } from "./DOM.js" ;

/* */

export class PartsPlace
{
	public static create
	(
		dec : DD.Part [] ,
		cel : Element | DocumentFragment ,
		rel : Node | null = null ,
	
	) : PartsPlace | null
	{
		return new Reader ( dec , cel , rel ).next ;
	}


	/* */

	next : PartsPlace | null = null ;

	constructor
	(
		protected cel : Element | DocumentFragment ,
		protected rel : Node | null ,
	) {}

	makePart ( dec : DD.Node ) : MehNode | null
	{
		if ( dec === undefined )  return null ;

		const mn = dec instanceof MehElement ? dec : new MehText ( dec ) ;
		this.cel.insertBefore ( mn.node , this.rel ) ;
		return mn ;
	}
}


/* */

class Reader
{
	pos = 0 ;

	constructor
	(
		public dec : DD.Part [] ,
		public cel : Element | DocumentFragment ,
		public rel : Node | null = null ,
	)
	{}

	get next () : PartsPlace | null
	{
		const cur = this.cur ;
		if ( cur instanceof DD.PartsPlace )
		{
			this.pos ++ ;
			if ( cur instanceof DD.PartsPlace.Each )  return new DynamicPartsPlace ( cur , this ) ;
			if ( cur instanceof DD.PartsPlace.Free )  return new FreePartsPlace ( cur , this ) ;
		}

		const dec : DD.Node [] = [] ;

		while ( true )
		{
			if
			(
				this.cur instanceof DD.PartsPlace ||
				this.pos >= this.dec.length
			)
			{
				if ( dec.length )  return new StaticPartPlace ( dec , this ) ;
				return null ;
			}

			dec.push ( this.cur ) ;
			this.pos ++ ;
		}
	}

	get cur () : DD.Part | undefined
	{
		return this.dec [ this.pos ] ;
	}
}


/* */

class StaticPartPlace extends PartsPlace
{
	constructor ( dec : DD.Node [] , rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;
		dec.forEach( dec => this.makePart ( dec ) ) ;
		this.next = rdr.next ;
	}
}


class FreePartsPlace extends PartsPlace
{
	constructor ( dec : DD.PartsPlace.Free , rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;
		this.next = rdr.next ;
	}
}


class DynamicPartsPlace < EV > extends PartsPlace
{
	constructor ( dec : DD.PartsPlace.Each < EV > , rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;
		
		dec.model.orders.forEach
		(
			order => this.makePart ( dec.createNode ( order ) )
		) ;

		this.next = rdr.next ;
	}
}
