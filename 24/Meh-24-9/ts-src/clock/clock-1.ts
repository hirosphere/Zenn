import { dom, ef, Leaf, log } from "../meh/index.js";

const App = () =>
{
	const m = new ms.App ;

	return ef.main
	(
		{
			style :
			{
				"backgroundColor" : m.tones.background,
				"color" : "white",
			}
		},

		ef.h1( m.clock.timestr ),

		ef.p( { class : [ {}, "" ] },  ),
	);
};

namespace ms
{
	export class App
	{
		public readonly clock = new Clock() ;
		public readonly tones = new Tones() ;
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

	export class Tones
	{
		public readonly background = new Leaf.str( "hsl" );

		constructor()
		{
			this.update() ;
		}

		protected update()
		{
			const bg = `hsl( 345, 45%, 45% )`;

			this.background.value = bg ;
		}
	}

	export class HSL
	{
		public readonly hue ;
		public readonly sat ;
		public readonly light ;

		constructor( v : HSL.value )
		{
			this.hue = new Leaf.num( v.hue );
			this.sat = new Leaf.num( v.sat );
			this.light = new Leaf.num( v.light );
		}
	}

	export namespace HSL
	{
		export type value =
		{
			hue : number ;
			sat : number ;
			light : number ;
		};
	}
}

dom.add( App(), "body" );
