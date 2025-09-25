import * as Meh from "../Meh/Meh.js" ;
import { Live , Ease , ef as $ , log } from "../Meh/Meh.js" ;

type llr < V > = V | Live < V > ;

namespace DM
{
	export type xy =
	{
		x : number ;
		y : number ;
	} ;

	export type XY = Ease < xy > ;

	export type area = 
	{
		pos : xy ;
		size : xy ;
	} ;

	export type Area = Ease < area > ;


	/* 型定義 */

	export type hsl =
	{
		hue : number ;
		sat : number ;
		light : number ;
	}

	export type HSL = Ease < hsl > ;

	export function HSL ( v : hsl )
	{
		return Ease ( v ) ;
	}

	export const toCSS = ( s : HSL ) => s.trans_r ( tocss ) ;

	const tocss = ( { hue , sat , light } : hsl ) =>
	(
		`hsl( ${ hue.toFixed ( 1 ) }  ${ pc ( sat ) }  ${ pc ( light ) } )`
	) ;

	const pc = ( v : number ) : string => ( v * 100 ).toFixed ( 1 ) + "%" ;

	/* 応用例 */

	const color : HSL = HSL ( { hue : 90 , sat : 0.5 , light : 0.5 } ) ;
	color.hue.$ += 5 ;
	color.light.$ *= 0.95 ;

	console.log ( color ) ;
}

namespace VM
{
	export class Applet
	{
		value = Live ( 50 ) ;
		range = { title : "Range" , value : this.value }
		color = DM.HSL ( { hue : 255 , sat : 0.45 , light : 0.55 } );
		colorCSS = DM.toCSS ( this.color ) ;

		constructor ()
		{
			this.color.hue
		}
	}

	export type range =
	{
		title : llr < string > ;
		value : Live < number > ;
		min ? : llr < number > ;
		max ? : llr < number > ;
		step ? : llr < number > ;
		toL ? : ( value : number ) => string ;
		unit ? : llr < string > ;
	}
}

namespace VC
{
	export const Applet = () =>
	{
		const vm = new VM.Applet () ;

		return $.main
		(
			$.h1 ( "HSL Branch" ) ,
			BranchSetValueTest ( vm.color ) ,
			HSLRanges ( vm.color ),
			Display ( vm.colorCSS ) ,
			Range ( vm.range ) ,
		) ;
	}

	const BranchSetValueTest = ( color : DM.HSL ) => $.section
	(
		{ class : "FH" , style : { gap : "0.6ex" } } ,
		$.button ( { passive : { click : () => color.$ = { hue : 95 , sat : 0.40 , light : 0.50 } } } , "くさ色" ) ,
		$.button ( { passive : { click : () => color.$ = { hue : 220 , sat : 0.70 , light : 0.70 } } } , "そら色" ) ,
		$.button ( { passive : { click : () => color.$ = { hue : 345 , sat : 0.42 , light : 0.50 } } } , "あか" ) ,
	);
	

	const Display = ( colorCss : Live.R < string > ) => $.section
	(
		{ class : "DISPLAY" , style : { backgroundColor : colorCss } } ,
		$.section ( { style : { color : "#fff" , whiteSpace : "pre" } } , colorCss ) ,
		$.section ( { style : { color : "#111" , whiteSpace : "pre" } } , colorCss ) ,
	) ;

	const HSLRanges = ( dm : DM.HSL ) => $.section
	(
		{ class : "RANGES" } ,
		Range ( { title : "Hue" , value : dm.hue , unit : "°" , step : 0.1 , max : 360 , toL : v => v.toFixed ( 1 ) } ) ,
		Range ( { title : "Sat" , value : dm.sat , unit : "%" , step : 0.001 , max : 1 , toL : toPC } ) ,
		Range ( { title : "Light" , value : dm.light , unit : "%" , step : 0.001 , max : 1 , toL : toPC } ) ,
	) ;

	const toPC = ( value : number ) : string => ( value * 100 ) .toFixed ( 1 ) ;

	const Range = ( { title , value , max , min , step , toL , unit } : VM.range ) =>
	{
		const range = $.input
		(
			{
				class : "range" ,
				attrs : { type : "range" } ,
				props : { min , max , step } ,
				biBind : { vInpN : value }
			}
		) ;

		return $.section
		(
			{ class : "RANGE" } ,
			$.span ( { class : "title" } , title ) ,
			range ,
			$.span
			(
				{ class : "vu" } ,
				$.span ( { class : "value" } , toL ? value.trans_r ( toL ) : value ) ,
				$.span ( { class : "unit" } , unit ) ,
			) ,
		) ;
	}
}

Meh.DOM.add ( VC.Applet () , "body" ) ;
