import * as meh from "../meh/index.js";
import { model, root, Exist, Leafr, Leaf, Branch } from "../meh/index.js";
import { defs, dom, Nodet, ef, sf } from "../meh/index.js";
const log = console.log;

const existquest = () =>
{
	const ex1 = new Exist( root );
	const ex2 = new Exist( ex1 );
	const refs = new Exist.Refs();
	const ref = new Exist.Ref( refs );
	ref.source = ex1;
	ref.source = ex2;
	ref.terminate();
	ex1.terminate();
};

const leafrefquest = () =>
{
	log( "Ref Quest" );

	const leafr = new Leafr.Boolean( root, false );
	const refs = new Exist.Refs();
	const ref = leafr.createRef( refs, v => log( v ) );

	ref.source = new Leafr.Boolean( root, true );
	
	refs.terminate();
	root.terminate();
};

const { main, article, section, h2, h3, p, button } = ef;

const domquest = () =>
{
	const ex = new Exist( root );

	const t : defs.Text = "";
	const t2 : defs.Text = new Leafr.Boolean( ex, true ).conv( v => v ? "ハロー" : "グッバイ" );
	
	const attrs : defs.Attrs = { x: 1 };
	attrs.x = 0;
	attrs.zzz = t2;
	attrs;

	const a2 : defs.Attrs = {};
	a2.childNodes

	const acts : meh.defs.Acts = {};


	//

	const applet = article
	(
		{ class: "applet" },

		h2( "DOM-Quest" ),
		section
		(
			{ class: "_content" },

			h3( "ツリー組み立て" ),
			section
			(
				"新橋", " ", "有楽町", " ", button( "TERM" ),
			),
		)
	);
	
	const applets = main( applet, HSL.Applet( ex ) );

	const nodet : Nodet = dom.create( ex, applets, "body", "#literal-main" );
};

namespace HSL
{
	class HSLBranch extends Branch
	{

		public override update() : void
		{
			;
		}
	}

	export const Applet = ( container : Exist ) : defs.Node =>
	{
		const ex = new Exist( container );
		const value = new Leaf.Number( ex, 77 );

		return article( { class: "applet", },
			h2( "HSL Applet" ),
			section
			(
				{ class: "_content" },

				Range.UI( { title: "Range", value } ),
			)
		);
	}
}

namespace Range
{
	export class Model
	{
		public title ? : Leafr.LoL.String ;
		public value ? : Leaf.Number ;
	}

	export const UI = ( model : Model ) =>
	{
		const { div, span, input } = ef;

		const label = span( model.title || "" );
		const range = input
		(
			{
				attrs: { type: "range" },
				props: { value: model.value || 0 },
				acts:
				{
					input( ev )
					{
						if( ! ( ev.target instanceof HTMLInputElement ) ) return;

						// log( ev.target.value );

						model.value?.set( Number( ev.target.value ) );
					}
				}
			},
		);

		const value = span( model.value );

		return div( { class: "range" }, label, range, value, " ", model.value?.conv( v => "" + v / 100 ) );
	}
}

// existquest();
// leafrefquest();
domquest();

export const name = "app";


