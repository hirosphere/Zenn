import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
const log = console.log;
const ltrue = true;
const ls = { rdr: ltrue, base: ltrue, each: ltrue };


/** createParts */

export const createParts =
(
	nodet : Nodet,
	ce : Element,
	def : defs.Part []

) : PartFragment | undefined =>
{
	return new Reader( nodet, ce, def ).next();
};


/** Reader  */

class Reader
{
	protected pos : number = 0

	constructor
	(
		public nodet : Nodet,
		public ce : Element,
		protected def : defs.Part[]
	) {}

	public next() : PartFragment | undefined
	{
		const start_pos = this.pos;
		return this.next_literal() || this.next_each();
	}

	protected next_literal() : PartFragment | undefined
	{
		const def : defs.Node[] = [];

		for( ; this.pos < this.def.length ; this.pos ++ )
		{
			if( this.cur instanceof defs.Each )  break;
			def.push( this.cur );
		}

		ls.rdr && def.length && log( `pf.reader ${ this.nodet.runiq } next_literal` );

		return def.length && new LiteralPF( def, this ) || undefined;
	}

	protected next_each() : PartFragment | undefined
	{
		const cur = this.cur;
		if( cur instanceof defs.Each )
		{
			ls.rdr && log( `pf.reader ${ this.nodet.runiq } next_each` );

			this.pos ++;
			return new EachPF( cur, this )
		};
	}

	protected get cur() : defs.Part | undefined { return this.def[ this.pos ]; }
}


/** class PartFragment */

export class PartFragment
{
	constructor
	(
		protected reader : Reader,
	)
	{}	

	public next ? : PartFragment ;

	public get firstnode () : Node | undefined { return ; }

	protected create_part( def : defs.Node )
	{
		new Nodet
		(
			this.reader.nodet,
			def,
			this.reader.ce || null
		);
	}

	public pf_term()
	{
		this.next?.pf_term();
	}
}

class LiteralPF extends PartFragment
{
	constructor( protected def : defs.Node [], reader : Reader )
	{
		super( reader );
		def.forEach( pdef => this.create_part( pdef ) );
		this.next = reader.next();
	}
}

class EachPF extends PartFragment
{
	constructor( protected def : defs.Each < any >, reader : Reader )
	{
		super( reader );
		
		ls.each && log( "Each PF" );

		def.force = ( value ) =>
		{
			ls.each && log( "force", def?.create );
			const pdef = def.create?.( value );
			pdef && this.create_part( pdef );
			log( "each" );
		};

		this.next = reader.next();
	}
}
