import { Live , ef , pl , DD , DOM as dom , log } from "../Meh/Meh.js" ;
import * as Navi from "./Navi.js" ;
import * as AG_1 from "./AG_1/AG_1.js" ;

/* Data Models */

/* View Models */

namespace VM
{
	const index : Navi.VM.index =
	{
		type : "" ,
		title : "Meh Book" ,
		parts :
		{
			"Eki" : { type : "Eki-Q1" , title : "駅名表示" } ,
			"Treem" : { type : "Treem" , title : "Extreem" } ,
			"Todo" : { type : "Todo" , title : "Todo" } ,
			"Eval" : { type : "Eval" , title : "Eval" } ,
		}
	}

	export class App
	{
		public readonly navi = new Navi.VM.Navi ( index ) ;
		public readonly navi_mode = Live < navi_mode > ( "NAVI_MODE_COL" ) ;

		constructor ()
		{
			this.navi.page.key.$ = this.navi.root ;
		}

		toggleNaviMode ()
		{
			const s = this.navi_mode ;
			s.$ = s.$ == "NAVI_MODE_ROW" ? "NAVI_MODE_COL" : "NAVI_MODE_ROW"
		}
	}

	type navi_mode = "NAVI_MODE_ROW" | "NAVI_MODE_COL" ;
}


/* View Components */

namespace VC
{
	export const App = () : DD.Node =>
	{
		const vm = new VM.App ;

		return ef.body
		(
			{ class : vm.navi_mode , target : "body"  } ,
			NaviPane ( vm ) ,
			AG_1.EkiApp ( "../../../" ) ,
			// AG_1.Extreem.VC.Applet () ,
			// AG_1.Extreem_2.VC.Applet () ,
			// AG_1.ToDo () ,
			// AG_1.OrderQ1 () ,
		) ;
	}

	const NaviPane = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI" } ,

			ef.section
			(
				{ class : "PEER_NAVI_SWITCH" } ,
				
				Navi.VC.PeerNavi ( vm.navi.root ) ,
			) ,

			ef.section
			(
				Command ( "*" , () => vm.toggleNaviMode () ) ,
			) ,
		) ;
	} ;

	const Command = ( title : Live.R < string > | string , click : () => void ) => ef.button
	(
		{ passive : { click } } ,
		title ,
	) ;
}


dom.add ( VC.App () , "html" ) ;

