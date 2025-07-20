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
		return $.main
		(
			{ class : "FV AC" , style : {  } } ,
			$.h1 ( "HSL Branch" ) ,
		) ;
	}
}

Meh.DOM.add ( VC.Applet () , "body" ) ;
