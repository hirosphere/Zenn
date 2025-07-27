import * as Meh from "../Meh/Meh.js" ;
import { State , leaf , Branch , ef as $ , log } from "../Meh/Meh.js" ;

namespace DM
{
	export type doc =
	{
		title : string ;
	}

	export type shape =
	{
		color : hsl ;
		pos : xy ;
		size : xy ;
	}

	export type HSL = Branch < hsl > ;
	export const newHSL = Branch.create < hsl > ;

	new Proxy ( {} as HSL , {} ).h.$ = 50 ;

	export type Shape = Branch < shape > ;
	export const newShape = Branch.create < shape > ;

	const sh = newShape ( { color : { h : 180 , s : 0.75 , l : 0.75 } , pos : { x : 50 , y : 70 } , size : { x : 10 , y : 10 } } ) ;

	sh.$ ;
	sh.color.h.$ = 240 ;
	sh.color.s.$ = 0.6 ;
	sh.color.l.$ = 0.6 ;

	sh.pos.$ = { x : 0 , y : 1 } ;

	export type hsl =
	{
		h : number ;
		s : number ;
		l : number ;
	}

	export type xy =
	{
		x : number ;
		y : number ;
	}


	( sh : Shape ) =>
	{
		// sh.color.h.$ = 0 ;
	}

	Meh.log ( "HSL Branch" ) ;

	const lf = leaf ( 555 ) ;

	Meh.log ( Object.keys ( lf ) ) ;
}

namespace VM
{
	export class Applet
	{
		value = leaf ( 50 ) ;
		range = { title : "Range" , value : this.value }
		color = DM.newHSL ( { h : 0 , s : 10 , l : 20 } );
		css ;

		constructor ()
		{
			this.color.h
			this.css = this.color.cv ( ( { h , s , l } ) => `hsl( ${ h } )` )
		}
	}

	export type HSLRanges = { h : range ; s : range ; l : range } ;

	export type range =
	{
		title : string ;
		value : Meh.State < number > ;
	}
}

namespace VC
{
	export const Applet = () =>
	{
		const vm = new VM.Applet () ;

		return $.main
		(
			{ class : "FV AC" , style : {  } } ,
			$.h1 ( "HSL Branch" ) ,
			HSLRanges ( vm.color ),
			$.p ( vm.css ) ,
			Range ( vm.range ) ,
		) ;
	}

	const HSLRanges = ( dm : DM.HSL ) => $.section
	(
		{ class : "RANGES" } ,
		Range ( { title : "Hue" , value : dm.h } ) ,
		Range ( { title : "Sat" , value : dm.s } ) ,
		Range ( { title : "Light" , value : dm.l } ) ,
	) ;

	const Range = ( vm : VM.range ) =>
	{
		return $.section
		(
			{ class : "RANGE" } ,
			$.span ( { class : "title" } , vm.title ) ,
			$.input ( { class : "range" , attrs : { type : "range" } , bb : { vInpN : vm.value } } ) ,
			$.span ( { class : "value" } , vm.value ) ,
		) ;
	}
}

Meh.DOM.add ( VC.Applet () , "body" ) ;
