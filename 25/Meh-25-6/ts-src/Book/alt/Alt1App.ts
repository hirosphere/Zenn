import { Life , Live , Renn , Ease , Key , DOM , DD , ef , pl , log } from "../../Meh/Meh.js" ;
import * as common from "./common.js" ;

log ( "Alt1App" ) ;


namespace VC
{
	export const App = () : DD.Mel =>
	{
		return ef.div
		(
			{
				shadow : [ common.css , css ] ,
			} ,
			ef.main
			(
				ef.h1( "Nav dev " ) ,
				ef.p ( new Date ().toLocaleString () ) ,
				Counter () ,
				Counter () ,
				Counter () ,
			) ,
		) ;
	}

	const Counter = () =>
	{
		const count = Live ( 100 ) ;

		return ef.section
		(
			{ class : "FR GX JC AC" } ,
			ef.button ( { passive : { click : () => count.$ -= 1 , } } , "-1" ) ,
			ef.button ( { passive : { click : () => count.$ += 1 , } } , "+1" ) ,
			ef.span( { style : { fontSize : "3em" } } , count ) ,
		) ;
	}

	/* css */

	const css = /* css */ `
	
	* { color : hsl( 0  0%  60% ) ; }

	main
	{
		text-align : center ;
	}

	button
	{
		min-width : 4em ;
		padding : 1.2ex 1.2em ;
	}
	
	` ;
}

export const main = ( ce : string ) =>
{
	DOM.add ( VC.App () , ce ) ;
} ;
