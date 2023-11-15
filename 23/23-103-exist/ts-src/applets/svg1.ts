import { ef, sf, each, Leaf } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;


//  //

export const SVG1App = () =>
{
	const svg = sf.svg( { attrs: { width: 400, height: 100, viewBox: "0 0 400 100" },
			style: { width: "100%" },
		},
		Colors(),
	);

	const c = Circle( { color: { h: 240, s: 0.7, l: 0.6 }, pos: { x: 200, y: 70 } } );

	return ef.article( { class: "applet" },
		ef.h2( "Color-1" ),
		ef.div( { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
			svg,
		),
	);
}


const Colors = () =>
{
	const c = sf.circle( { attrs: { fill: "hsl( 95, 70%, 70% )", cx: 70, cy: 70, r: 5 } } );
	const d = Circle( { color: { h: 240, s: 0.7, l: 0.6 }, pos: { x: 200, y: 70 } } );

	const shapes = loop( 6, i =>
		({
			color: { h: 120 + i * 30, s: 0.7, l: 0.7 },
			pos: { x: 50 + i * 60, y: 50 }
		})
	);

	return sf.g( each( shapes, shape => Circle( shape ) ) );
};

const Circle = ( value : models.shape_t ) =>
{
	const model = new models.Shape( value );
	log( "Circle", model.color.css.val )
	return sf.circle( {
			attrs: { fill: model.color.css, cx: model.pos.x, cy: model.pos.y, r: 20 },
			acts: { click() { log( model.color.css.val ) } }
		},
	);
}

const Item = () =>
{
	;
}

//  //

function loop < T > ( count : number, createItem : ( index : number ) => T ) : T[]
{
	const rt = new Array < T >;
	for( let i = 0; i < count; i ++ )  rt.push( createItem( i ) );
	return rt;
}

namespace models
{
	export class Shape
	{
		public readonly color;
		public readonly pos;

		constructor( value : shape_t )
		{
			this.color = new HSL( value.color );
			this.pos = new Pos( value.pos );
		}
	}

	export class HSL
	{
		h ; s ; l ;
		css ;
	
		constructor( value : hsl_t )
		{
			const rel = () => this.update();
			this.h = new Leaf.Number( value.h, { rel } );
			this.s = new Leaf.Number( value.s, { rel } );
			this.l = new Leaf.Number( value.l, { rel } );

			this.css = new Leaf.String( "" );
			this.update();
		}

		protected update()
		{
			this.css.v = `hsl( ${ this.h.val }, ${ this.s.val * 100 }%, ${ this.l.val * 100 }%`;
		}
	}

	export class Pos
	{
		x; y;
		constructor( value : pos_t )
		{
			this.x = new Leaf.Number( value.x );
			this.y = new Leaf.Number( value.y );
		}
	}

	export type shape_t = { color : hsl_t, pos : pos_t };
	export type hsl_t = { h : number ; s : number ; l : number ; };
	export type pos_t = { x : number; y : number };
}

//  //

namespace Quest
{
	type HSL = { hue: number ; sat : number ; lig : number ; };

	type x = { readonly x : string ; };

	const createBranchClass =  < T > ( srcproto : T ) =>
	{
		const newproto : any = {};
		return newproto;
	}


	type HSLBranch = typeof createBranchClass < HSL > ;
}
