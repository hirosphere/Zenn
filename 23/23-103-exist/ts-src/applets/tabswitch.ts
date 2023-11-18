import { models as Mehm, Option, Leaf, ef, } from "../meh/index.js";
import { Tabs, Switch }  from "../gui/tabs.js";
const log = console.log;
//const log = ( ... any : any ) => {};

const { div, span, p, ul, li, select, option } = ef;

//  //

export const TabSwitchApp = () =>
{
	const labels = [ "Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn" ];
	const sel : Mehm.Select < string > = Mehm.Select.fromLabels( labels, "Nuulll" );
	sel.root?.parts[ 7 ].select();

	return ef.article( { class: "applet"},

		ef.h2( "TabSwitch" ),
		ef.section( { class: "col-2" },

			div( ef.button( { acts: { click() { sel.default?.select(); } } }, "Null" ) ),
			
			Switch( sel.root.parts, option => Content( option ) ),

			Tabs( sel.root.parts ),
			
			ef.section
			(
				ef.input( { attrs: { value: sel.current.cv( o => `${ o?.value }` ) } } )
			),
		),
	);
};

const Content = ( option : Option < string > ) => ef.section(
	{ style: { minHeight: "180px", border: "1px solid hsl( 45, 4%, 77% )", borderRadius: "1rex", padding: "1em" } },
	ef.h2( option.title, "??" ),
	ef.p( "ご存知、", option.title.toString(), " でございマス。" )
);

export const SelectApp = () =>
{
	return ef.article( { class: "applet" },
		ef.h2( "SelectApp", ),
	);
}

//  models  //

namespace mo
{
	export class Page
	{
		readonly name;
		constructor( name : string )
		{
			this.name = new Leaf.String( name );
		}
	}
	
	export class Option extends Mehm.Option < Page > {}
}

