import { leaf , ef , dom , log } from "../meh/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace VM
{
	export class Serial
	{
		monitor = leaf ( "serial monitor" ) ;

		constructor ()
		{
			this.update () ;
		}

		async update ()
		{
			const res = await fetch ( "/API/Serial" ) ;
			this.monitor.value = res.ok && ( JSON.stringify ( await res.json () , null , "\t" ) ) || "Error" 
		}	
	}
}

namespace VC
{
	export const App = () =>
	{
		return ef.main
		(
			ef.h1 ( "Q3" ) ,
			ef.section
			(
				{ class : "fl-row" } ,
				ef.a ( { attrs : { href : "http://localhost:3030/GitHub/Zenn/24/Meh-24-9/q3/q3.html" } } , ":3030" ) ,
				ef.a ( { attrs : { href : "http://localhost/GitHub/Zenn/24/Meh-24-9/q3/q3.html" } } , ":80" ) ,
				ef.a ( { attrs : { href : "./zz-index.html" } } , "zz" ) ,
			) ,
			Serial () ,
			ClockA () ,
		)
	}

	const Serial = () =>
	{
		const m = new VM.Serial () ;

		return ef.section
		(
			ef.h2 ( "Serial" ) ,
			ef.p ( { style : { whiteSpace : "pre" , fontFamily : "monospace" } } , m.monitor ) ,
			ef.section
			(
				{ class : "fl-bar" } ,
				ef.button ( { acts : { click () { m.update () ; } } } , "更新" ) ,
			)
		) ;
	}
}


export const main = ( ce : string = "body" ) =>
{
	dom.add ( VC.App () , ce ) ;
}
