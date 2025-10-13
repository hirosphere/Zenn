import { Live , ef , pl , DD , DOM as dom , log } from "../Meh/Meh.js" ;
import * as BFW from "./BookFW.js" ;
import * as AG_1 from "./AG_1/AG_1.js" ;

/* Data Models */

/* View Models */

namespace VM
{
	const index : BFW.VM.index =
	{
		type : "" ,
		title : "Meh Book" ,
		open : true ,
		parts :
		{
			"Eki" : { type : "Eki_Q1" , title : "駅名表示" } ,
			"Treem" : { type : "Treem" , title : "Extreem" } ,
			"Todo" : { type : "Todo" , title : "Todo" } ,
			"Eval" : { type : "Eval" , title : "Eval" } ,
			"Tree" : { type : "Tree" , title : "Tree" , parts :
			{
				"Tree1" : { type : "Tree 1" , title : "Tree" } ,
				"Tree2" : { type : "Tree 2" , title : "Tree" } ,
				"Tree3" : { type : "Tree 3" , title : "Tree" } ,
			} }
		}
	}

	export class App
	{
		public readonly navi = new BFW.VM.Navi ( index ) ;
		public readonly navi_mode = Live < navi_mode > ( "NAVI_BLOCK" ) ;

		constructor ()
		{
			this.navi.page.key.$ = this.navi.root ;
		}

		toggleNaviMode ()
		{
			const s = this.navi_mode ;
			s.$ = s.$ == "NAVI_INLINE" ? "NAVI_BLOCK" : "NAVI_INLINE"
		}
	}

	type navi_mode = "NAVI_INLINE" | "NAVI_BLOCK" ;
}


/* View Components */

namespace VC
{
	export const App = () : DD.Node =>
	{
		const vm = new VM.App ;

		return ef.body
		(
			{ class : [ vm.navi_mode , "APP" ] , target : "body"  } ,
			NaviPane ( vm ) ,
			ef.div
			(
				{ class : "CONTENT_SWITCH" } ,
				pl.key
				(
					vm.navi.page.key ,
					index => index ? ContentFrame ( index , types ) : undefined
				)
			) ,
		) ;
	}

	/* Content */

	type types = { [ type : string ] : ( index : BFW.VM.Index ) => DD.Node } ;

	const types : types =
	{
		"Eki_Q1" : index =>  AG_1.EkiApp ( "../../../" ) ,
		"Treem" : index => AG_1.Extreem.VC.Applet () ,
		"Todo" : index => AG_1.ToDo ()
	}

	const ContentFrame = ( index : BFW.VM.Index , types : types ) : DD.Node =>
	{
		return ef.div
		(
			{ class : [ "CONTENT_FRAME" , { CURRENT : index.page } ] } ,

			types [ index.type ] ?. ( index ) ??
			
			ef.main ( { class : "DEFAULT_CONTENT" } , ef.p ( index.title ) ) ,
		) ;
	}

	/* Navi */

	const NaviPane = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI" } ,

			ef.section
			(
				{ class : "TREE" } ,
				BFW.VC.Index ( vm.navi.root ) ,
			) ,

			ef.section
			(
				Clock ( () => vm.toggleNaviMode () ) ,
			) ,
		) ;
	} ;

	const Command = ( title : Live.R < string > | string , click : () => void ) => ef.button
	(
		{ passive : { click } } ,
		title ,
	) ;

	const Clock = ( action : () => void ) : DD.Node =>
	{
		const time = Live ( "" ) ;
		
		setInterval ( () => time.$ = new Date ().toLocaleString () , 1000 ) ;

		const click = ( ev : MouseEvent ) =>
		{
			action () ;
			ev.preventDefault () ;
		}

		return ef.a
		(
			{ class : "CLOCK _LINK" , active : { click } , attrs : { href : "" } } ,
			time
		) ;
	}
}


dom.add ( VC.App () , "html" ) ;

