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

	dm.list.update () ;

	return ef.main
	(
		{ class : "DV PPP" , style : { background : "hsl( 200, 70%, 70% )" } } ,
		Graph.Main ( dm.list ) ,
		ef.section
		(
			{ class : "FL BS DV AC OA" } ,
			List ( dm.list )
		) ,
		ef.section
		(
			{
				style : { height : "0em" , overflow : "auto" , whiteSpace : "pre" , } ,
			} ,
			// dm.list.datatext ,
		) ,
		ef.section
		(
			{ class : "DH PPP BS JC" } ,
			ef.button ( { acts : { click : () => dm.list.update () } } , "Load" )
		)
	)
}

const List = ( dm : JMAQuake.List ) =>
{
	return ef.ul
	(
		{
			class : "DV PXP" ,
			style :
			{
				flexGrow : "1" ,
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
			class : "BS" ,
			style :
			{
				borderRadius : "0.1ex" ,
				display : "flex" ,
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
			width : `${ width }ex` ,
			padding : "0.2ex 0.7ex" ,
			wordBreak : "keep-all" ,
			textAlign : center ? "center" : "" ,
			fontWeight : bold ? "bold" : ""
		}
	} ,
	t
) ;

namespace Graph
{
	export const Main = ( dm : JMAQuake.List ) => ef.section
	(
		{
			class : "BS" ,
			style :
			{
				minHeight : "50vh" ,
				flexGrow : "1" ,
				overflow : "auto" ,
			}
		} ,
		pl.each
		(
			dm.items ,
			o => Item ( o.target )
		)
	);

	const Item = ( dm : JMAQuake.item ) => ef.div
	(
		{
			style :
			{}
		},
		dm.cod
	) ;
}
