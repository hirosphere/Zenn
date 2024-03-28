import { Exist, Leaf, dom, ef, each, root, log } from "../meh/index.js";
import * as models from "./models.js";
import { map as mapsrc } from "./danchi-map.js";
import { Building } from "./ui.building.js";

const vals = Object.values;

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

	return ef.main
	(
		ef.h1( "課題団地" ),
		Map.Danchi( danchi ),
		SearchMonitor( params )
	);
};

namespace Map
{
	export const Danchi = ( model : models.Danchi ) =>
	{
		return ef.section
		(
			ef.h2( "Map" ),
			ef.section
			(
				each( vals( model.parts ), block => Block( block ) )
			)
		);
	};
	
	export const Block = ( model : models.Block ) =>
	{
		return ef.section
		(
			ef.h3( model.index, "街区" ),
			ef.section
			(
				each
				(
					vals( model.parts),
					part => Building( part )
				)
			),
		);
	};

	const Building = ( model : models.Building ) =>
	{
		return ef.section
		(
			ef.h4( model.index, "棟" )
		);
	};
}


const SearchMonitor = ( ps : URLSearchParams ) =>
{
	return ef.article
	(
		{},

		ef.h2( "URL Search" ),

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
