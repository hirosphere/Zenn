import { leaf , ksel , Order , ef , pl , defs , log } from "../../meh/index.js" ;
import * as JMAQuake from "../data-api/jma-quake.js" ;
import { beep } from "../lib/beep.js" ;

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

	dm.list.update () ;

	const contents =
	[
		Graph.Main ( dm.list ) ,
		List.Main ( dm.list ) ,
	] ;

	return ef.main
	(
		{ class : "FV PPP" , style : { background : "hsl( 205, 70%, 75% )" } } ,

		pl.switch ( content_sel.current , key => contents [ key ] ) ,
		
		ef.section
		(
			{ class : "BS FH PPP JC" } ,
			ef.button ( { acts : { click : () => dm.list.update () } } , "Load" ) ,

			Tabs.Tabs ( content_sel , [ "グラフ" , "リスト" ] ) ,
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
				field (  i.地域 , 22 ) ,
				field (  new Date ( i.時刻 ) .toLocaleString () , 23 ) ,
				field (  i.規模 , 6 , true ) ,
				field ( i.地点?.x , 7 , true ) ,
				field ( i.地点?.y , 7 , true ) ,
				field ( i.地点?.h , 10 , true ) ,
				// field ( i.at ) ,
				// field ( new Date ( i.rdt ) .toLocaleString () , 22 ) ,
			) ;
		}
		
		const field = ( t : string | number | undefined , width : number , center ? : boolean , bold ? : boolean ) => ef.span
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
		// const left = ( ( dm.地点?.x ?? 20 ) - 20 ) * 10 + "px" ;
		// const top = ( - ( dm.地点?.y ?? 0 ) + 50 ) * 10 + "px" ;

		const left = 100 + ( dm.相対時刻 ) * 400 + "px" ;
		
		const top = 100 + ( dm.相対時刻 % 1 )  * 400  + "px" ;
		
		// const top = 400 - ( 20 - ( dm.地点?.y ?? 20 ) )  * 1  + "px" ;

		// const hue = 120 + ( ( dm.地点?.x ?? 110 ) - 110 ) * 0.5 ;

		const hue = 120 + dm.相対時刻 % 30 / 30 * 360 ;

		log ( { top , left } )

		return ef.span
		(
			{
				style :
				{
					position : "absolute" ,left , top ,
					cursor : "default" ,
					transform : `scale( ${ dm.規模 } )` ,
					color : `oklch( 0.6 0.5 ${ hue } / 0.1 )` ,
					fontSize : "6.0em" ,
				} ,
				attrs :
				{
					title : `${ dm.地域 } M${ dm.規模 } ${ dm.地点?.y } ${ new Date ( dm.時刻 ) .toLocaleString () }`
				}
			} ,
			"●" ,
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
