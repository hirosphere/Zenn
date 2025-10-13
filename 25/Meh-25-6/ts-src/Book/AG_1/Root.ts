import { Live , Renn , DD , ef , pl , } from "../../Meh/Meh.js" ;

const log = console.log ;



export namespace VC
{
	const css /* css */ =
	`
	* { box-sizing : bourder-box ; margin : 0 ; padding : 0 ; }
	
	main
	{
		padding : 1em ;
	}


	`;

	export const App = () : DD.Node =>
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				ef.h1 ( "Root" ) ,
			)
		) ;
	}
}
