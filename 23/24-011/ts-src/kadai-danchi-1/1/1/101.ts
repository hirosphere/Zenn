import { Exist, Leafr, Leaf, Renn, Branch, log, root, dom, ef, each } from "../../../meh/index.js";

namespace models
{
	export class App extends Exist
	{
		public readonly items = new Renn < string > ( this );
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

export default ( roomlabel : string ) =>
{
	const model = new models.App( root );

	return ef.main
	(
		ef.h1( roomlabel + " - Exist !!!" ),
		ef.section
		(
			ef.button( "生成" ),
		),
		ef.section
		(
			each( model.items, order => order )
		)
	);
};
