import { Exist, Leaf, dom, ef, each, root, log } from "../meh/index.js";
import * as models from "./models.js";
import { map as mapsrc } from "./danchi-map.js";

log( "kadai-danchi-1 main" );

const App = async () =>
{
	const params = new URLSearchParams( location.search );

	const danchi = new models.Danchi( mapsrc );

	const roompath = params.get( "room" ) ?? "";
	const room = danchi.rooms[ roompath ];

	log( "room", roompath, room );

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
	return ef.main
	(
		{},

		ef.h1( "課題団地" ),

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
			{ props: {}, attrs: {}, style: { display: "flex", gap: "1ex",  } },

			// each( vals( danchi.rooms ), room => Link( room ) ),
		),

		ef.section( ef.textarea( { props: { value: "Danchi" } } ) ),
	);
};

const Link = ( room ? : models.Room ) =>
{
	return ef.a
	(
		{ attrs: { href: room?.link ?? "" }, style: {} }, room?.index ?? "---"
	);
};

dom.create( root, await App(), "body" );

export const dummy = {};
