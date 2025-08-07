import * as Meh from "../Meh/Meh.js" ;
import { State , Leaf , leaf , llr , Branch , ef as $ , log } from "../Meh/Meh.js" ;

namespace DM
{
	export type xy =
	{
		x : number ;
		y : number ;
	} ;

	export class XY extends Branch < xy > () {}

	export type area = 
	{
		pos : xy ;
		size : xy ;
	} ;

	export class Area extends Branch < area > ()
	{}

	const a = new Area ( { pos : { x : 10 , y : 10 } , size : { x : 70 , y : 50 } } ) ;



	/* 型定義 */

	export type hsl =
	{
		hue : number ;
		sat : number ;
		light : number ;
	}

	export class HSL extends Branch < hsl > ()
	{
		get css () : State < string > { return this.$_conv ( tocss ) ; }
	}

	const tocss = ( { hue , sat , light } : hsl ) =>
	(
		`hsl( ${ hue }  ${ sat * 100 }%  ${ light * 100 }% )`
	) ;

	/* 応用例 */

	const color : HSL = new HSL ( { hue : 90 , sat : 0.5 , light : 0.5 } ) ;
	color.hue.$ += 5 ;
	color.light.$ *= 0.95 ;

	console.log ( color.css.$ ) ;




}

namespace VM
{
	export class Applet
	{
		value = leaf ( 50 ) ;
		range = { title : "Range" , value : this.value }
		color = new DM.HSL ( { hue : 0 , sat : 0.65 , light : 0.65 } );

		constructor ()
		{
			this.color.hue
		}
	}

	export type range =
	{
		title : llr.String ;
		value : Leaf < number > ;
		min ? : llr.Number ;
		max ? : llr.Number ;
		step ? : llr.Number ;
		toL ? : ( value : number ) => string ;
		unit ? : llr.String ;
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
			Display ( vm.color.css ) ,
			Range ( vm.range ) ,
		) ;
	}

	const BranchSetValueTest = ( color : DM.HSL ) => $.section
	(
		{ class : "FH" , style : { gap : "0.6ex" } } ,
		$.button ( { passive : { click : () => color.$ = { hue : 95 , sat : 0.40 , light : 0.50 } } } , "くさ色" ) ,
		$.button ( { passive : { click : () => color.$ = { hue : 210 , sat : 0.70 , light : 0.65 } } } , "そら色" ) ,
		$.button ( { passive : { click : () => color.$ = { hue : 345 , sat : 0.40 , light : 0.50 } } } , "あか" ) ,
	);
	

	const Display = ( colorCss : State < string > ) =>  $.section
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
				bb : { vInpN : value }
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
				$.span ( { class : "value" } , toL ? value.$_conv ( toL ) : value ) ,
				$.span ( { class : "unit" } , unit ) ,
			) ,
		) ;
	}
}

Meh.DOM.add ( VC.Applet () , "body" ) ;
