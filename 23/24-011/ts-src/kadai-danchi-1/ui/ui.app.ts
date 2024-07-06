import { Exist, Leaf, dom, ef, each, root, log } from "../../meh/index.js";
import * as models from "../um/index.js";
import { PageA } from "../um/um.page.js";

const vals = Object.values;

export const App = async ( model : models.App ) =>
{
	// models.navi.browser.index.value = null;

	return ef.div
	(
		{ class: "root-bg" },
		ef.div
		(
			{ class: "root" },
		),
	);
};

async ( index : models.navi.Index ) =>
{
	if( index instanceof models.navi.Room )
	{
		try
		{
			const module = await import( index.mod_path );
			const { Page } = module;
			
			log( "dymport", Page );
			
			if( Page )
			{
				return Page( index );
			};
		}
		catch( err )
		{
			log( err );
			return ui.page.Default( index );
		}

	}

	return ef.main
	(
		ef.h1( "課題団地" ),
		// ui.navi.Danchi( index ),
		// SearchMonitor( params )
	);

};


namespace ui.page
{
	export const Default = ( room : models.navi.Room ) =>
	{
		return PageA
		({
			index: room,
			content: ef.section
			(
				ef.p( "入居の準備中です" ),
			)
		});
	};
}

namespace ui.navi
{
	export const Danchi = ( model : models.navi.Danchi ) =>
	{
		return ef.section
		(
			{ class: "danchi-map" },

			ef.section
			(
				... vals( model.parts ).map( block => Block( block ) )
			)
		);
	};
	
	export const Block = ( model : models.navi.Block ) =>
	{
		return ef.section
		(
			ef.h2( model.index, "街区" ),
			ef.section(
				{ class: "buildings" },
				... vals( model.parts ).map( part => Building( part ) )
			),
		);
	};

	const Building = ( model : models.navi.Building ) =>
	{
		return ef.section
		(
			{ class: "building" },
			ef.h3( model.path ),
			ef.section
			(
				{ class: "rooms" },
				... vals( model.parts ).map( part => Room( part ) )
			)
		);
	};

	const Room = ( model : models.navi.Room ) =>
	{
		return ef.a
		(
			{
				class: [ "room", { available: model.available } ],
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
			... Array.from( ps.entries() ).map
			(
				( [ name, value ] ) => ef.tr
				(
					ef.td( name ),
					ef.td( value )
				),
			),
		),

		ef.section
		(
			{ props: {}, attrs: {}, style: { display: "flex", gap: "1ex",  } },
		),

		ef.section( ef.textarea( { props: { value: "Danchi" } } ) ),
	);
};
