import { Leaf , Live , Model as moh , ef , DD , DOM as dom , log } from "../Meh/Meh.js" ;
import { main as testMain } from "./Test.js" ;
import * as AG_1 from "./AG_1/AG_1.js" ;

/* Data Models */

testMain () ;

namespace DM
{
	moh ;
}


/* View Models */

namespace VM
{

	const app_iv : app =
	{
		title : "Meh-25 Book" ,
		naviMode : "LM_HORIZ" ,
	}

	export class App
	{
		doc = Live ( app_iv ) ;

		constructor ()
		{
		}

		t1 = clock ( 1000 ) ;
		t2 = clock ( 1010 ) ;
		t3 = clock ( 1020 ) ;

		toggleNaviMode ()
		{
			const s = this.doc.naviMode ;
			s.$ = s.$ == "LM_HORIZ" ? "LM_VERT" : "LM_HORIZ"
		}
	}

	const clock = ( tempo : number = 1000 ) =>
	{
		const st = Leaf ( 0 ) ;
		setInterval ( () => st.$ ++ , tempo ) ;
		return st ;
	}

	export type app =
	{
		title : string ;
		naviMode : layout_mode ;
	}

	type layout_mode = "LM_HORIZ" | "LM_VERT" ;
}


/* View Components */

namespace VC
{
	export const App = () : DD.Node =>
	{
		const vm = new VM.App ;

		return ef.body
		(
			{ class : vm.doc.naviMode , target : "body"  } ,
			Navi ( vm ) ,
			// AG_1.Extreem.VC.Applet () ,
			AG_1.Extreem_2.VC.Applet () ,
			// AG_1.ToDo () ,
			// AG_1.OrderQ1 () ,
		) ;
	}

	( vm : VM.App ) => ef.main
	(
		ef.h1 ( vm.doc.title ) ,
		ef.p ( vm.t1 , ) ,
		ef.p ( vm.t2 , ) ,
		ef.p ( vm.t3 , ) ,
	) ;


	const Navi = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI" } ,
			ef.section
			(
				ef.p ( "Horiz Navi" ) ,
			) ,
			ef.section
			(
				Command ( vm.doc.naviMode , () => vm.toggleNaviMode () ) ,
			) ,
		) ;
	} ;

	const Command = ( title : Leaf.LL < string > , click : () => void ) => ef.button
	(
		{ passive : { click } } ,
		title ,
	) ;
}


dom.add ( VC.App () , "html" ) ;

