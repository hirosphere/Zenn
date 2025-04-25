import { leaf , Order , ef , pl , log } from "../../meh/index.js" ;
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
		{ class : "AF0" } ,
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
				height : "60vh" ,
				overflow :  "auto",
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
				display : "flex" ,
				gap : "1em" ,
			}
		} ,
		ef.span ( o ) ,
		ef.span ( i.anm ) ,
		ef.span ( i.at ) ,
		ef.span ( i.rdt ) ,
	) ;
}
