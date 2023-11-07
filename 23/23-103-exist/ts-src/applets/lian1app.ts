import { Leaf, Lian, ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const lp = ap;

// Model //

const lines = eki.lines;

namespace Model
{
	export class App
	{
		lines = [ "埼京線", "京浜東北線", "総武線各駅停車", "中央線" ].map( name => new eki.Line( name ) );
		public readonly history = new Lian < eki.Station > ();
	
		evmon = new Leaf.String( "evmon" );
	
		shuffle()
		{
		}
	}
}



const arrnd = ( ar : Array < any > ) => Math.floor( Math.random() * ar.length );

// UI //

const { div, h2, h3, span, button, b } = ef;

export const Lian1Applet = ( app : Model.App = new Model.App ) =>
{
	const lp = ap;

	document.addEventListener( "mouseup", () => app.evmon.set( "mouseup" ) )

	return div( { class: "applet lian-1" },

		h2( "Lian-1 Applet" ),

		div ( { class: "applet-body " },
			div( { class: "cols-3", actActs: { dblclick( ev ) { app.evmon.set( "dblclk" ) } } },
				div( { class: "stations" },
					ap( app.lines, line => Line( app, line ) ),
				),
			),

			div( app.evmon ),

			div( { class: "cols-3" },
				h3( "椅子取 history" ),
				div( { acts: { click() { app.history.clear() ; } } }, button( "全消去" ) ),
				div( { class: "stations" },
					History( app ),
				),
			),
		),
	);
};

const Line = ( app : Model.App, line : eki.Line ) =>
{
	const action = ( station : eki.Station ) => app.history.add( station, 0 )

	return span( { class: "line" },
		b( line.name ),
		lp < eki.Station > ( line.stations,
			item => button( { acts: { mouseover: () => action( item ) } }, item.name )
		)
	);
};

const History = ( mo : Model.App ) =>
{
	return span( { class: "line" },
		lp( mo.history, 
			item => {
				const act = () => mo.history.remove( item );
				return button( { acts: { mouseleave: act } },
					item.name,
				)
			},
		),
	);
};

export const Lian1 = { UI: Lian1Applet };
