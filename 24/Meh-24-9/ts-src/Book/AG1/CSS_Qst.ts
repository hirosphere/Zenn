import { leaf , ef , dom , log } from "../../meh/index.js" ;

namespace Qst
{
	export const css1 = () : CSSStyleSheet =>
	{
		const ss = new CSSStyleSheet () ;

		ss.replace
		(
`:host { background : hsl( 0  0%  40% ) ; }
h1 { color : oklch( 90%  0%  0 ) ; }
`
		) ;

		log ( "css1" )

		return ss ;
	}
}

namespace VC
{
	export const Applet = () : dom.MehElement =>
	{
		const qstr = leaf ( "CSSOM Quest" ) ;

		return ef.main
		(
			{
				class : "FV AC",
				hook :
				{
					init ( el )
					{
					//	const shadow = el.attachShadow ( { mode : "closed" } ) ;
					//	shadow.adoptedStyleSheets.push ( Qst.css1 () ) ;
					}
				},
				shadow : { mode : "open" }
			} ,

			ef.template ( "ら。ら。ら") ,

			ef.h1 ( "CSSOM Quest" ) ,
			ef.p ( { class : "BH PMM" } , qstr ) ,
			ef.style
			(

/*css */ `

p
{
	transition : all 1.0s 0.2s ease ;
}

p:hover
{
	background : oklch( 20%  0%  0 / 20% ) ;
	cursor : default ;
	padding : 1ex ;
}

`
			)
		) ;
	}
}

export const CSSOM_Quest = VC.Applet ;
