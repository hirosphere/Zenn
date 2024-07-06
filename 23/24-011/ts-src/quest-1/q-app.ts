import { Exist, Leafr, Leaf, Renn, Order, dom, ef, each, root, log } from "../meh/index.js";
import { App as JMA1 } from "./jma-eq-1.js";
import { Oscilla } from "./oscilla.js";
import { TodoApp } from "./todo-east.js";
import { RennA } from "./renn-a.js";

const lf_vs = Leafr.String.values;
const ins =
(
	renn : Renn< Leafr.String >,
	vs : string [],
	pos ? : number
) =>
{
	// renn.insert( lf_vs( renn, vs ), pos )	
}

namespace ums
{
	export class App extends Exist
	{
		title = new Leaf.String( this, "Quest-1" );
		
		leaf1 = new Leaf.String( this, "leaf quest 1" );
		leaf2 = new Leaf.String( this, "leaf quest 2" );
		rennA1 = new RennA.Model( this );
	}

	export class Stations extends Renn < Station >
	{
		public static from_values( com : Stations, values : string [] )
		{
			return values.map( v => new Station( com, v ) )
		}
	}
	
	export class Station extends Exist
	{
		constructor( com : Stations, name : string )
		{
			super( com );
		}
	}

	export class SelectA extends Exist
	{
		;
	}

	export const new_phase =
	(
		count : number,
		fn : ( phase : number ) => HSL
	) : string [] =>
	{
		return new Array( count ).fill( 0 ).map
		(
			( v, i ) => to_css
			(
				fn( i / count )
			)
		);
	};

	// const to_css = ( c : HSL ) : string => `hsl( ${ c.hue }, ${ c.sat * 100 }%, ${ c.light * 100 }% )`;
	const to_css = ( c : HSL ) : string =>
	{
		const rt = `hsl( ${ c.hue }, ${ c.sat * 100 }%, ${ c.light * 100 }% )`;

		return rt;
	};

	export type HSL = { hue : number; sat : number; light: number; };
}

namespace ui
{
	export const App = ( um : ums.App ) =>
	{
		return ef.main
		(
			ef.h1( { class: "top" }, um.title ),
			ef.section
			(
				{ class: "articles" },
				Hue( 6 ),
				TodoApp(),
				Oscilla(),
				RennA( um.rennA1 ),
				Hue( 7 ),
				JMA1(), ".....",
				Hue( 8 ),
				AppEdit( um ),
				Hue( 9 ),
				LeafA( um.leaf1 ),
				LeafA( um.leaf2 ),
				LeafA( um.leaf2 ),
			),
		);
	};

	const AppEdit = ( um : ums.App ) =>
	{
		return ef.article
		(
			ef.h1( "App Edit" ),
			ef.section
			(
				ef.input( { props: { value: um.title } } )
			),
		);
	};

	const Hue = ( count : number ) =>
	{
		const colors = ums.new_phase
		(
			count,
			( ph ) => ( { hue: 330 + ph * 300, sat: 0.7, light: 0.65 } )
		);

		return ef.article
		(
			ef.h1( "Hue" ),
			ef.section
			(
				{ style: { display: "flex", justifyContent: "center", background: "white" } },
				... colors.map( i => HueItem( i ) ),
			),
		);
	};

	const HueItem = ( color : string ) =>
	{
		return ef.div
		(
			{
				style:
				{
					display: "flex",
					background: color,
					height: "20px",
					padding: "1ex",
					color: "hsl( 340, 5%, 40% )",
				}
			},
			"●●...●●",
		);
	};

	const LeafA = ( um : Leaf.String ) =>
	{
		const input = ( ev : Event ) =>
		{
			if( ev.target instanceof HTMLInputElement )
			{
				um.set( ev.target.value );
			}
		};

		return ef.article
		(
			{ exist: um },

			ef.h1( "Leaf A" ),
			ef.section( ef.p( um ) ),
			ef.section
			(
				ef.h1( "input" ),
				ef.input( { acts: { input }, props: { value: um } } ),
				ef.button( { acts: { click() { um.terminate() } } }, "×" ),
				ef.button( { acts: { click() { root.terminate() } } }, "× all" ),
				ef.select
				(
					{ props: { selectedIndex: 2 } },
					... [ "さくら", "みずほ", "はやぶさ", "富士", "あさかぜ" ].map( v => ef.option( v ) ),
				),
			),
		);
	}
}

dom.create( root, ui.App( new ums.App( root ) ), document.body );
