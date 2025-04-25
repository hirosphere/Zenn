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
		{ class : "AF0" , style : { background : "hsl( 200, 70%, 85% )" } } ,
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
				background : "hsl( 0, 0%, 100% )" ,
				borderRadius : "0.1ex" ,
				padding : "0.3ex 0.8ex" ,
				display : "flex" ,
				columnGap : "1em" ,
				flexWrap : "wrap" ,
			}
		} ,
		field ( ( o.value?.toString() ) + "" ) ,
		field ( i.anm ) ,
		field ( i.mag ) ,
		field ( i.cod ) ,
		// field ( i.at ) ,
		field ( i.rdt ) ,
	) ;
}

const field = ( t : string ) => ef.span
(
	{ style : { wordBreak : "keep-all" } } ,
	t
) ;
