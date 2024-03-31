import  { Con, Exist, Leafr, Leaf, Renn, Branch, navi, dom, ef, log, root } from "../../meh/index.js";
import * as srctypes from "../map/types.js";

type rooms = Record < srctypes.path, Room >;

const ents = Object.entries;
const vals = Object.values;

const browser = new class extends navi.Browser
{
	constructor()
	{
		super( root, {} );
	}

	public override make_link( index : navi.Index ) : string
	{
		const ps =
		{
			room: index.path.value,
		};
		return this.root + "?" + new URLSearchParams( ps ).toString();
	}
};

class Index extends navi.Index
{
}

const make_path = ( index : srctypes.index, con ? : Index ) =>
{
	return ( con ? con.path.v + "-" : "" ) + index;
}

export class Danchi extends Exist
{
	parts : Record < srctypes.index, Block > = {};

	constructor( con: Con, src : srctypes.danchi )
	{
		super( con, )

		for( const [ pindex, psrc ] of ents( src.blocks ) )
		{
			this.parts[ pindex ] = new Block( this, pindex, psrc, this.rooms );
		}  
	}

	rooms : rooms = {}
}

export class Block extends Index
{
	constructor( con : Con, public readonly index : srctypes.index, src : srctypes.block, rooms : rooms )
	{
		super( con, browser, { path: make_path( index ) } );

		// log( this.path, "街区" );

		for( const [ pindex, psrc ] of ents( src.buildings ) )
		{
			this.parts[ pindex ] = new Building( this, pindex, psrc, rooms );
		}
	}

	parts : Record < srctypes.index, Building > = {};
}

export class Building extends Index
{
	constructor( con : Index, public readonly index : srctypes.index, src : srctypes.building, rooms : rooms )
	{
		super( con, browser, { path: make_path( index, con ) } );

		log( this.path.v );

		for( const [ pindex, psrc ] of ents( src.rooms ) )
		{
			this.parts[ pindex ] = new Room( this, pindex, psrc, rooms );
		}
	}

	parts : Record < srctypes.index, Room > = {};
}

export class Room extends Index
{
	constructor( con : Index, public readonly index : srctypes.index, src : srctypes.room, rooms : rooms )
	{
		super( con, browser, { title: src.title, path: make_path( index, con ) } );

		// log( this.path.v );
		// log( this.link );

		this.mod_path = `./${ this.path.v.replace( /-/g, "/" ) }.js`;

		rooms[ this.path.v ] = this;
	}

	mod_path : string ;
}
