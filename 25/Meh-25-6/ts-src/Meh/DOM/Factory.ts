import { log } from "../Util.js" ; 
import { DD , MehNode , MehText , MehElement } from "./DOM.js" ;

export const add = ( node : DD.Node | DD.Node [] , celq : Element | string ) : void =>
{
	const cel = mak_el ( celq ) ;
	if ( cel == null )  return ;

	if ( node instanceof Array )
	{
		;
	}

	else
	{
		const mn = make_part ( node ) ;

		log ( "add" , cel , mn ) ;

		cel.appendChild ( mn.node ) ;
	}
}

const mak_el = ( elq : Element | string ) : Element | null =>
{
	if ( elq instanceof Element )  return elq ;
	return document.querySelector ( elq ) ;
}

const make_part = ( mi : DD.Node ) : MehNode =>
{
	return new MehText ( mi ) ;
}