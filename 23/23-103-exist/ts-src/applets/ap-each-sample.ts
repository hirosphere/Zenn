import { Leaf, Lian, ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const each = ap;

const { div, h2, h3, ul, li, span, button } = ef;

export const EachSample = () =>
{
	const line = eki.lines[ "山手線" ];

	return div ( { class: "applet" },

		h2( "each() サンプル" ),
		h3( line.name ),
		ul(
			each (
				line.stations,
				station => li( station.name, " ", delbutton( station ) )
			)
		),
	);
}

const delbutton = ( station : eki.Station ) => button
(
	{ acts: { click() { station.remove(); log( station.name, station.lat, station.long ) } } },
	station.postal
);
