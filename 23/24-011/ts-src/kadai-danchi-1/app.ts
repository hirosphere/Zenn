import * as meh from "../meh/index.js";
import { model, root, Exist, ExistContainer, Leafr, Leaf, Branch } from "../meh/index.js";
import { defs, dom, Nodet, ef, sf } from "../meh/index.js";
const log = console.log;

const existquest = () =>
{
	const ex1 = new Exist( root );
	const ex2 = new Exist( ex1 );
	const refs = new Exist.RefContainer();
	const ref = new Exist.Ref( refs, {} );
	ref.source = ex1;
	ref.source = ex2;
	ref.ref_term();
	ex1.terminate();
};

const leafrefquest = () =>
{
	log( "Ref Quest" );

	const leafr = new Leafr.Boolean( root, false );
	const refs = new Exist.RefContainer();
	const ref = new meh.Leafr.Ref < boolean > ( refs, {} );

	ref.source = new Leafr.Boolean( root, true );
	
	refs.refs_term();
	root.terminate();
};

const { main, article, section, h2, h3, p, button } = ef;

const letterrefquert = () =>
{
	const ex = new Exist( root );

	const nl1 = new Leaf.Number( ex, 0 );
	const sl1 = new Leaf.String( ex, "Abc Def" );

	const applet = article
	(
		h2( "Letter Ref Quest" ),
		section( nl1 ),
		section( sl1 ),
		section
		(
			button( { acts: { click(){ sl1.value = "ZZzzzzz"; nl1.value ++ } } }, "button" ),
		)
	);

	const nodet : Nodet = dom.create( ex, main( applet ), "body", "#literal-main" );
};

const domquest = () =>
{
	const ex = new Exist( root );

	const t : defs.Text = "";
	// const t2 : defs.Text = new Leafr.Boolean( ex, true ).conv( v => v ? "ハロー" : "グッバイ" );
	
	const attrs : defs.Attrs = { x: 1 };
	attrs.x = 0;
	// attrs.zzz = t2;
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

	export const Applet = ( owner : Exist ) : defs.Node =>
	{
		const ex = new Exist( owner );
		const value = new Leaf.Number( ex, 33 );

		return article( { class: "applet", },
			h2( "HSL Applet" ),
			section
			(
				{ class: "_content" },

			)
		);
	}
}

abstract class VMBase < M > extends Exist
{
	protected refs = new Exist.RefContainer();

	public abstract set model( model : M | undefined );
}

namespace Range
{
}

// existquest();
// leafrefquest();
// domquest();
letterrefquert();

export const name = "app";


