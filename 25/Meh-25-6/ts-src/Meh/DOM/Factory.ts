import { DD , MehNode , MehText , MehElement } from "./DOM.js" ;

export const add = ( items : DD.MI | DD.MI [] , celq : Element | string ) : void =>
{
	const cel = mak_el ( celq ) ;

	if ( items instanceof Array )
	{
		;
	}

	else
	{
		;
	}
}

const mak_el = ( elq : Element | string ) : Element | null =>
{
	if ( elq instanceof Element )  return elq ;
	return document.querySelector ( elq ) ;
}

const make_part = ( mi : DD.MI ) : MehNode =>
{
	return new MehText ( "" ) ;
}