import { Exist, navi, dom, ef, root, log } from "../meh/index.js";

const browser = new navi.Browser( root );

namespace models
{
	export class App extends Exist
	{
		root = new navi.Index( this, browser, { title: "06-16 Audio" } );

		constructor()
		{
			super( root );

			browser.index.value = this.root;
		}
	}
}

namespace ui
{
	export const App = () : dom.defs.Node =>
	{
		const model = new models.App();

		return ef.main
		(
			ef.h1( "24-06-16 Audio" ),
			ef.p( "オーディオコンポーネント開発" ),
		);
	};
}

export const main = () : void =>
{
	dom.create( root, ui.App(), document.body );
};

main();
