import { Live , ef , pl , DD , DOM as dom , df , log } from "../Meh/Meh.js" ;
import * as BookBase from "./BookBase.js" ;
import * as AG_0 from "./AG_0/AG_0.js" ;
import * as AG_1 from "./AG_1/AG_1.js" ;
import * as IndexQst from "./IndexQst.js" ; ;

/* Data Models */

/* View Models */

namespace VM
{
	const index : BookBase.VM.index =
	{
		type : "Root" ,
		title : "Meh Book" ,
		open : true ,
		parts :
		{
			"Eval" : { type : "Eval" , title : "Eval" } ,
			"AG_1" :
			{
				title : "AG 1" ,
				open : true ,
				parts :
				{
					"JMA_EQ" : { type : "JMA_EQ" , title : "地震リスト" } ,
					"Eki" : { type : "Eki_Q1" , title : "駅名表示" } ,
					"Treem" : { type : "Treem" , title : "Extreem" } ,
					"Todo" : { type : "Todo" , title : "Todo" } ,
					// "Tonne" : { type : "Tonne" , title : "Tonne" } ,
					"Dyndex" : IndexQst.Dyndex ,
					// "Tree" : { type : "Tree" , title : "Tree" , open : false , parts : tree ( "Tree" , 3 ) } ,
					// "Arbre" : { type : "Tree" , title : "Arbre" , open : false , parts : tree ( "Arbre" , 4 ) } ,
				} ,
			} ,
			// "Baum" : { type : "Tree" , title : "Baum" , open : false , parts : tree ( "Baum" , 5 ) } ,
		}
	}

	function tree ( title : string , limit : number , path : string = "" , depth : number = 0 ) : BookBase.VM.index [ "parts" ]
	{
		if ( ++ depth > limit )  return ;

		const rt : BookBase.VM.index [ "parts" ] = {} ;
		path += ( path && "" || "" ) ;

		for ( let nom = 1 ; nom <= 5 ; nom ++ )
		{
			rt [ "" + nom ] =
			{
				type : "Tree" ,
				title : title + " " + path + nom ,
				parts : tree ( title , limit , path + nom , depth )
			}
		}
		return rt ;
	}



	/*  VM.App  */

	export class App  implements BookBase.VM.NaviClient
	{
		public readonly navi = new BookBase.VM.Navi ( index , this ) ;
		public readonly navi_mode = Live < navi_mode > ( "NAVI_BLOCK" ) ;

		constructor ()
		{
			this.navi.initiate ( this.navi.root ) ;
		}

		toggleNaviMode ()
		{
			const s = this.navi_mode ;
			s.$ = s.$ == "NAVI_INLINE" ? "NAVI_BLOCK" : "NAVI_INLINE"
		}

		public async urlToIndex ( path_ : string , query : Record < string , string > ) : Promise < BookBase.VM.Index | undefined >
		{
			const root = this.navi.root ;
			const path = String ( query.path ) ;
			return root.from_path ( path.split ( "/" ) ) ;
		}

		public indexToURL ( index : BookBase.VM.Index ) : string
		{
			const path = index.path.map ( index => encodeURIComponent ( index.name.$ ) ) .slice ( 1 ) ;
			return `?path=${ path.join ( "/" ) }` ;
		}

		 public updateBrowserURL ( url : string ) : void
		{
			history.replaceState ( null , "" , url ) ;
		}
	}

	type url_query =
	{
		path : string ;
		type : string ;
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

	type types = { [ type : string ] : ( index : BookBase.VM.Index ) => DD.Node } ;

	const types : types =
	{
		"Root"    : index => AG_0.Root.VC.App () ,
		"Eval"    : index => AG_0.Eval.VC.EvalApp () ,
		"Dyndex"  : index => IndexQst.VC.Page ( index ) ,
		"Eki_Q1"  : index => AG_1.EkiApp ( "../../../" ) ,
		"Treem"   : index => AG_1.Extreem.VC.Applet () ,
		"Todo"    : index => AG_1.ToDo () ,
		"JMA_EQ"  : index => AG_1.JMA_EQ.VC.App () ,
		"Tonne"   : index => AG_1.Tonne.VC.App () ,
	}

	const ContentFrame = ( index : BookBase.VM.Index , types : types ) : DD.Node =>
	{
		return ef.div
		(
			{ class : [ "CONTENT_FRAME" , { CURRENT : index.selected } ] } ,

			types [ index.type ] ?. ( index )
			?? ef.main ( { class : "DEFAULT_CONTENT" } , ef.p ( index.title ) ) ,
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
				BookBase.VC.Index ( vm.navi.root ) ,
				ef.footer () ,
			) ,

			ef.section
			(
				{ class : "CLOCK" } ,
				Clock ( () => vm.toggleNaviMode () ) ,
			) ,
		) ;
	} ;

	const Clock = ( action : () => void ) : DD.Node =>
	{
		const ymd = Live ( "" ) ;
		const b = Live ( "" ) ;
		const hms = Live ( "" ) ;
		const ms = Live ( "" ) ;
		
		const update = () =>
		{
			const date = new Date () ;
			ymd.$ = df ( "YYYY.MM.DD" , date ) ;
			b.$ = df ( "(B)" , date ) ;
			hms.$ = df ( "hh:mm:ss" , date ) ;
			ms.$ = df ( "xxxx" , date ) ;
		}
		
		update () ;
		setInterval ( update , 1000 ) ;

		const click = ( ev : MouseEvent ) =>
		{
			action () ;
			ev.preventDefault () ;
		}

		return ef.button
		(
			{ class : "CLOCK_BUTTON" , active : { click } } ,
			ef.span ( ymd ) ,
			ef.span ( b ) ,
			ef.span ( hms ) ,
			// ef.span ( ms ) ,
		) ;
	}
}


dom.add ( VC.App () , "html" ) ;

