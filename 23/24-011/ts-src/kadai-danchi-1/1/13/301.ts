import { Leaf, dom, ef } from "../../../meh/index.js";
import { create_page, PageA, navi } from "../../um/index.js";

const create_model = ( room : navi.Room ) =>
{
	const model =
	{
		json: new Leaf.String( room, "JSON" ),
		list: new Leaf.String( room, "リスト" ),

		load: async () =>
		{
			model.clear();

			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status == 200 )
			{
				const data = await res.json();

				const list = data.map( ( i : any, n : number ) =>
				[
					String( n + 1 ),
					i.at.slice( 0, 19 ).replace( "T", " " ),
					i.anm,
					i.mag,
					i.maxi,
					i.cod
				]
				.join( "\t" ) ).join( "\n" );
				
				model.list.value = list;
				model.json.value = JSON.stringify( data, null, "   " );
			}
		},

		clear: () =>
		{
			model.json.value = "";
			model.list.value = "";
		},

		clear_json: () => model.json.value = "",
	}

	model.load();

	return model;
}

namespace ui
{
	export const Content = ( room : navi.Room ) : dom.defs.Node =>
	{
		const model = create_model( room );
	
		return ef.section
		(
			{ class: "v-flex" },
			ef.section
			(
				ef.button( { acts: { click: model.load } }, "Load" ),
				ef.button( { acts: { click: model.clear } }, "Clear" ),
				ef.button( { acts: { click: model.clear_json } }, "Clear JSON" ),
			),
			ef.section
			(
				{ class: "v-flex" },
				ta( model.list ),
				ta( model.json ),
				ef.p(  ),
			),
		)
	}

	const Item = () =>
	{
		;
	};
	
	const ta = ( model : Leaf.String ) => ef.textarea
	({
		style:
		{
			height: "250px",
		},
		props: { value: model },
	});	
}

export const Page : create_page = ( room ) => PageA
({
	index: room,
	content: ui.Content( room )
});
