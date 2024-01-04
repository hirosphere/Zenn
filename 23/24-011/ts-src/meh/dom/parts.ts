import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
const log = console.log;


/** createParts */

export const createParts = ( nodet : Nodet, def : defs.Part [] ) : PartFragment | undefined =>
{
	return new Reader( nodet, def ).next();
};


/** Reader  */

class Reader
{
	protected pos : number = 0

	constructor( public nodet : Nodet, protected def : defs.Part[] ) {}

	public next() : PartFragment | undefined
	{
		const begin = this.pos;
		let literal : defs.Node [] = [];

		for( ; this.pos < this.def.length ; this.pos ++ )
		{
			let part = this.def[ this.pos ];
			if( part instanceof defs.Each )
			{
				if( this.pos > begin ) break;
				return new Each( part, this );
			}
			
			else
			{
				literal.push( part );
			}
		}

		if( literal.length )
		{
			return new Literal( literal, this );
		}
	}

	public terminate() : void
	{
	}
}


/** class PartFragment */

export class PartFragment
{
	public next ? : PartFragment ;

	public get firstNode () : Node | undefined { return ; }

	public terminate()
	{
		this.next?.terminate();
	}
}

class Literal extends PartFragment
{
	constructor( protected def : defs.Node [], reader : Reader )
	{
		super();
		this.next = reader.next();

		def.forEach( partdef => new Nodet( reader.nodet, partdef, reader.nodet.e || null ) );

		log( "Literal PF", def )
	}
}

class Each extends PartFragment
{
	constructor( protected def : defs.Each < any >, reader : Reader )
	{
		super();
		this.next = reader.next();

		log( "Each PF" );
	}
}
