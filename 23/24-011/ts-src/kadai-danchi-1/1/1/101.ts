import { Exist, Leafr, Leaf, Renn, Branch, dom, log, root, ef } from "../../../meh/index.js";

namespace models
{
	export class App extends Exist
	{
		create() : Exist
		{
			return new Exist( this );
		}
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
			
		)
	);
};
