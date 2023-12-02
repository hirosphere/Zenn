import { Exist, Owner } from "../model/index.js";
import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";

const log = console.log;

export const createParts = ( owner : Owner, def : defs.Part [], ce : Element ) : PartsFragment | undefined =>
{
	return new DefReader( owner, def, ce ).next;
};

class DefReader
{
	constructor
	(
		public owner : Owner,
		public def : defs.Part [],
		public ce : Element,
	)
	{}

	pos : number = 0;

	get next() : PartsFragment | undefined
	{
		if( this.pos >= this.def.length )  return;

		const pdef = this.def[ this.pos ];
		if( pdef instanceof defs.Each )
		{
			this.pos ++;
			return new EachPF( pdef, this );
		}
		return new LiteralPF( this );
	}

	literal( fn : ( def: defs.Node ) => void ) : void
	{
		while( this.pos < this.def.length )
		{
			const pdef = this.def[ this.pos ];
			if( pdef instanceof defs.Each ) break;

			this.pos ++;
			fn( pdef );
		}
	}
}


/** class PartsFragment */

export class PartsFragment extends Exist
{
	public next ? : PartsFragment;
	protected items = new Array < Nodet > ;
	
	protected createItem( def : defs.Node, ce : Element ) : Nodet
	{
		log( def );
		return new Nodet( this, def, ce );
	}
}


/** Literal Parts Fragment  */

class LiteralPF extends PartsFragment
{
	constructor( rd : DefReader )
	{
		super( rd.owner );
		rd.literal( def => this.createItem( def, rd.ce ) );
		this.next = rd.next;
	}
}

/** Each Parts Fragment */

class EachPF extends PartsFragment
{
	constructor( def : defs.Each, rd : DefReader )
	{
		super( rd.owner );

		if( def.source instanceof Array )
		{
			def.source.forEach (
				value => this.createItem (
					def.create( value ), rd.ce )
			);
		}

		this.next = rd.next;
	}
}
