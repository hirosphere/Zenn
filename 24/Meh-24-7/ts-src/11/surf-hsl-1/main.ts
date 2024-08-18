const a = 1;

import { dom, ef, root, log } from "../../meh/index.js";


const App = () =>
{
	return ef.body
	(
		ef.main
		(
			{
				style: { height: "100vh" },
				acts: { mousedown( ev ) { current_change(); ev.preventDefault(); } }
			},
			ef.h1( { style: { color: "hsl( 0, 0%, 100% )" } }, "Surf-HSL-1" ),
			ef.p( "色を与えよ。" ),
		),
	);
};

const html = document.documentElement;

type colors_t = { current : number, list : string [] };

let colors : colors_t;

const current_change = () =>
{
	if( ! colors ) return;

	if( ++ colors.current >= colors.list.length ) colors.current = 0;

	html.style.background = colors.list[ colors.current ];
}

const bg_reload = async () =>
{
	const res = await fetch( "./data/surf-hsl-1-color.json" );

	if( res.ok )
	{
		colors = ( await res.json() ) as colors_t;

		html.style.background = colors.list[ colors.current ];

		// console.log( current, list[ current ] );
	}

};

// setInterval( bg_update, 3 * 1000 );
bg_reload();

const fetch_data = async () =>
{
	const res = await fetch( "./colo" );
};

// html.style.background = "linear-gradient( 0deg, hsl( 215, 75%, 28% ) 50%, hsl( 42, 45%, 90% ) 50% )";
//html.style.background = "linear-gradient( 90deg, hsl( 95, 75%, 16% ) 50%, hsl( 28, 97%, 53% ) 50% )";

// setTimeout( () => location.reload(), 6 * 1000 );

bg_reload();

dom.create( root, App(), "html" );
