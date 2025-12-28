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
				passive :
				{
					mousedown  : () => log ( "mousedown"  ) ,
					mouseup    : () => log ( "mouseup"    ) ,
					touchstart : () => log ( "touchstart" ) ,
					touchend   : () => log ( "touchend"   ) ,
				} ,
			} ,
			ef.main
			(
				ef.h1( "Nav dev " ) ,
				ef.p ( new Date ().toLocaleString () ) ,
			) ,
		) ;
	}

	/* css */

	const css = /* css */ `
	
	* { color : hsl( 0  0%  60% ) ; }

	main
	{
		text-align : center ;
	}
	
	` ;
}

export const main = ( ce : string ) =>
{
	DOM.add ( VC.App () , ce ) ;
} ;
