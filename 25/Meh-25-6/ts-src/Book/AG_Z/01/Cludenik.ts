import { Live , Renn , Ease , Store , DD , ef , pl , times , log } from "../../../Meh/Meh.js" ;
import * as common from "../../Common.js" ;


export namespace VC
{
	export const App = () : DD.Mel =>
	{
		return ef.div
		(
			{ shadow : [ common.css , css ] } ,
			ef.main
			(
				{ class : "FC PM GX" } ,
				ef.h1 ( { class : "TC" } , "Cludenik" ) ,
				Tree () ,
			) ,
		) ;
	}

	class ser_c { #_next = 1 ; get next () : number { return this.#_next ++ ; } }

	const Tree = () : DD.Mel =>
	{
		const ser = new ser_c ;

		return ef.nav
		(
			{ class : "TREE" } ,
			Index ( "Root" , ser ) ,
		) ;
	}

	const Index = ( title : string , ser : ser_c , depth : number = 0 ) : DD.Mel =>
	{
		return ef.div
		(
			{ class : "INDEX" } ,
			ef.label
			(
				{ class : [ "_HEAD" ] } ,
				ef.span ( { class : "_THUMB" } , ef.input ( { attrs : { type : "radio" , name : "rrr" } } ) , "+" ) ,
				ef.span ( { class : "_TITLE" } , `D${ depth } S${ ser.next }` ) ,
			) ,
			depth < 4 ? Parts ( depth , ser ) : undefined ,
		) ;
	}

	const Parts = ( depth : number , ser : ser_c ) : DD.Mel =>
	{
		return ef.ul
		(
			{ class : "PARTS" } ,
			... times ( 4 , n => Index ( "Item" + ( n + 1 ) , ser , depth + 1 ) )
		) ;
	}


	const css = /* CSS */ `
	
	* { color : hsl( 0  0%  30% ) ; }
	
	nav.TREE
	{
		cursor : default ;

		width : 220px ;
		list-style : none ;
		background : hsl( 215  50%  80% ) ;
		padding : 1ex ;

		font-family : sans-serif ;
	}

	.INDEX
	{
		border-radius : 0.0ex  0  0  0.0ex ;
		
		border-top    : 0.1ex solid hsl( 215  0%  40% ) ;
		border-bottom : 0.1ex solid hsl( 215  0%  40% ) ;

		border-left  : 0.5ex solid hsl( 215  0%  30% ) ;

		background-color : hsl( 215  50%  100% / 35% ) ;
	}

	.INDEX > ._HEAD
	{
		display : flex ;
		padding : 0.9ex  1ex ;
		gap : 1ex ;
	}

	.INDEX > ._HEAD > ._THUMB
	{
		color : hsl( 0  0%  60% ) ;
	}

	ul.PARTS
	{
		display : flex ;
		flex-direction : column ;

		padding-left : 1.5ex ;
		padding-bottom : 1.0ex ;
		gap : 0.1ex ;
	}
	
	` ;
}
