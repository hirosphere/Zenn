import { ef , pl , DD as dd , log } from "../Meh/Meh.js" ;
import { VM , } from "./BookBase.js" ;



const parts = [ "Un" , "Deux" , "Trois" ] ;

function dyndex ( title : string , depth : number = 1 ) : VM.index
{
	const rt : VM.index =
	{
		type : "Dyndex" ,
		title ,
		open : depth == 1 ,
		dyn_parts : index => Object.fromEntries
		(
			parts.map
			(
				name => [ name , dyndex ( `${ name } de ${ depth }` , depth + 1 ) ]
			)
		)	
	}

	return rt ;
}

export const Dyndex : VM.index = dyndex ( "Dyndex" ) ;



/* */

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
