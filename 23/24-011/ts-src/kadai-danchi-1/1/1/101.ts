import { Exist, Leafr, Leaf, Renn, Branch, root, dom, ef, each, log } from "../../../meh/index.js";
import { create_page, PageA, navi } from "../../um/index.js";

namespace models
{
	export class App extends Exist
	{
		public readonly items = new Renn < Leaf.String > ( this );
	}

}

namespace gui
{
	export const ExistView = ( model : Exist ) : dom.defs.Node =>
	{
		return ef.article
		(
			{  },

			model.runiq
		);
	};
}

( roomlabel : string ) =>
{
	const model = new models.App( root );

	return ef.main
	(
		ef.h1( "Exist" ),
		ef.section
		(
			ef.button( "生成" ),
			ef.button( "消去" ),
		),
		ef.section
		(
			each( model.items, order => order )
		)
	);
};

const Content = ( room : navi.Room ) : dom.defs.Node =>
{
	return ef.section
	(
		ef.button( "生成" )
	)
}

export const Page : create_page = ( room ) => PageA( { index: room, content: Content( room ) } );
