import { Exist, Leaf, navi, dom, ef, each, root, log } from "../meh/index.js";
import * as models from "./models/navi.js";
import { PageA } from "./models/page.js";
import mapsrc from "./map/danchi.js";
import { Building } from "./ui.building.js";

const vals = Object.values;

class App extends Exist
{
	set_index()
	{
		;
	}

	async make() : Promise< dom.defs.Node >
	{
		const params = new URLSearchParams( location.search );
	
		const danchi = new models.Danchi( root, mapsrc );
	
		const roompath = params.get( "room" ) ?? "";
		const room = danchi.rooms[ roompath ];
	
		log( "room", roompath, room?.title.v );
	
		if( room )
		{
			try
			{
				const module = await import( room.mod_path );
				const { Page } = module;
				
				log( "dymport", Page );
				
				if( Page )
				{
					return Page( room );
				};
			}
			catch( err )
			{
				log( err );
				return ui.page.Deafault( room );
			}
	
		}
	
		return ef.main
		(
			ef.h1( "課題団地" ),
			ui.map.Danchi( danchi ),
			SearchMonitor( params )
		);
	};
	
}



namespace ui.page
{
	export const Deafault = ( room : models.Room ) =>
	{
		return PageA
		(
			room,
			ef.section
			(
				ef.p( "入居の準備中です" ),
			)
		);
	};
}

namespace ui.map
{
	export const Danchi = ( model : models.Danchi ) =>
	{
		return ef.section
		(
			{ class: "danchi-map" },

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
			ef.h2( model.index, "街区" ),
			ef.section(
				{ class: "buildings" },
				each(
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
			{ class: "building" },
			ef.h3( model.path ),
			ef.section
			(
				{ class: "rooms" },
				each ( vals( model.parts ), part => Room( part ) )
			)
		);
	};

	const Room = ( model : models.Room ) =>
	{
		return ef.a
		(
			{
				class: "room",
				attrs: { href: model.link }
			},
			model.index,
			ef.span( model.title ),
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
		),

		ef.section( ef.textarea( { props: { value: "Danchi" } } ) ),
	);
};

dom.create( root, await new App( root ).make(), "body" );

export const dummy = {};
