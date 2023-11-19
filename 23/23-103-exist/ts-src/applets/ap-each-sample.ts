import { Leaf, LianV, OrderV, ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const each = ap;

const { div, h2, h3, ul, li, span, button } = ef;

export const EachSample = () =>
{
	const line = eki.lines[ "山手線" ];
	const stations = LianV.create < eki.Station > ( line.stations );

	return div ( { class: "applet" },

		h2( "each() サンプル" ),
		h3( line.name ),
		ul(
			each (
				stations,
				station => li( station.v.name, " ", delbutton( station ) )
			)
		),
	);
}

const delbutton = ( station : OrderV < eki.Station > ) => button
(
	{ acts: { click() { station.remove(); log( station.v.name, station.v.lat, station.v.long ) } } },
	station.v.postal
);
