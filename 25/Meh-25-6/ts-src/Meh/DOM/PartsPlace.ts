import { Life , Renn , Order } from "../Model/Model.js" ;
import { DD , MehElement, MehText , MehNode } from "./DOM.js" ;

const log = console.log ;

/* */

export class PartsPlace
{
	public static create
	(
		dec : DD.Part [] ,
		cel : Element | DocumentFragment ,
	
	) : PartsPlace | null
	{
		return new Reader ( dec , cel ).next ;
	}


	/* */

	nodes : MehNode [] = [] ;
	nextPlace : PartsPlace | null = null ;
	get nextNode () : MehNode | null { return ( this.nextPlace ?.nodes [ 0 ] ) ?? null ; }

	constructor
	(
		protected cel : Element | DocumentFragment ,
	) {}

	protected makePart ( dec : DD.Node , rel ? : Node ) : MehNode
	{
		const mn = dec instanceof MehElement ? dec : new MehText ( dec ) ;
		this.cel.insertBefore ( mn.node , rel ?? null ) ;
		return mn ;
	}

	public terminate () : void
	{
		this.nextPlace ?.terminate () ;
		
		while ( this.nodes.length )
		{
			this.nodes.pop () ?.terminate () ;
		}
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
			if ( cur instanceof DD.PartsPlace.Each )  return new RennPlace ( cur , this ) ;
			if ( cur instanceof DD.PartsPlace.Free )  return new FreePlace ( cur , this ) ;
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
				if ( dec.length )  return new StaticPlace ( dec , this ) ;
				return null ;
			}

			if ( this.cur !== undefined ) dec.push ( this.cur ) ;
			this.pos ++ ;
		}
	}

	get cur () : DD.Part | undefined
	{
		return this.dec [ this.pos ] ;
	}
}


/* */

class StaticPlace extends PartsPlace
{
	constructor ( dec : DD.Node [] , rdr : Reader )
	{
		super ( rdr.cel ) ;
		this.nodes = dec.map( dec => this.makePart ( dec ) ) ;
		this.nextPlace = rdr.next ;
	}
}


class FreePlace extends PartsPlace
{
	constructor ( dec : DD.PartsPlace.Free , rdr : Reader )
	{
		super ( rdr.cel ) ;
		this.nextPlace = rdr.next ;
	}
}


class RennPlace < EV > extends PartsPlace
{
	#_src : Renn.Ref < EV > ;

	constructor ( protected dec : DD.PartsPlace.Each < EV > , rdr : Reader )
	{
		super ( rdr.cel ) ;
		
		this.#_src =
		{
			insert : ( start , orders ) =>
			{
				const next = this.nodes [ start ] ;

				const nodes = orders.map
				(
					order => this.makePart
					(
						dec.createNode ( order ) ,
						next ?.node
					)
				) ;

				this.nodes.splice ( start , 0 , ... nodes ) ;
			} ,

			delete : ( start , length ) =>
			{
				const nodes = this.nodes.splice ( start , length ) ;
				nodes.forEach ( node => node .terminate () ) ;
			} ,
		}

		dec.model.add_ref ( this.#_src ) ;

		this.nextPlace = rdr.next ;
	}

	public override terminate () : void
	{
		Life.remove_ref ( this.dec.model , this.#_src ) ;
		super.terminate () ;
	}
}
