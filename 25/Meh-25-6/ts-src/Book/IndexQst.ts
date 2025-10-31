import { ef , pl , DD as dd , times , log } from "../Meh/Meh.js" ;
import { VM , } from "./BookBase.js" ;



function dyndex ( title : string , depth : number = 1 , path : number [] = [] ) : VM.index
{
	const sep = ( depth : number ) : string => depth % 4 == 3 ? "-" : "" ;
	const pathlabel = path.map ( ( i , depth ) => i + sep ( depth ) ).join ( "" ) ;

	const t = ( i : number ) =>
	[
		"" + i ,
		dyndex ( `第${ depth }層 # ${ pathlabel}${ i }` , depth + 1 , [ ... path , i ] )
	] ;
	
	const rt : VM.index =
	{
		type : "Dyndex" ,
		title ,
		open : depth == 1 ,
		parts : index => Object.fromEntries ( times ( 4 , t ) ) ,
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

	:host { height : 100% ; }
	
	main
	{
		height : 100% ;

		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		justify-content : center ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  20% ) ;
	}
	
	
	
	` ;
}
