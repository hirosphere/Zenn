import { Leaf, LianV, OrderV, ef, each, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;

// Model //

namespace Model
{
	export class App
	{
		lines = [ "埼京線", "山手線", "京浜東北線", "総武線各駅停車", "中央線" ].map( name => eki.lines[ name ] );
		public readonly history = new LianV < eki.Station > ();

		constructor()
		{
			for( let i = 0; i < 109; i ++ ) this.history.addValue( this.randstat() );
		}
	
		evmon = new Leaf.String( "evmon" );
	
		shuffle()
		{
		}

		protected randstat()
		{
			const line = arrnd( this.lines );
			return arrnd( line.stations );
		}
	
	}

	const arrnd = < I = any > ( ar : Array < I > ) => ar[ Math.floor( ar.length * Math.random() ) ];
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
					button({
						acts: {
							click() { app.history.clear() ; },
							dragstart( ev ) { log( ev ) },
						},
						attrs: { draggable: "true" }
					}, "全消去" ), " ",
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
	const stations = LianV.create( line.stations );
	const action = ( station : eki.Station ) => app.history.addValue( station, 0 );

	return span( { class: "line" },
		ef.b( line.name ),
		each( stations,
			o => button( { acts: { click: () => action( o.val ) } }, o.pos.cv( v => 1 + v + "" ), " ", o.val.name )
		)
	);
};

const History = ( mo : Model.App ) =>
{
	return div( { class: "line" },
		table(
			thead( tr( each( [ "", "郵便番号", "駅名", "路線名", "北緯・東経" ], i => td( i ) ) ) ),
			tbody( each( mo.history, o => HistoryRow( o ) ) ) ),
	);
};

const HistoryRow = ( order : OrderV < eki.Station > ) =>
{
	const st : eki.Station = order.v;
	const act = () => order.remove();
	return tr(
		td( order.pos ),
		td( st.postal ),
		td( { style: { minWidth: "5em" } }, st.name ),
		td( { style: { minWidth: "9em" } }, st.line + " " + ( st.pos + 1 ) ),
		td( st.lat, " ", st.long ),
		td( button( { acts: { click: act } }, "消" ) ),
	);
}

const HistoryButton = ( o : OrderV< eki.Station > ) =>
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
