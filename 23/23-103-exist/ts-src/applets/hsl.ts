import { Leaf, ef } from "../meh/index.js";
import { Range } from "../gui/range.js";

namespace l
{
	export const num = ( value : number, args ?: { rel ?: () => void } ) => new Leaf.Number( value, args );
	export const str = ( value : string, args ?: { rel ?: () => void } ) => new Leaf.String( value, args );
}

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
		{ class: "hsl-range" },
		Range.UI( { title: "Hue", value: data.hue, max: 360 } ),
		Range.UI( { title: "Sat", value: data.sat, max: 1, step: 0.01, conv, unit: "%" } ),
		Range.UI( { title: "Light", value: data.lig, max: 1, step: 0.01, conv, unit: "%" } ),
	);
};

export const HSLApplet = ( value : Branch = new Branch ) =>
{
	const { div, h2, span } = ef;

	return div
	(
		{ class: "applet" },
		h2( "HSLApplet" ),
		div
		(
			{ class: "applet-body" },
			HSLRange( value ),
			div
			(
				{
					style: { background: value.css, height: "300px", borderRadius: "1ex",
					display: "flex", alignItems: "center", justifyContent: "space-around" }
				},
				span( { style: { color: "hsl( 0, 0%, 0% )", flexGrow: "1fr" } }, value.css ),
				span( { style: { color: "hsl( 0, 0%, 100% )", flexGrow: "1fr" } }, value.css )
			),
		)
	);
}
