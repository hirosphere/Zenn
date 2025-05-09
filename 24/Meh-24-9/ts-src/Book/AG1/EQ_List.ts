import { leaf , ksel , Order , ef , pl , defs , log } from "../../meh/index.js" ;
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
	const content_sel = ksel ( 0 ) ;
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
		{ class : "FV PPP" , style : { background : "hsl( 90, 55%, 55% )" } } ,

		pl.switch ( content_sel.current , key => contents [ key ] ) ,
		
		ef.section
		(
			{ class : "BS FH JC AS PPP" } ,
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
				class : "OA FV PPP" ,
				style :
				{
					background : "hsl( 50  3%  75% )" ,
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
					gap : "1px" ,
				}
			} ,

			fieldset
			(
				"0" ,
				field (  ( o.count.value ) , 5 , true , true ) ,
			) ,

			fieldset
			(
				"1" ,
				field (  i.地域 , 22 , false , true ) ,
				field (  new Date ( i.時刻 ) .toLocaleString () , 23 ) ,
				field (  i.規模 , 6 , true ) ,
				field ( i.地点?.x , 7 , true ) ,
				field ( i.地点?.y , 7 , true ) ,
				field ( i.地点?.h , 10 , true ) ,
			) ,
		) ;
	}

	const fieldset = ( flexGrow : string , ... content : defs.parts ) => ef.span
	(
		{
			class : "FH WRAP AS" ,
			style :
			{
				flexGrow ,
				gap : "1px" ,
			}
		} ,
		... content
	) ;
	
	const field = ( t : string | number | undefined , width : number , center ? : boolean , bold ? : boolean ) => ef.span
	(
		{
			style :
			{
				flexGrow : "1" ,

				display : "flex" ,
				alignItems : "center" ,
				background : "hsl( 0, 0%, 100% )" ,
				width : `${ width }ex` ,
				padding : "0.4ex 0.8ex" ,
				wordBreak : "keep-all" ,
				justifyContent : center ? "center" : "" ,
				fontWeight : bold ? "bold" : "" ,
			}
		} ,
		t
	) ;		
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

		const rotate = geo_x * 10 ;

		log ( rotate ) ;


		return ef.span
		(
			{
				style :
				{
					position : "absolute" ,left , top ,
					cursor : "default" ,
					transform : `scale( ${ dm.規模 } ) rotate( ${ rotate }deg )` ,
					color : `oklch( 0.6 0.5 ${ hue } / 0.20 )` ,
					fontSize : "3.0em" ,
					// fontSize : "6.0em" ,
				} ,
				attrs :
				{
					title : `${ dm.地域 } M${ dm.規模 } ${ dm.地点?.y } ${ new Date ( dm.時刻 ) .toLocaleString () }`
				}
			} ,
			"☆" ,
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
