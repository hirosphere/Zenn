import { Leaf, Renn, ef, each, dom, navi, log } from "../meh/index.js";

export namespace view
{
	export const RennApp = () =>
	{
		const m = new models.App ;

		return ef.article
		(
			{ class: "flex-col" },
			ef.h2( "Renn" ),
			ef.section
			(
				{ class : "lines" },
				Line( m.si ),
				Line( m.si ),
				Line( m.si ),
			),
		);
	};

	const Line = ( m : models.Line ) =>
	{
		return ef.section
		(
			{ class: "flex-col line" },
			ef.h3( m.name ),
			ef.ul
			(
				... m.station_list.items.map ( i => Station( i ) )
			),
		);
	};

	const Station = ( m : models.Station ) =>
	{
		return ef.li
		(
			m.kanji, " ",
			m.hira
		);
	};
}

export namespace models
{
	export class App
	{
		public readonly  browser = new navi.Browser();
		public readonly  si = new Line( data.si );

		constructor()
		{
			const root = new navi.Index( { title: "Renn", name: "" } );
			this.browser.set_current( root );
		}
	}

	export class Line
	{
		public readonly name;
		public readonly station_list;

		constructor( v : Line.value )
		{
			this.name = new Leaf.str( v.name );
			this.station_list = new Renn < Station >
			(
				v.station_list.map( v => new Station( v ) )
			);
		}
	}

	export namespace Line
	{
		export type value =
		{
			name : string ;
			station_list : Station.value []
		};
	}

	export class Station
	{
		public readonly kanji;
		public readonly hira;
		public readonly roma;

		constructor( public v : Station.value )
		{
			this.kanji = v[ 0 ];
			this.hira = v[ 1 ];
			this.roma = v[ 2 ];
		}
	}

	export namespace Station
	{
		export type value = string [] ;
	}
}

export namespace data
{
	export const si : models.Line.value =
	{
		name : "西武池袋線",
		station_list :
		[
			[ "池袋", "いけぶくろ", "Ikebukuro" ],
			[ "練馬", "ねりま", "Nerima" ],
			[ "石神井公園", "しゃくじいこうえん", "Shakujii-koen" ],
			[ "所沢", "ところざわ", "Tokorozawa" ],
			[ "小手指", "こてさし", "Kotesashi" ],
			[ "入間市", "いるまし", "Irumashi" ],
			[ "飯能", "はんのう", "Hanno" ],
		],
	};
}

dom.add( view.RennApp(), "main" );
