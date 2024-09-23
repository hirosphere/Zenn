import { Exist, Renn, Order } from "../model/index.js";
import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
import _ls from "../ls.js";
const ls = _ls.dom.parts;
const log = console.log;



export class Parts extends Renn < Nodet >
{
	constructor( public nodet : Nodet, def : defs.Part [] )
	{
		super( nodet );
		this.pf = new Reader( this, def ).next()
	}

	protected pf;

	public create_part( def : defs.Node, position ? : number ) : Nodet
	{
		const rel = position !== undefined && this.nodet?.e?.childNodes[ position ] || undefined;

		return new Nodet
		(
			this,
			def,
			this.nodet?.e || null,
			rel
		);
	}

	public override terminate() : void
	{
		this.pf?.pf_term();
		super.terminate();
	}
}


/** 定義リーダー defs.Part [] 型の定義を順次読み、PartFragmentを作成  */

class Reader
{
	protected pos : number = 0

	constructor
	(
		public parts : Parts,
		protected def : defs.Part[]
	) {}

	public next() : PartFragment | undefined
	{
		return this.next_literal() || this.next_each();
	}

	protected next_literal() : PartFragment | undefined
	{
		const def : defs.Node[] = [];

		for( ; this.pos < this.def.length ; this.pos ++ )
		{
			if( this.cur instanceof defs.RennEach )  break;
			if( this.cur != null ) def.push( this.cur );
		}

		return def.length && new LiteralPF( def, this ) || undefined;
	}

	protected next_each() : PartFragment | undefined
	{
		const cur = this.cur;
		if( cur instanceof defs.RennEach )
		{
			// ls.reader.$( "", a => log( `pf.reader ${ this.parts.nodet.runiq } next_each` ) );

			this.pos ++;
			return new EachPF( cur, this );
		};
	}

	protected get cur() : defs.Part | undefined { return this.def[ this.pos ]; }
}


/** class PartFragment */

export class PartFragment extends Exist
{
	constructor
	(
		protected reader : Reader,
	)
	{
		super( reader.parts );
	}	

	public next ? : PartFragment ;

	public get first_node () : Node | undefined { return ; }

	protected create_part( def : defs.Node, rel ? : Node ) : Nodet
	{
		return new Nodet
		(
			this.reader.parts,
			def,
			this.reader.parts.nodet.e || null,
			rel
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
		def.forEach( pdef => reader.parts.create_part( pdef ) );
		this.next = reader.next();
	}
}

class EachPF extends PartFragment
{
	constructor( protected def : defs.RennEach < any >, reader : Reader )
	{
		super( reader );
		
		// ls.each.$( "", a => log( "Each PF" ) );

		def.force = ( value ) =>
		{
			const pdef = def.create?.( value );
			pdef && this.create_part( pdef );
		};

		if( def.source instanceof Array )
		{
			def.source.forEach( value => this.create_part( def.create?.( value ) ?? value ) );
		}

		if( def.source instanceof Renn )
		{
			this.source = new Renn.Ref < any >
			(
				this,
				{
					create: ( start, orders ) => this.insert_parts( start, orders ),
					delete: ( orders ) => this.delete_parts( orders )
				},
				def.source
			);
		}

		
		this.next = reader.next();
	}

	protected noteds = new Map < Order < any >, Nodet > ;

	protected source ? : Renn.Ref < any >;

	protected insert_parts( start : Order < any > | undefined, orders : Order < any > [] ) : void
	{
		const rel = start && this.noteds.get( start )?.node || undefined;

		for( const order of orders )
		{
			// log( order.source )

			const nodet = this.create_part
			(
				this.def.create( order ),
				rel
			);

			this.noteds.set( order, nodet );
		}
	}

	protected delete_parts( orders : Order < any > [] ) :void
	{
		for( const order of orders )
		{
			this.noteds.get( order )?.terminate();
			this.noteds.delete( order );
		}
	}

	public override pf_term(): void
	{
		this.source?.terminate();
		super.pf_term();
	}
}
