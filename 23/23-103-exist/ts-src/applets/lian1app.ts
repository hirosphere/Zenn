import { Leaf, Lian, Order, ef, each, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;

// Model //

namespace Model
{
	export class App
	{
		lines = [ "埼京線", "山手線", "京浜東北線", "総武線各駅停車", "中央線" ].map( name => eki.lines[ name ] );
		public readonly history = new Lian < eki.Station > ();
	
		evmon = new Leaf.String( "evmon" );
	
		shuffle()
		{
		}
	}
}



const arrnd = ( ar : Array < any > ) => Math.floor( Math.random() * ar.length );

// UI //

const { div, h2, h3, span, button, b, table, thead, tbody, tr, td, br, p } = ef;

export const Lian1Applet = ( app : Model.App = new Model.App ) =>
{
	document.addEventListener( "mouseup", () => app.evmon.set( "mouseup" ) )

	return div( { class: "applet lian-1" },

		h2( "Lian-1 Applet" ),

		div ( { class: "applet-body " },
			div( { class: "cols-3", actActs: { dblclick( ev ) { app.evmon.set( "dblclk" ) } } },
				div( { class: "stations" },
					each( app.lines, line => Line( app, line ) ),
				),
			),

			div( app.evmon ),

			div( { class: "cols-3" },
				h3( "椅子取 history" ),
				div(
					button( { acts: { click() { app.history.clear() ; } } }, "全消去" ), " ",
					span( app.history.vlength, "駅" )),
				div( { class: "stations" },
					History( app ),
				),
			),
		),
	);
};

const Line = ( app : Model.App, line : eki.Line ) =>
{
	const stations = Lian.create( line.stations );
	const action = ( station : eki.Station ) => app.history.add( station, 0 );

	return span( { class: "line" },
		b( line.name ),
		each( stations,
			o => button( { acts: { mouseover: () => action( o.val ) } }, o.pos.cv( v => 1 + v + "" ), " ", o.val.name )
		)
	);
};

const History = ( mo : Model.App ) =>
{
	return div( { class: "line" },
		table( tbody( each( mo.history, o => HistoryRow( o ) ) ) ),
	);
};

const HistoryRow = ( o : Order < eki.Station > ) =>
{
	const st : eki.Station = o.v;
	return tr(
		td( o.pos ),
		td( st.postal ),
		td( st.name ),
		td( st.line, "-", st.pos + 1 ),
		td( st.lat ),
		td( st.long ),
		td( button( { acts: { mouseout: () => o.remove() } }, "R" ) )
	);
}

const HistoryButton = ( o : Order< eki.Station > ) =>
{
	const act = () => o.remove();

	return button( { acts: { mouseleave: act } },
		o.pos, " ",
		span( { style: { color: "red" } },
			o.val.line, " ",
			o.val.pos + 1, " ",
			o.val.name
		),
	);
}

export const Lian1 = { UI: Lian1Applet };
