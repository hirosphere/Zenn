import { dom, ef, Leaf, log } from "../meh/index.js";

const App = () =>
{
	const m = new ms.App ;

	return ef.main
	(
		ef.h1( m.clock.timestr ),
	);
};

namespace ms
{
	export class App
	{
		public readonly clock = new Clock() ;
	}

	class Clock
	{
		public timestr = new Leaf.str( "" );
		protected tid = 0;

		constructor()
		{
			this.update();
		}

		protected update()
		{
			this.timestr.value =
			(
				new Date().toLocaleString()
			);

			this.tid = setTimeout
			(
				() => this.update(),

				1000 -
				(
					new Date() .getTime() % 1000
				)
			);
		}
	}
}

dom.add( App(), "body" );
