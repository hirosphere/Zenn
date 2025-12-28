import { Life , Live , Renn , Ease , Key , Store , DOM , DD , ef , pl , log } from "../../Meh/Meh.js" ;
import { life_add_ref } from "../../Meh/Model/Life.js";
import * as common from "./common.js" ;

log ( "Alt1App" ) ;


namespace VM
{
	export class App
	{
		public navi_mode : Live.R < navi_mode > ;
		public counter_font : Live.R.str ;

		ss : Ease < app > ;

		constructor ()
		{
			this.ss = new Store.Session ( "NAV_DEV_MAIN" , app ).value ;
			this.navi_mode = Live.trans_r ( this.ss.navi_mode_i , i => navi_mode [ i ] ) ;
			this.counter_font = Live.trans_r ( this.ss.counter_font_i , i => fonts [ i ] ?? "" ) ;
		}

		public toggle_nm () : void
		{
			const s = this.ss.navi_mode_i ;
			s.$ = ( s.$ + 1 ) >= navi_mode.length ? 0 : s.$ + 1 ;
		}
	}

	class app
	{
		navi_mode_i : number ;

		counter_font_i : number ;

		counters : counter [] ;

		constructor ( i ? : Ease.dp < app > )
		{
			this.navi_mode_i = i ?.navi_mode_i ?? 0 ;
			this.counter_font_i = i ?.counter_font_i ?? 0 ;
			this.counters = i ?.counters ?.map ( i => new counter ( i ) ) ??
			[ 100 , 200 , 300 ] .map ( v => new counter ( { title : "カウンター" , value : v } ) ) ;
		}
	}

	const navi_mode = [ "NM_BLOCK" , "MN_INLINE" ] ;
	type navi_mode = typeof navi_mode [ number ] ;

	export type Counter = Ease < counter > ;

	class counter
	{
		title : string ;
		value : number ;

		constructor ( i ? : Ease.dp < counter > )
		{
			this.title = i ?.title ?? "カウンタ" ;
			this.value = i ?.value ?? 100 ;
		}
	}

	export const fonts =
	[
		"" ,
		"'Courier New', Courier, monospace" ,
		"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" ,
		"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" ,
		"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" ,
		"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" ,
		"'Times New Roman', Times, serif" ,
		"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" ,
		"Arial, Helvetica, sans-serif" ,
		"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" ,
		"Georgia, 'Times New Roman', Times, serif" ,
		"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" ,
		"Verdana, Geneva, Tahoma, sans-serif" ,
		"cursive" ,
		"fantasy" ,
		"monospace" ,
		"sans-serif" ,
		"serif" ,
		"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" ,
	] ;
}

namespace VC
{
	export const App = () : DD.Mel =>
	{
		const app = new VM.App ;

		return ef.div
		(
			{
				shadow : [ common.css , css ] ,
			} ,
			ef.main
			(
				{ class : "FC PM GM" } ,
				ef.h1( "Nav dev " ) ,
				ef.p ( new Date ().toLocaleString () ) ,
				ef.section
				(
					{ class : "FR GX JC AC" } ,
					 ef.button ( { passive : { click : () => app.toggle_nm () } } , app.navi_mode ) ,
					ef.p ( app.ss.navi_mode_i ) ,
				) ,
				FontSelector ( app.ss.counter_font_i ) ,
				ef.p ( { style : { height : "5em" } } , app.counter_font ) ,
				pl.each ( app.ss.counters.renn , m => Counter ( m , app.counter_font ) ) ,
			) ,
		) ;
	}

	const FontSelector = ( cur : Live.num ) : DD.Mel =>
	{
		const select = ef.select
		(
			{
				hook :
				{
					init ( el )
					{
						Live.add_ref ( cur , { vChan : () => el.selectedIndex = cur.$ } ) ;
						el.oninput = () => cur.$ = el.selectedIndex ;
					}
				} ,
			} ,
			... VM.fonts.map
			(
				v => ef.option ( v )
			)
		) ;

		return ef.label ( { class : "FR GX  FONT_SEL" } , select , "" , cur ) ;
	}

	const Counter = ( mo : VM.Counter , font : Live.R.str ) =>
	{
		return ef.section
		(
			{ class : "FR GX JC AC  CONTER" , style : { fontFamily : font } } ,
			ef.button ( { passive : { click : () => mo.value.$ -= 1 , } } , "-1" ) ,
			ef.button ( { passive : { click : () => mo.value.$ += 1 , } } , "+1" ) ,
			ef.span( { style : { fontSize : "3em" } } , mo.value ) ,
		) ;
	}

	/* css */

	const css = /* css */ `
	
	* { color : hsl( 0  0%  30% ) ; }

	main
	{
		text-align : center ;
	}

	button
	{
		min-width : 4em ;
		padding : 1.2ex 1.2em ;
	}

	.CONTER
	{
		height : 5rem ;
	}

	.FONT_SEL
	{
	}

	.FONT_SEL select
	{
		max-width : 80vw ;
		font-size : 1.3em ;  color : hsl( 0  0%  10% ) ;
	}
	
	` ;
}

export const main = ( ce : string ) =>
{
	DOM.add ( VC.App () , ce ) ;
} ;
