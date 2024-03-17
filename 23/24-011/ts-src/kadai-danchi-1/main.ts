import { Exist, Leaf, dom, ef, each, root, log } from "../meh/index.js";

const ents = Object.entries;

log( "kadai-danchi-1 main" );

type Page = ( roomindex : string ) => dom.defs.Node;

const App = async () =>
{
	const params = new URLSearchParams( location.search );

	const roomindex = params.get( "room" ) ?? "";
	const room = danchi.rooms[ roomindex ];

	log( "room", roomindex, room );

	if( room )
	{
		try
		{
			const module = await import( room.mod_path );
			const Page = module.default;
			
			log( "dymport", Page );
			
			if( Page ) return Page( room.index );
		}
		catch( err ) { log( err); }

	}

	return DanchiMap( params );
};

const DanchiMap = ( ps : URLSearchParams ) =>
{
	Object.entries( ps ).forEach( e => log( "forEach", e ) );

	return ef.main
	(
		{},

		ef.h1( "課題団地" ),
		ef.h2( "Meh" ),
		ef.p( "HTML Single Page App Framework" ),

		ef.table
		(
			each
			(
				Array.from( ps.entries() ),

				( [ name, value ] ) => ef.tr
				(
					ef.td( name ),
					ef.td( value )
				),
			)
		),


		ef.section
		(
			{ props: {}, attrs: {}, style: { display: "flex", gap: "1ex" } },

			each
			(
				Object.keys( danchi.rooms ).map( path => danchi.rooms[ path ] ),
				room => Link( room )
			)
		),

		ef.section( ef.textarea( { props: { value: "Danchi" } } ) ),
	);
};

const Link = ( room ? : Room ) =>
{
	return ef.a( { attrs: { href: room?.link ?? "" }, style: {} }, room?.index ?? "---" );
};

const unavailable = true;

const danchimapsrc : types.danchi =
{
	"1":
	{
		"1":
		{
			"101": {},
			"102": {},
			"103": {},
			"104": {},
			"105": {},
		},
	},
};

namespace types
{
	export type index = string ;
	export type path = string ;

	export type danchi = Record < index, block > ;
	export type block = Record < index, building > ;
	export type building = Record < index, room >;
	export type room = {};
	export type rooms = Record < path, Room > ;
}

class Node
{
	path : string;

	constructor( public index : types.index, con ? : Node )
	{
		this.path = ( con ? con.path + "-" : "" ) + index;
	}
}

class Room extends Node
{
	constructor( index : types.index, src : types.room, con : Node, rooms : types.rooms )
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

class Building extends Node
{
	constructor( index : types.index, src : types.block, con : Node, rooms : types.rooms )
	{
		super( index, con );

		// log( this.path, "棟" );

		for( const [ pindex, psrc ] of ents( src ) )
		{
			this.parts[ pindex ] = new Room( pindex, psrc, this, rooms );
		}
	}

	parts : Record < types.index, Room > = {};
}

class Block extends Node
{
	constructor( index : types.index, src : types.block, rooms : types.rooms )
	{
		super( index );

		// log( this.path, "街区" );

		for( const [ pindex, psrc ] of ents( src ) )
		{
			this.parts[ pindex ] = new Building( pindex, psrc, this, rooms );
		}
	}

	parts : Record < types.index, Building > = {};
}

class Danchi
{
	parts : Record < types.index, Block > = {};

	constructor( src : types.danchi )
	{
		for( const [ pindex, psrc ] of ents( src ) )
		{
			this.parts[ pindex ] = new Block( pindex, psrc, this.rooms );
		}  
	}

	rooms : types.rooms = {}
}

const danchi = new Danchi( danchimapsrc );

dom.create( root, await App(), "body" );

export const dummy = {};
