import { State , Leaf , leaf , Branch , Model as moh , ef , DD , DOM as dom , log } from "../Meh/Meh.js" ;
import { main as testMain } from "./Test.js" ;

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
		naviMode : "NAVI_MODE_HORIZ" ,
	}

	export class App extends Branch < app > ()
	{
		constructor ()
		{
			super ( app_iv ) ;
		}

		t1 = clock ( 1000 ) ;
		t2 = clock ( 1010 ) ;
		t3 = clock ( 1020 ) ;

		toggleNaviMode ()
		{
			const s = this.naviMode ;
			s.$ = s.$ == "NAVI_MODE_VERT" ? "NAVI_MODE_HORIZ" : "NAVI_MODE_VERT"
		}
	}

	const clock = ( tempo : number = 1000 ) =>
	{
		const st = leaf ( 0 ) ;
		setInterval ( () => st.$ ++ , tempo ) ;
		return st ;
	}

	export type app =
	{
		title : string ;
		naviMode : navi_mode ;
	}

	type navi_mode = "NAVI_MODE_HORIZ" | "NAVI_MODE_VERT" ;
}


/* View Components */

namespace VC
{
	export const App = () : DD.Node =>
	{
		const vm = new VM.App ;

		return ef.body
		(
			{ class : vm.naviMode , target : "body"  } ,
			HorizNavi ( vm ) ,
			VertzNaviTop ( vm ) ,
			ef.main
			(
				ef.h1 ( vm.title ) ,
				ef.p ( vm.t1 , ) ,
				ef.p ( vm.t2 , ) ,
				ef.p ( vm.t3 , ) ,
				ef.section
				(
					{ class : "NMI" } ,
					ef.button ( { passive : { click : () => vm.toggleNaviMode () } } , vm.naviMode ) ,
				) ,
			) ,
			VertzNaviBottom ( vm ) ,
		) ;
	}

	const HorizNavi = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI HORIZ_NAVI" } ,
			ef.p ( "Horiz Navi" ) ,
		) ;
	} ;

	const VertzNaviTop = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI VERT_NAVI_TOP" } ,
			ef.p ( "Vert Top" ) ,
		) ;
	} ;

	const VertzNaviBottom = ( vm : VM.App ) : DD.Node =>
	{
		return ef.nav
		(
			{ class : "NAVI VERT_NAVI_BOTTOM" } ,
			ef.p ( "Vert Bottom" ) ,
		) ;
	} ;
}


dom.add ( VC.App () , "html" ) ;

