import { dom, Leaf, ef, log } from "../meh/index.js";

export const main = () =>
{
	const body = document.body;
	const v1 = new Leaf < string > ( "Aaa Oooo" );
	const cl =
	{
		selected: new Leaf.bool ( false ),
		green: new Leaf.bool ( false ),
	};

	const text = new dom.Nodet( { text: v1 } );
	
	const sec1 = new dom.Nodet
	(
		{
			ns: "",
			type: "section",
			class: cl,
			parts:
			[
				text,
			]
		}
	);

	const sec2 = new dom.Nodet
	(
		{
			ns: "",
			type: "section",
			class: "gapp",
			parts:
			[
				"nodeValue : ",
				v_button( "nv-1", v1, "秋葉原 あきはばら" ),
				v_button( "nv-2", v1, "御徒町 おかちまち" ),
				v_button( "nv-3", v1, "上野 うえの" ),
				" ",
				s_button_2( "tg-1", cl.selected ),
				s_button_2( "tg-2", cl.green ),
				s_button_2( "tg-1", cl.selected ),
			]
		}
	);


	dom.add( sec1, "#sec-1" );
	dom.add( sec2, "#sec-1" );
};

namespace models
{
	export class App1
	{
		text = new Leaf.str( "秋の虫の音" );

		clist =
		{
			selected: new Leaf.bool( false ),
			east: new Leaf.bool( false ),
			center: new Leaf.bool( false ),
			west: new Leaf.bool( false ),
		};

		color = new HSL();
	}

	type align_items = "stretch" | "flex-start";

	export type CSSFlex =
	{
		"align-items" ? : align_items;
	}

	const flex : CSSFlex = { "align-items": "flex-start" };

	export type hsl =
	{
		hue : number ;
		sat : number ;
		light : number ;
	}

	export class HSL
	{
		hue = new Leaf.num( 0, this );
		sat = new Leaf.num( 0, this );
		light = new Leaf.num( 0, this );

		css = new Leaf.str( "" );

		set value( lit : hsl )
		{
			this.hue.value = lit.hue;
			this.sat.value = lit.sat;
			this.light.value = lit.light;
		}

		get value() : hsl
		{
			const value =
			{
				hue: this.hue.value,
				sat: this.sat.value,
				light: this.light.value,
			};
			
			return value;
		}

		update()
		{
			const { hue, sat, light } = this.value;
			this.css.value = `hsl( ${ hue }, ${ sat }, ${ light } )`;
		}
	}
}

namespace view
{
	export const Applet1 = () =>
	{
		return ef.article
		(
			{},
			ef.section
			(
				{},
			),
		);
	};
}

const v_button = ( title : string, lf : Leaf.str, v : string ) =>
(
	button( title, () => lf.value = v )
);


const s_button = ( title : string, lf : Leaf.bool ) =>
(
	button( title, () => lf.value = ! lf.value )
);


const s_button_2 = ( title : string, lf : Leaf.bool ) => ef.span
(
	ef.label( title ),
	ef.input
	(
		{
			attrs: { type: "checkbox", },
			props: { checked: lf, },
			acts: { change( ev ){ if( ev.target instanceof HTMLInputElement ) lf.value = ev.target.checked } },
		}
	),
	" ",
	lf,
);
	
const button = ( title : string, act : () => void ) => new dom.Nodet
(
	{
		ns: "",
		type: "button",
		acts: { click: act },
		parts: [ title ]
	}
);

