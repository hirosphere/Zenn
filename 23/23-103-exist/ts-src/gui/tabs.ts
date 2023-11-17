import { Option, defs, ef, each, newhook } from "../meh/index.js";
import { Grazer } from "./grazer.js";
const log = console.log;
//const log = ( ... any : any ) => {};

const { div, span, p, ul, li, select, option } = ef;

// Tab|Tab|Tab //

export const Tabs = < O extends Option > ( opts ? : O [] ) =>
{
	const gr = new Grazer( { buttons: 1 } );
	const hook = newhook();
	hook.init = () => hook.e && gr.initTouchContainer( hook.e );

	return ul( {
			class: "tabs",
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ); }
			},
			hook
		},
		each( opts || [], opt => Tab( opt, gr ) ), );
}

const Tab = < O extends Option > ( opt : O, gr : Grazer ) =>
{
	return li( {
			class: [ "tab", { selected: opt.selected } ],
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ) && opt.select(); },
				mouseenter( ev ) { gr.mouseenter( ev ) && opt.select(); },
			}
		},
		opt.title
	);
};

//  //

export const Switch = < O extends Option > ( options : O[], content : Content < O > ) =>
{
	return ef.div( { class: "switch" },
		each(
			options,
			option => SwitchItem( option, content( option ) )
		)
	);
};

const SwitchItem = ( option : Option, content : defs.Node ) =>
{
	return ef.div( { class: [ "switch-item", { active: option.selected } ] },
		content
	);
}

type Content < O > = ( option : O ) => defs.Node;
