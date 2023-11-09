import { Select, Option, ef, each } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;
const { div, span, p, ul, li } = ef;

//  //

namespace models
{
	export class Tabs
	{
		selector = new Select < string >;

		constructor( labels : string [] )
		{
			this.selector.options.addValues( labels );
		}
	}
}

export const TabSwitchApp = () =>
{
	const labels = [ "Eins", "Zwei", "Drei", "Vier", "Fuenf", "Sechs", "Sieben", "Acht", "Neun", "Zehn" ];
	const tabs = new models.Tabs( labels );

	return Applet({
		title: "TabSwitch",
		content: [ Tabs( tabs ) ]
	});
}

const Tabs = ( model : models.Tabs ) =>
{
	return ul( { class: "tabs" }, each( model.selector.options, opt => Tab( opt ) ), );
}

const Tab = ( opt : Option < string > ) =>
{
	opt.selected.ref( v => log( v ) )
	return li
	(
		{ class: [ "tab", { selected: opt.selected } ], acts: { mousedown() { opt.select(); } } },
		opt.value
	);
};

