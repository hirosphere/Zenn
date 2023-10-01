import { leaf as l, lol as ll, ef } from "./meh/index.js";
import { Range } from "./range.js";

l.bool;

type HSL = { hue: number; sat: number; lig: number; };

export class Branch
{
	hue; sat; lig;
	css;

	constructor( v : HSL = { hue: 210, sat: 0.65, lig: 0.65 } )
	{
		const rel = () => this.update();

		this.hue = l.num( v.hue, { rel } );
		this.sat = l.num( v.sat, { rel } );
		this.lig = l.num( v.lig, { rel } );

		this.css = l.str( "" );

		this.update();
	};

	update()
	{
		const css = `hsl( ${ this.hue.value }, ${ r( this.sat.value ) }, ${ r( this.lig.value ) } )`;
		this.css.value = css;
	}
}

const r = ( v : number ) => String( Math.round( v * 100 * 10000 ) / 10000 ) + "%";

export const HSLRange = ( data : Branch ) =>
{
	const { div } = ef;

	const conv = ( value : number ) => String( Math.round( value * 100 ) );

	return div
	(
		{  },
		Range.UI( { title: "Hue", value: data.hue, max: 360 } ),
		Range.UI( { title: "Sat", value: data.sat, max: 1, step: 0.01, conv, unit: "%" } ),
		Range.UI( { title: "Light", value: data.lig, max: 1, step: 0.01, conv, unit: "%" } ),
	);
};

export const HSLApplet = ( value : Branch = new Branch ) =>
{
	const { div, h2 } = ef;

	return div( { class: "HSLApplet" },
		h2( "HSLApplet" ),
		div( { className: "applet-body" },
			HSLRange( value ),
			div( { styles: { background: value.css } }, value.css ),
		)
	);
}
