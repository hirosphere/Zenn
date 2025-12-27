import { Live , Ease , Renn , Key , DD , ef , pl , log } from "../../../Meh/Meh.js" ;



namespace VC
{
	export const App = () : DD.Mel =>
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : [ "FC PM GX" ] } ,
				ef.h1( { class : "TC" } , "Form Quest 1" ) ,
			) ,
		) ;
	}

	/* css */

	const css = /* css */ `
	
	* { box-sizing : border-box ;  margin : 0 ;  color : hsl( 0  0%  13% ) ; }
	
	.FR { display : flex ;  flex-direction : row ; }
	.FC { display : flex ;  flex-direction : column ; }

	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }
	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }
	.GP { gap : 1pt ; }

	.JC { justify-content : center ; }

	.AC { align-items : center ; }

	.TC { text-align : center ; }
	
	` ;
}

export const App = VC.App ;
