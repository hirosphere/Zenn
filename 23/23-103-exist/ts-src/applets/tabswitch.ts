import { models as Mehm, Leaf, ef, each, newhook, Hook } from "../meh/index.js";
import { Grazer } from "./grazer.js";
import { Applet } from "./applet.js";
//const log = console.log;
const log = ( ... any : any ) => {};

const { div, span, p, ul, li, select, option } = ef;

//  //

export const TabSwitchApp = () =>
{
	const labels = [ "Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn" ];
	const sel : Mehm.Select < string > = Mehm.Select.fromLabels( labels, "Nuuull" );
	sel.root?.parts[ 3 ].select();

	return ef.article( { class: "applet"},

		ef.h2( "TabSwitch" ),
		ef.section( { class: "col-2" },

			div( ef.button( { acts: { click() { sel.default.select(); } } }, "Null" ) ),
			
			Tabs( sel.root.parts ),
			
			ContentSwitch( sel.root.parts ),

			ef.section
			(
				ef.input( { attrs: { value: sel.current.cv( o => `${ o?.value }` ) } } )
			),
		),
	);
}

// Tab|Tab|Tab //

const Tabs = ( opts ? : Mehm.Option < string > [] ) =>
{
	const gr = new Grazer( { buttons: 1 } );
	const hook = newhook();
	hook.init = () => hook.e && gr.initTouch( hook.e );

	return ul( {
			class: "tabs",
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ); }
			},
			hook
		},
		each( opts || [], opt => Tab( opt, gr ) ), );
}

const Tab = ( opt : Mehm.Option < string >, gr : Grazer ) =>
{
	return li( {
			class: [ "tab", { selected: opt.selected } ],
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ) && opt.select(); },
				mouseenter( ev ) { gr.mouseenter( ev ) && opt.select(); },
			}
		},
		opt.value
	);
};

//  //

const ContentSwitch = ( options : models.Option[] ) =>
{
	return ef.div( { class: "switch" }, each( options, option => Content( option ) ) );
};

const Content = ( option : models.Option ) =>
{
	return ef.section( { class: [ "switch-content", { active: option.selected } ] },
		ef.h2( option.value ),
		ef.p( option.value, " を知らないか？" )
	);
};


//  models  //

namespace models
{
	export class PageContent
	{
		readonly name;
		constructor( name : string )
		{
			this.name = new Leaf.String( name );
		}
	}
	
	export class Option extends Mehm.Option < string > {}
}

