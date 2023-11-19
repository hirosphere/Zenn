import { ef, sf, each, Leaf, Lian, Order } from "../meh/index.js";
import { Range } from "../gui/range.js";
const log = console.log;


//  //

export const SVG1App = () =>
{
	const app = new models.App();

	const svg = sf.svg({
			attrs: { width: 400, height: 100, viewBox: "-200 -50 400 100" },
			style: { width: "100%", border: "3px solid hsl( 45, 4%, 94% )" },
		},
		Colors( app.phase ),
	);

	return ef.article( { class: "applet" },
		ef.h2( "Color-1" ),
		ef.div( { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
			svg,
			Control( app.phase ),
		),
	);
};

const Control = ( mo : models.Phase ) =>
{
	return ef.section(
		Range.UI( { title: "Arc", value: mo.arc, max: 72, step: 1 } ),
		Range.UI( { title: "Start", value: mo.start, max: 360, step: 5 } ),
		Range.UI( { title: "Span", value: mo.span, max: 360, step: 5 } ),
	);
};

const Colors = ( mo : models.Phase ) =>
{
	return sf.g( each( mo.shapes, shape => Circle( shape ) ) );
};

const Circle = ( model : models.Shape ) =>
{
	log( "Circle", model.color.css.val, model.posit.x.val )
	return sf.circle( {
			attrs: { fill: model.color.css, cx: model.posit.x, cy: model.posit.y, r: 20 },
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
	export class App
	{
		public readonly phase = new Phase();
	}

	export class Phase
	{
		public readonly arc = new Leaf.Number( 6, { rel: () => this.update() } );
		public readonly start = new Leaf.Number( 120, { rel: () => this.update() } );
		public readonly span = new Leaf.Number( 60, { rel: () => this.update() } );

		public readonly shapes = new Lian < Shape > ();

		constructor()
		{
			this.update();
		}

		update()
		{
			const nodect = this.arc.val + 1;
			const diffct = nodect - this.shapes.length;
			if( diffct > 0 ) this.shapes.insert( () => new Shape(), diffct );
			else this.shapes.removeOrders( nodect, - diffct );


			log( "diffct", diffct, this.shapes.length );

			for( let i = 0; i <= this.arc.val; i ++ )
			{
				const arc = this.arc.v;
				const pos = arc ? ( 400 * i / arc ) - 200 : 0;
				const hue = this.start.v + this.span.v * ( arc ? i / arc : 0 );
				
				log( i, hue );
				const shape = this.shapes[ i ];
				shape.color.h.v = hue;
				shape.posit.x.v = pos;
			}
		}
	}

	export class Shape extends Order
	{
		public readonly color;
		public readonly posit;

		constructor( value ? : shape_t )
		{
			super();

			this.color = new HSL( value?.color );
			this.posit = new Pos( value?.pos );
		}
	}

	export class HSL
	{
		h ; s ; l ;
		css ;
	
		constructor( value : hsl_t = { h: 210, s: 0.65, l: 0.65 } )
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
		constructor( value ? : pos_t )
		{
			this.x = new Leaf.Number( value?.x ?? 0 );
			this.y = new Leaf.Number( value?.y ?? 0 );
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
