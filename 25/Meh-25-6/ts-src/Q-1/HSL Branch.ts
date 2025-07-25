import * as Meh from "../Meh/Meh.js" ;
const { ef : $ , log } = Meh ;

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

	Meh.log ( "HSL Branch" ) ;

	const lf = Meh.State.new ( 555 ) ;

	Meh.log ( Object.keys ( lf ) ) ;
}

namespace VM
{
	export class Applet
	{
		value = Meh.State.new ( 50 ) ;
		range : range = { title : "Range" , value : this.value } ;
		color : DM.hsl = { h : 90 , s : 0.75 , l : 0.75 } ;
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
			Range ( vm.range ) ,
		) ;
	}

	const HSLRanges = ( dm : DM.hsl ) => $.section
	(
		{  } ,
		Range ( { title : "H" , value : new State.Leaf ( 0 ) } ) ,
		Range ( { title : "S" , value : new State.Leaf ( 0 ) } ) ,
		Range ( { title : "L" , value : new State.Leaf ( 0 ) } ) ,
	) ;

	const Range = ( vm : VM.range ) =>
	{
		return $.section
		(
			{ class : "RANGE FH PGXX AC" } ,
			$.span ( { class : "title" } , vm.title ) ,
			$.input ( { class : "range" , attrs : { type : "range" } , bb : { vInpN : vm.value } } ) ,
			$.span ( { class : "value" } , vm.value ) ,
		) ;
	}
}

Meh.DOM.add ( VC.Applet () , "body" ) ;
