import { leaf , dom , ef , log } from "../meh/index.js" ;
import { Kbd_1 } from "../meh-au/keybd.js" ;

const App = () =>
{
	return ef.article
	(
		ef.h2 ( "Keyboard" ) ,
		Kbd_1 (  )
	)
}

export const main = () =>
{
	dom.add ( ef.main ( App () ) , "body" )
}
