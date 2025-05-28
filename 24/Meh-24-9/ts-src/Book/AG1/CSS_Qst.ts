import { leaf , ef , dom , log } from "../../meh/index.js" ;

namespace Qst
{
	export const main = () : void =>
	{
		const ss = new CSSStyleSheet () ;

		ss.insertRule ( "main { background : hsl( 0  0%  50% ) ; }" ) ;

		document.adoptedStyleSheets.push ( ss ) ;
	}
}

namespace VC
{
	export const Applet = () : dom.MehElement =>
	{
		Qst.main () ;

		const qstr = leaf ( "CSSOM Quest" ) ;

		return ef.main
		(
			{
				class : "FV AC",
			} ,
			ef.style
			(
				{
					hook :
					{
						init ( e )
						{
							qstr.$ = `${ e.constructor.name } ${ ( e as HTMLStyleElement ).sheet }` ;
						}
					}
				},
				"main { backgroun : hsl( 50%  0%  0 ) }"
			) ,

			ef.h1 ( "CSSOM Quest" ) ,
			ef.p ( qstr ) ,
		) ;
	}
}

export const CSSOM_Quest = VC.Applet ;
