import { Leaf, ef, dom } from "./meh/index.js";
import { Range } from "./gui/range.js";
import { HSLApplet } from "./applets/hsl.js";
import { Lian1 } from "./applets/lian1app.js";
import { EachSample } from "./applets/ap-each-sample.js";
import { TabSwitchApp } from "./applets/tabswitch.js";
import { ColorApp1 } from "./applets/color1.js";
const log = console.log;

//

const CompoA = () =>
{
	const { div, h2, h3, p, span, input, textarea, button, ul, li, hr } = ef;

	return div
	(
		{ class: "applet" },
		
		h2( "Component A" ),
		div
		(
			{ class: "applet-body" },
			h3( "8つの浦和駅" ),
			ul
			(
				li( "北浦和" ),
				li( "浦和" ),
				li( "南浦和" ),
				li( "東浦和" ),
				li( "浦和美園" ),
				li( "西浦和" ),
				li( "中浦和" ),
				li( "武蔵浦和" ),
			),
			Range.UI( { title: "Range 2023", value: new Leaf.Number( 0.35 ), unit: "%", max: 1, step: 0.01, conv: v => String( Math.round( v * 100 ) ) } ),
		),
	);
}

const Applets = () =>
{
	const { div, h1 } = ef;

	return div
	(
		{ class: "applets" },
		
		h1( "23-103 Lian, Exist" ),
		ColorApp1(),
		TabSwitchApp(),
		// EachSample(),
		Lian1.UI(),
		HSLApplet(),
		CompoA(),
	);
};

dom.create( Applets(), "body" );

//

export const appMain = () =>
{
	// log( "meh-small-app" );
};
