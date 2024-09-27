import { dom, Leaf, ef, log } from "../meh/index.js";

export const main = () =>
{
	dom.add( view.Applet1(), "body" );
};

namespace models
{
	export class Applet1
	{
		text = new Leaf.str( "常磐線で行こう" );

		clist =
		{
			selected: new Leaf.bool( true ),
			shadowed: new Leaf.bool( false ),
			green: new Leaf.bool( false ),
			cyan: new Leaf.bool( true ),
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
		const model = new models.Applet1();

		return ef.article
		(
			{},
			ef.h1( "Meh Quest : Leaf" ),
			ef.section
			(
				{},
				ef.p
				(
					{ class: model.clist },
					model.text,
				),
			),
			ef.section
			(
				{ class: "gap", },
				v_button( "v1", model.text, "日暮里 にっぽり" ),
				v_button( "v1", model.text, "三河島 みかわしま" ),
				v_button( "v1", model.text, "南千住 みなみせんじゅ" ),
			),

			ef.section
			(
				{ class: "gap", style: { flexDirection: "" } },
				check( "Selected", model.clist.selected ),
				check( "Shadowed", model.clist.shadowed ),
				check( "Green", model.clist.green ),
				check( "Cyan", model.clist.cyan ),
			),
		);
	};

	const s : dom.defs.style = { display: new Leaf.str( "" ) };

	const v_button = ( label : string, leaf : Leaf.str, value : string ) => ef.button
	(
		{ acts: { click() { leaf.value = value ; } } },
		label,
	);

	const check = ( label : string, leaf : Leaf.bool ) => ef.section
	(
		ef.label( label ),
		ef.input
		(
			{
				attrs:
				{
					type: "checkbox",
					checked: leaf.value,
				},
				props: { checked: leaf, },
				acts:
				{
					change( ev )
					{
						if( ! ( ev.target instanceof HTMLInputElement ) )  return;
						leaf.value = ev.target.checked;
					}
				}
			}
		),
	);
}
