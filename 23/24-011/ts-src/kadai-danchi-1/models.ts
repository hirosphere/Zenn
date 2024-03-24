import { Exist, Leafr, Leaf, Renn, Branch, defs, log, root } from "../meh/index.js";

const ents = Object.entries;
const vals = Object.values;

export namespace types
{
	export type path = string ;
	export type index = string ;

	export type danchi =
	{
		title : string ;
		blocks : Record < index, block > ;
	};
	
	export type block =
	{
		caption : string ;
		buildings : Record < index, building > ;
	};
	
	export type building =
	{
		caption : string ;
		rooms : Record < index, room > ;
	};
	
	export type room =
	{
		title : string ;
	};

	export type Rooms = Record < path, Room > ;
}

class Node
{
	path : string;

	constructor( public index : types.index, con ? : Node )
	{
		this.path = ( con ? con.path + "-" : "" ) + index;
	}
}

export class Room extends Node
{
	constructor( index : types.index, src : types.room, con : Node, rooms : types.Rooms )
	{
		super( index, con );

		// log( this.path, "部屋" );

		this.link = `?room=${ this.path }`;
		this.mod_path = `./${ this.path.replace( /-/g, "/" ) }.js`;

		rooms[ this.path ] = this;
	}

	link : string ;
	mod_path : string ;
}

export class Building extends Node
{
	constructor( index : types.index, src : types.building, con : Node, rooms : types.Rooms )
	{
		super( index, con );

		// log( this.path, "棟" );

		for( const [ pindex, psrc ] of ents( src.rooms ) )
		{
			this.parts[ pindex ] = new Room( pindex, psrc, this, rooms );
		}
	}

	parts : Record < types.index, Room > = {};
}

export class Block extends Node
{
	constructor( index : types.index, src : types.block, rooms : types.Rooms )
	{
		super( index );

		// log( this.path, "街区" );

		for( const [ pindex, psrc ] of ents( src.buildings ) )
		{
			this.parts[ pindex ] = new Building( pindex, psrc, this, rooms );
		}
	}

	parts : Record < types.index, Building > = {};
}

export class Danchi
{
	parts : Record < types.index, Block > = {};

	constructor( src : types.danchi )
	{
		for( const [ pindex, psrc ] of ents( src.blocks ) )
		{
			this.parts[ pindex ] = new Block( pindex, psrc, this.rooms );
		}  
	}

	rooms : types.Rooms = {}
}

