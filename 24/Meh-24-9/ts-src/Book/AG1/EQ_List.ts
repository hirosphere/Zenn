import { leaf , Order , ef , pl , defs , log } from "../../meh/index.js" ;
import * as JMAQuake from "../data-api/jma-quake.js" ;

namespace DM
{
	export class Applet
	{
		list = new JMAQuake.List () ;
	}
}

export const EQListApp = () =>
{
	const dm = new DM.Applet ;

	return ef.main
	(
		{ class : "AF0" , style : { background : "hsl( 200, 70%, 75% )" } } ,
		ef.h1 ( "地震リスト" ) ,
		List ( dm.list ) ,
		ef.section
		(
			{
				style : { height : "0em" , overflow : "auto" , whiteSpace : "pre" , } ,
			} ,
			// dm.list.datatext ,
		) ,
		ef.section
		(
			{  } ,
			ef.button ( { acts : { click : () => dm.list.update () } } , "Load" )
		)
	)
}

const List = ( dm : JMAQuake.List ) =>
{
	return ef.ul
	(
		{
			style :
			{
				background : "hsl( 200 85% 85% )" ,
				flexGrow : "1" ,
				minHeight : "50vh" ,
				overflow :  "auto",
				display : "flex" ,
				flexDirection : "column" ,
				gap : "1px" ,
			}
		} ,
		pl.each ( dm.items , order => Item ( order ) ) ,
	) ;
}

const Item = ( o : Order < JMAQuake.item > ) =>
{
	const i = o.target ;

	return ef.li
	(
		{
			style :
			{
				borderRadius : "0.1ex" ,
				display : "flex" ,
				columnGap : "1em" ,
				flexWrap : "wrap" ,
				gap : "1px" ,
			}
		} ,
		field (  ( o.value?.toString() ) + "" , 5 , true , true ) ,
		field (  i.anm , 22 ) ,
		field (  i.mag , 5 , true ) ,
		field ( i.cod , 24 ) ,
		// field ( i.at ) ,
		field ( new Date ( i.rdt ) .toLocaleString () , 22 ) ,
	) ;
}

const field = ( t : string , width : number , center ? : boolean , bold ? : boolean ) => ef.span
(
	{
		style :
		{
			background : "hsl( 0, 0%, 100% )" ,
			flexBasis : `${ width }ex` ,
			padding : "0.2ex 0.7ex" ,
			wordBreak : "keep-all" ,
			textAlign : center ? "center" : "" ,
			fontWeight : bold ? "bold" : ""
		}
	} ,
	t
) ;
