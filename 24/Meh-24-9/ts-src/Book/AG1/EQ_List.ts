import { leaf , ksel , Order , ef , dom , pl , defs , log , df } from "../../meh/index.js" ;
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

		pl.switch
		(
			content_sel.current ,
			key =>
			{ 
				return contents [ key ?? 0 ]
			}
		) ,	

		ef.section
		(
			{ class : "BS FH JC AS PPX" } ,
			ef.button ( { action : { click : () => dm.list.update () } } , "Load" ) ,
			// ef.button ( { action : { click () { beep.quest () ; } } } , "BEEP" ) ,
			Tabs.Tabs ( content_sel , [ "グラフ" , "リスト" ] ) ,
			ef.p ( { class : "FH AC BH PPP" , style : { width : "16em" } } , cur_info ) ,
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
		const date = new Date ( i.時刻 ) ;
	
		return ef.li
		(
			{
				class : "FH AS" ,
				style :
				{
					borderRadius : "0.1ex" ,
					padding : "0ex" ,
					gap : "1px" ,
				}
			} ,

			ef.span
			(
				{ class : "BH FH JC AC FW_Bold" , style : { width : "3em" , flexShrink : "0.2" } } ,
				o.count
			) ,

			ef.span
			(
				{ class : "FH WRAP AS" , style : { gap : "1px" , flexGrow : "1" } } ,
				cols
				(
					{ flexGrow : "1" , maxWidth : "110ex" , } ,
					col ( i.地域 , { width : "16ex" , justifyContent : "center" , fontWeight : "bold" } ) ,
					col ( "M" + i.規模 , { width : "6ex" } ) ,
					col ( df ( "YY/MM/DD" , date ) , { width : "12ex" , flexGrow : "0.3" , fontWeight : "normal" } ) ,
					col ( df ( "hh:mm:ss" , date ) , { width : "9ex" , flexGrow : "0.3" , fontWeight : "normal" } ) ,
				) ,
				cols
				(
					{ flexGrow : "1" , maxWidth : "60ex" } ,
					col ( i.地点 ?.x ?.toFixed ( 1 ) , { width : "5ex" } ) ,
					col ( i.地点 ?.y ?.toFixed ( 1 ) , { width : "5ex" } ) ,
					col ( i.地点 ?.h , { width : "7ex" } ) ,
				) ,
				col ( `` , { flexGrow : "4" } ) ,
				// col ( `${ i.s.ser } ${ i.s.eid } ${ i.s.rdt }` , { flexGrow : "5" } ) ,
			) ,
		) ;
	}

	const cols = ( style : dom.defs.style , ... items : dom.MehElement [] ) : dom.MehElement =>
	{
		return ef.span
		(
			{
				class : "FH AS" ,
				style :
				{
					height : "1.85em" ,
					gap : "1px" ,
					... style ,
				}
			} ,
			... items ,
		) ;
	}

	const col = ( text : string | number | undefined , p : dom.defs.style ) : dom.MehElement =>
	{
		return ef.span
		(
			{
				class : "BH FH JC AC" ,
				style :
				{
					paddingInline : "0.76ex" ,
					flexGrow : "1" ,
					whiteSpace : "nowrap" ,
					... p
				}
			} ,
			text ,
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
				backgroundColor : "oklch( 100%  0%  300 )" ,
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
			+ ( geo_x * 20 )
		
		) + "px" ;
		
		const top =
		(
			( 100 + ( ( dm.相対時刻 + ( 9 / 24 ) ) % 1 )  * 300 )
			+ ( geo_y * 20 )
			
		) + "px" ;
		

		const yms = ( 365 * 24 * 3600 * 1000 ) ;
		const year_hue = new Date () .getTime () % yms / yms * 360 ;

		const hue =
		(
			120 + dm.相対時刻 % 30 / 30 * 360 +
			year_hue
		) ;

		// const rotate = ( ( dm.地点?.x ?? 135 ) - 135 ) / 50 * 500 ;

		const scale = ( ( + dm.規模 / 6 ) ** 2.0 ) * 7 ;
		const rotate = ( dm.相対時刻 % 1 ) * 72 ;

		return ef.span
		(
			{
				style :
				{
					position : "absolute" , left , top ,
					cursor : "default" ,
					transform : `scale( ${ scale } ) rotate( ${ rotate }deg )` ,
					color : `oklch( 0.6 0.5 ${ hue } / 0.20 )` ,
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
				aa :
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
