import { ef , pl , DD as dd , log } from "../Meh/Meh.js" ;
import { VM , } from "./BookBase.js" ;

export const Dyndex : VM.index = dyndex ( "Dyndex" ) ;


function dyndex ( title : string , depth : number = 0 ) : VM.index
{
	const rt : VM.index =
	{
		type : "Dyndex" ,
		title ,
		dyn_parts : index => parts.map ( e => dyndex ( e , depth + 1 ) )	
	}

	return rt ;
}

const parts = [ "Un" , "Deux" , "Trois" ] ;

export namespace VC
{
	export function Page ( index : VM.Index ) : dd.Node
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				ef.h1 ( index.title ) ,
			) ,
		) ;
	}

	/* */

	const css = /* css */ `

	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ; }
	
	main
	{
		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  20% ) ;
	}
	
	
	
	` ;
}
