import { leaf , ksel , Order , ef , pl , defs , log , df } from "../../meh/index.js" ;
import * as JMAQuake from "../data-api/jma-quake.js" ;
import { Beep } from "../lib/beep.js" ;

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
	const content_sel = ksel ( 1 ) ;
	const item_sel = ksel < JMAQuake.item | undefined > ( undefined ) ;
	const cur_info = leaf ( "info" ) ;
	const beep = new Beep () ;

	dm.list.update () ;

	const contents =
	[
		Graph.Main ( dm.list ) ,
		List.Main ( dm.list ) ,
	] ;

	return ef.main
	(
		{ class : "FV PPP" } ,

		pl.switch ( content_sel.current , key => contents [ key ] ) ,
		
		ef.section
		(
			{ class : "BS FH JC AC PXP" } ,
			ef.button ( { acts : { click : () => dm.list.update () } } , "Load" ) ,
			ef.button ( { acts : { click () { beep.quest () ; } } } , "BEEP" ) ,
			Tabs.Tabs ( content_sel , [ "グラフ" , "リスト" ] ) ,
			ef.p ( { class : "FH AC BH PXX" , style : { width : "16em" } } , cur_info ) ,
		) ,
	)
}

namespace List
{
	export const Main = ( dm : JMAQuake.List ) =>
	{
		return ef.ul
		(
			{
				class : "BSS OA FV PPP" ,
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
				class : "FH" ,
				style :
				{
					borderRadius : "0.1ex" ,
					padding : "0ex" ,
					gap : "1px" ,
				}
			} ,

			ef.span
			(
				{ class : "BH FH JC AC FW_Bold" , style : { width : "4em" } } ,
				o.count
			) ,

			ef.span
			(
				{ class : "FH WRAP" , style : { gap : "1px" } } ,
				ef.span
				(
					{ class : "FH AS" , style : { gap : "1px" } } ,
					ef.span ( { class : "BH FW_Bold" , style : { width : "10em" , padding : "0.3ex 1ex" } } , i.地域 ) ,
					ef.span ( { class : "BH" , style : { width : "3em" , padding : "0 1ex" } } , i.規模 ) ,
					ef.span ( { class : "BH" , style : { width : "13ex" , padding : "" , textAlign : "center" } } , df ( "Y/MM/DD" , new Date ( i.時刻 ) ) ) ,
					ef.span ( { class : "BH" , style : { width : "8ex" , padding : "" , textAlign : "center" } } , df ( "hh:mm" , new Date ( i.時刻 ) ) ) ,
				) ,
				ef.span
				(
					{ class : "FH AS" , style : { gap : "1px" } } ,
					ef.span ( { class : "BH" , style : { width : "8ex" , textAlign : "center" } } , i.地点?.x ) ,
					ef.span ( { class : "BH" , style : { width : "8ex" , textAlign : "center" } } , i.地点?.y ) ,
					ef.span ( { class : "BH" , style : { width : "12ex" , textAlign : "center" } } , i.地点?.h , ) ,
				) ,
			) ,
		) ;
	}
}

namespace Graph
{
	export const Main = ( dm : JMAQuake.List ) => ef.section
	(
		{
			class : "BH OA FV PXP" ,
			style :
			{
				flexGrow : "1" ,
				width : "100%" ,
				position : "relative" ,
			}
		} ,
		pl.each
		(
			dm.items ,
			o => Item ( o.target )
		)
	);

	const Item = ( dm : JMAQuake.item ) =>
	{
		const geo_x = ( ( dm.地点?.x ?? 20 ) - 120 ) ;
		const geo_y = ( - ( dm.地点?.y ?? 0 ) + 50 ) ;

		const left =
		(
			( 100 + ( dm.相対時刻 ) * 250 )
			+ ( geo_x * 5 )
		
		) + "px" ;
		
		const top =
		(
			( 100 + ( dm.相対時刻 % 1 )  * 300 )
			+ ( geo_y * 5 )
			
		) + "px" ;
		

		const yms = ( 365 * 24 * 3600 * 1000 ) ;
		const year_hue = new Date () .getTime () % yms / yms * 360 ;

		const hue =
		(
			120 + dm.相対時刻 % 30 / 30 * 360 +
			year_hue
		) ;

		// const rotate = ( ( dm.地点?.x ?? 135 ) - 135 ) / 50 * 500 ;

		const rotate = ( dm.相対時刻 % 1 ) * 72 ;

		return ef.span
		(
			{
				style :
				{
					position : "absolute" , left , top ,
					cursor : "default" ,
					transform : `scale( ${ dm.規模 } ) rotate( ${ rotate }deg )` ,
					color : `oklch( 0.6 0.5 ${ hue } / 0.135 )` ,
					fontSize : "3.0em" ,
				} ,
				attrs :
				{
					title : `${ dm.地域 } M${ dm.規模 } ${ dm.地点?.y } ${ new Date ( dm.時刻 ) .toLocaleString () }`
				}
			} ,
			"★" ,
		) ;
	}
}

namespace Tabs
{
	export const Tabs = ( sel : ksel < number > , labels : string [] ) =>
	{
		return ef.ul
		(
			{ class : "TABS" } ,
			... labels.map
			(
				( label , key ) => Item ( label , sel.make_item ( key ) )
			) ,
		) ;
	}

	const Item = ( label : string , sel_item : ksel.Item < number > ) =>
	{
		return ef.li
		(
			{
				class : { SELECTED : sel_item } ,
				active_acts :
				{
					click ( ev )
					{
						sel_item.select () ;
					}
				}
			} ,
			label
		) ;
	}
}


namespace CSSQuest
{
	const ss = new CSSStyleSheet (  ) ;

	ss.insertRule ( ".fq43l { color : red }" )
}
