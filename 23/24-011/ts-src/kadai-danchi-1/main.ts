import { Exist, Leaf, dom, ef, each, root, log } from "../meh/index.js";

const ents = Object.entries;

log( "kadai-danchi-1 main" );

type Page = ( label : string ) => dom.defs.Node;

const App = async () =>
{
	const params = new URLSearchParams( location.search );

	const roomlabel = params.get( "page" ) ?? "";
	const room = danchimap.get( roomlabel );

	log( "room", roomlabel, room );

	if( room )
	{
		const module = await import( room.url );
		const Page = module.default;
		log( "dymport", Page );
		if( Page ) return Page( room.label );
	}

	return DanchiMap( params );
};

const DanchiMap = ( ps : URLSearchParams ) =>
{
	// const ps = new URLSearchParams( "?a=111&b=2222" );

	log( ps, ps.entries() );

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

		ef.section( ef.textarea( { props: { value: "Danchi" } } ) ),
	);
};

const unavailable = true;

const danchimapsrc =
{
	"1":
	{
		"1":
		{
			"101": {},
		},
	},
};

type room = { label: string, url: string };

class Building // 棟
{
	rooms : Record < string, room > = {};
}

class Block // 街区
{
	buildings : Record< string, Building > = {};
}

const danchimap = new class
{
	constructor()
	{
		for( const [ block_i, block_src ] of ents( danchimapsrc ) )
		{
			const label = block_i;
			
			log( "街区", label );

			const block = new Block();
			this.blocks[ block_i ] = block;

			for( const [ building_i, buil_src ] of ents( block_src ) )
			{
				const label = [ block_i, building_i ].join( "-" );
				
				log( "団地棟", label );

				const building = new Building();

				for( const [ room_i, room_src ] of ents( buil_src ) )
				{
					const path = [ block_i, building_i, room_i ];

					const label = path.join( "-" );
					const room = { label, url: `./${ path.join( "/" ) }.js` };
					
					building.rooms[ room_i ] = room;
					
					this.rooms[ label ] = room;

					log( "団地部屋", label, room.url );

				}
			}
		}
	}

	blocks : Record < string, Block > = {};
	rooms : Record < string, room > = {};

	get( index : string ) : room | undefined { return this.rooms[ index ] }
};

dom.create( root, await App(), "body" );

export const dummy = {};
