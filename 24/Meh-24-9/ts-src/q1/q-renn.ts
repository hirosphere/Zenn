import { Leaf, leaf, Renn, Order, ef, each, dom, navi, log } from "../meh/index.js";

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
				{ class : "lines", style: { gap : "0.8em" } },
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
			ef.section
			(
				{ class : "fl-bar" },

				bu ( "xx", () => m.station_list.clear () ) ,
				ins( m, [ [ "京成上野", "けいせいうえの", "Keisei-ueno" ] ] , 0 ),
				ins( m, [ [ "西武秩父", "せいぶちちぶ", "Seibu-chichibu" ] ] ),
			),
			ef.section
			(
				{ class : "fl-bar" },
				ef.span( m.station_list.length ),
			),
			ef.ul
			(
				ef.hr(),
				each
				(
					m.station_list,
					o => Station( o ),
				),
				ef.hr(),
			),
		);
	};

	const bu = ( label : string , click : ( ev : MouseEvent ) => void ) => ef.button
	(
		{ acts : { click } } ,
		label
	);

	const ins = ( m : models.Line, v : models.Station.value [], pos ? : Order.pos ) =>
	{
		const click = () =>
		{
			m.station_list.new
			(
				v.map( v => new models.Station( v ) ),
				pos
			);
		}

		return ef.button
		(
			{ acts : { click } },
			"+"
		)
	}

	const Station = ( o : Order < models.Station > ) =>
	{
		const m = o.src ;

		return ef.li
		(
			{ class : "station" },

			ef.span( o.count ),
			ef.span( m.kanji ),
			ef.span( m.hira ),
			ef.span
			(
				{
					acts : { click () { o.remove () ; } } ,
				} ,
				"**"
			),
		);
	};
}

export namespace models
{
	export class App
	{
		public readonly  browser = new navi.Browser();
		public readonly  si = new Line( data.si );
		public readonly num = leaf ( 5 );
		public readonly str = leaf ( "八日市場" );
		public readonly bool = leaf ( true );

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
			this.name = leaf ( v.name );
			this.station_list = new Renn < Station >
			(
				v.station_list.map( v => new Station( v ) )
			);
		}


		public insert()
		{
			this.station_list.new
			(
				[ new Station ( [ "西武秩父", "せいぶちちぶ", "Seibu-chichibu" ] ) ]
			);
		}
	}

	export namespace Line
	{
		export type value =
		{
			name : string ;
			station_list : Station.value [] ;
		};
	}

	export class Station
	{
		public readonly kanji;
		public readonly hira;
		public readonly roma;

		constructor( public v : Station.value )
		{
			this.kanji = v[ 0 ] ?? "" ;
			this.hira = v[ 1 ] ?? "" ;
			this.roma = v[ 2 ] ?? "" ;
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
