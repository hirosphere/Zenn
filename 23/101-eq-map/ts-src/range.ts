import { leaf, lol, LoL, Leaf, ef } from "./meh/index.js";

export class UIM
{
	title : LoL.String ;
	value : Leaf.Number ;
	min : LoL.Number ;
	max : LoL.Number ;
	step : LoL.Number ;
	unit : LoL.String ;
	conv : ( value : number ) => string ;

	constructor( src : Partial < UIM > )
	{
		this.title = src.title ?? "";
		this.value = src.value ?? new Leaf.Number( 0 );
		this.min = src.min ?? 0;
		this.max = src.max ?? 100;
		this.step = src.step ?? 1;
		this.unit = src.unit ?? "";
		this.conv = src.conv ?? ( ( value ) => String( value ) );
	}
};

const { div, span, input } = ef;

export const UI = ( uimsrc : Partial < UIM > ) =>
{
	const uim = new UIM( uimsrc );
	const cv = uim.value.str( { toref: uim.conv } );

	const oninput = ( ev : Event ) =>
	{
		if( ev.target instanceof HTMLInputElement ) uim.value.set( Number( ev.target.value ) );
	};

	return div
	(
		{ className: "range" },
		span( { className: "title" }, uim.title ),
		input({
			className: "range",
			type: "range",
			oninput,
			min: uim.min,
			max: uim.max,
			step: uim.step,
			value: uim.value,
			attrs:
				{
				}
		}),
		span
		(
			{  },
			span( { className: "value"}, cv ),
			span( { class: "unit" }, uim.unit ),
		)
	);
};

export const Range = { UI };
