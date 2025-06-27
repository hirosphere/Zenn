import { log } from "../Util.js" ;
import { DD , MehElement, MehText , MehNode } from "./DOM.js" ;

/* */

export class PartsPlace
{
	public static create
	(
		dec : DD.Part [] ,
		cel : Element ,
		rel : Node | null = null ,
	
	) : PartsPlace | null
	{
		return new Reader ( dec , cel , rel ).next ;
	}


	/* */

	next : PartsPlace | null = null ;

	constructor
	(
		protected cel : Element ,
		protected rel : Node | null ,
	) {}

	makePart ( dec : DD.StaticPart ) : MehNode | null
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
		public cel : Element ,
		public rel : Node | null = null ,
	)
	{}

	get next () : PartsPlace | null
	{
		if ( this.cur instanceof PartsPlace )
		{
			this.pos ++ ;
			return new DynamicPartsPlace ( this ) ;
		}

		const dec : DD.StaticPart [] = [] ;

		while ( true )
		{
			if
			(
				this.cur instanceof DD.pl ||
				this.pos >= this.dec.length
			)
			{
				if ( dec.length )  return new StaticPartPlace ( dec , this ) ;
				const pldec = this.cur ;
				this.pos ++ ;
				if ( pldec instanceof DD.pl.Free )  return new FreePartsPlace ( pldec , this ) ;
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
	constructor ( dec : DD.StaticPart [] , rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;
		dec.forEach( dec => this.makePart ( dec ) ) ;
		this.next = rdr.next ;
	}
}

class FreePartsPlace extends PartsPlace
{
	constructor ( dec : DD.pl.Free , rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;
		this.next = rdr.next ;
	}
}

class DynamicPartsPlace extends PartsPlace
{
	constructor ( rdr : Reader )
	{
		super ( rdr.cel , rdr.rel ) ;

		this.next = rdr.next ;
	}
}
