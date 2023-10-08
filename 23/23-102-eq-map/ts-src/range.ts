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
	const cv = uim.value.strconv( uim.conv );

	const inputact = ( ev : Event ) =>
	{
		if( ev.target instanceof HTMLInputElement ) uim.value.set( Number( ev.target.value ) );
	};

	return div
	(
		{ class: "range" },

		span( { class: "title" }, uim.title ),
		input
		({
			class: "input",
			props:
			{
				value: uim.value,	
			},
			attrs:
			{
				min: uim.min,
				max: uim.max,
				step: uim.step,
				type: "range",
			},
			acts:
			{
				input: inputact,
			}
		}),

		span
		(
			{ class: "value-unit" },
			
			span( { class: "value"}, cv ),
			span( { class: "unit" }, uim.unit ),
		)
	);
};

export const Range = { UI };
