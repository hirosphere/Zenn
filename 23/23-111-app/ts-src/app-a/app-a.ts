import { Exist, root, Leaf, Branch, dom, ef, each } from "../meh/index.js";
const log = console.log;

log( "app-a" );

export function createApp( ce : Element )
{
	dom.create( root, GUI.App( new Model.App( root ) ), ce );
}

namespace Model
{
	export class App extends Exist
	{
		title = "App-A";
		contents =
		[
			"Content-1",
			"Content-2",
			"Content-3",
			"Content-4",
			"Content-5",
			"Content-6",
			"Content-7",
			"Content-8",
			"Content-9",
			"Content-10",
		]
	}
}

namespace GUI
{
	const
	{
		body, main, article, section, nav,
		h1, h2, h3, h4, h5,
		div, span, p,
		ul, li, form, input, button, textarea, select, option,
	} = ef;
	
	export function App( model : Model.App )
	{
		return body
		(
			Navi( model ),
			Contents(),
		);
	}
	
	function Navi( model : Model.App )
	{
		return nav
		(
			h2( "App-A" ),
			ul( each( model.contents, item => li( item ) ) ),
		);
	}
	
	function Contents()
	{
		return main
		(
			h1( "Content" ),
		);
	}	
}
