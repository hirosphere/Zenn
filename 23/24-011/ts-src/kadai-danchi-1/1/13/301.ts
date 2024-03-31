import { Leaf, dom, ef } from "../../../meh/index.js";
import { create_page, PageA, navi } from "../../models/index.js";

const create_model = ( room : navi.Room ) =>
{
	const model =
	{
		json: new Leaf.String( room, "JSON" ),
		list: new Leaf.String( room, "リスト" ),

		load: async () =>
		{
			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status == 200 )
			{
				const data = await res.json();

				const ex = data.map( ( i : any, n : number ) =>
				[
					String( n + 1 ),
					i.at.slice( 0, 19 ).replace( "T", " " ),
					i.anm,
					i.mag,
					i.maxi
				]
				.join( "\t" ) ).join( "\n" );
				
				model.list.value = ex;
				model.json.value = JSON.stringify( data, null, "   " );
			}
		},

		clear_json: () => model.json.value = "",
	}

	return model;
}

const Content = ( room : navi.Room ) : dom.defs.Node =>
{
	const model = create_model( room );

	return ef.section
	(
		{ class: "" },
		ef.section
		(
			ef.button( { acts: { click: model.load } }, "Load" ),
			ef.button( { acts: { click: model.clear_json } }, "CJ" ),
		),
		ef.section
		(
			{ class: "sec-3" },
			ta( model.list ),
			ta( model.json ),
		)
	)
}

const ta = ( model : Leaf.String ) => ef.textarea
({
	style:
	{
		height: "250px",
	},
	props: { value: model },
});

export const Page : create_page = ( room ) => PageA( room, Content( room ) );
