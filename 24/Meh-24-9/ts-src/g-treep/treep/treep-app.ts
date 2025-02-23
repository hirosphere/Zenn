import { leaf , ef , each , sw , dom , log } from "../../meh/index.js" ;

log ( "Treep App 1" ) ;

/* */


/* */


/* */

export namespace VC
{
	export const App = () =>
	{
		return ef.body
		(
			ef.h1 ( "Treep" ) ,
		) ;
	}
}


/* */

export const main = ( ce : string ) =>
{
	dom.add ( VC.App () , ce ) ;
}

export default
{
	main ,
}
