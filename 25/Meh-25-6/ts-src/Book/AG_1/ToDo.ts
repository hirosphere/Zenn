import { Live , Ease , Renn , Order , ef , pl , DD , Focus , DOM } from "../../Meh/Meh.js" ;
import { Plain } from "../../Meh/Model/LiveState.js" ;

const log = console.log ;

namespace DM
{
	export type Applet = Ease < applet > ;
	export type TodoList = Ease < todo_list > ;
	export type TodoItem = Ease < todo_item > ;

	( app : Ease < applet > ) =>
	{
		app.$.title = "" ;
	}

	export type applet =
	{
		title : string ;
		lists : todo_list [] ;
	}

	export type todo_list =
	{
		title : string ;
		items : todo_item [] ;
	}

	export type todo_item =
	{
		title : string ;
		completed : boolean ;
	}

	export const sample_data : applet =
	{
		title : "やるべきリスト[]" ,
		lists :
		[
			{
				title : "Todo 日本史" ,
				items :
				[
					{ title : "倭国へ逃げる" , completed : true } ,
				]
			} ,
		]
	} ;
}

namespace VM
{
	const STORAGE_KEY = "TODO_25_09" ;

	export class Applet
	{
		doc : DM.Applet = Ease ( DM.sample_data ) ;

		windowSize = Live ( "" ) ;

		constructor ()
		{
			load
			(
				this.doc ,
				() => this.doc.add_ref ( { vChan : () => this.save () } )
			) ;

			updateWindowSize ( this.windowSize ) ;
			window.addEventListener ( "resize" , () => updateWindowSize ( this.windowSize ) ) ;
		}

		public save () : void
		{
			const json = JSON.stringify ( this.doc.$ ) ;

			log ( "save" , this.doc.$.lists.at ( 0 )?.items.at ( 0 )?.title ) ;
			
			localStorage.setItem ( STORAGE_KEY , json ) ;
		}
	}

	function load ( doc : DM.Applet , onsuccess : () => void ) : void
	{
		try
		{
			const json = localStorage.getItem ( STORAGE_KEY ) ;
			const val = JSON.parse ( json ?? "" ) as DM.applet ;	
			doc.$ = val ;
			onsuccess () ;
		}
		catch ( exc )
		{
			log ( "ロード・パースエラー" )
		}
	}


	export function newItem ( list : DM.TodoList )
	{
		list.items.insert
		(
			[ { title : "" , completed : false } ] ,
			0
		) ;
	}

	const updateWindowSize = ( s : Live < string > ) => s.$ = `${ window.innerWidth } , ${ window.innerHeight }` ;

	const randDone = ( list : DM.TodoList ) => list.items.renn.each
	(
		i => i.completed.$ = Math.random () > 0.8
	) ;
}


export namespace VC
{
	const css = /* css */ `
		
		:host
		{
			height : 100% ; overflow : auto ;
			background : white ;
		}

		* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

		.FR { display : flex ;  flex-direction : row ; }
		.FC { display : flex ;  flex-direction : column ; }
		.OA { overflow : auto ; }
		.AC { align-items : center ; }
		.PGMM { padding : 1em ;  gap : 1em ; }
		.PGMX { padding : 1em ;  gap : 1ex ; }
		.PGXX { padding : 1ex ;  gap : 1ex ; }


		ul { list-style : none ; }
		button { padding : 0.4ex 1em ; }
		input { padding : 0.5ex 0.8ex ; }

		.TODO_LIST { width : min( 100% , 36em ) ; }

		.TODO_ITEM
		{
			border-bottom : 1px solid hsl( 50  3%  100% ) ;
			background : hsl( 50  3%  85% ) ;

			display : grid ;
			grid-template-columns : auto 1fr auto ;
			gap : 1ex ;

			padding : 0.6ex 1em ;
			white-space : nowrap ;
		}

		.TODO_ITEM:hover { background : hsl( 50  3%  83% ) ; }

		.TODO_ITEM ._TEXT { overflow : hidden ; }
		.TODO_ITEM ._CB  { accent-color : hsl( 100  40%  40% ) ; }

		.EDITOR
		{

		}


		.JSON
		{
			width : min( 100% , 50em ) ;
			height : 30em ;
			padding : 1ex ;
			color : hsl ( 0  0%  10% ) ;
			font-family : courier ;
			tab-size : 4ex ;

			text-size-adjust : 100% ;
		}
	
	` ;

	export const Applet = () : DD.Node =>
	{
		const app = new VM.Applet ;

		return ef.div
		(
			{ shadow : css } ,

			ef.main
			(
				{ class : "FC PGXX AC OA" } ,
				ef.h1 ( app.doc.title ) ,
				ef.section
				(
					{ class : "FR PGXX" } ,
					ef.input ( { biBind : { vChan : app.doc.title } } ) ,
					ef.button ( { passive : { click () { app.save () ; } } } , "Save" ) ,
				) ,
				pl.each
				(
					app.doc.lists.renn ,
					p => TodoList ( p )
				) ,
				ef.textarea
				(
					{ class : "JSON" , props : { value : Live.trans_r ( app.doc , o => JSON.stringify ( o , null , "\t" ) ) } }

				) ,
				ef.p ( app.windowSize )
		)
		) ;
	}

	const TodoList = ( list : DM.TodoList ) : DD.Node => ef.article
	(
		{ class : "TODO_LIST FC PGXX" } ,

		ef.h2 ( list.title ) ,
		ef.input ( { biBind : { vChan : list.title } } ) ,
		Editor ( list ) ,
		ef.ul
		(
			pl.each
			(
				list.items.renn ,
				( p , o ) => TodoItem ( o )
			)
		) ,
	) ;

	const Editor = ( dm : DM.TodoList ) =>
	{
		return ef.section
		(
			ef.button ( { passive : { click () { VM.newItem ( dm ) } } } , "+" )
		)
	}

	const TodoItem = ( o : Order < DM.TodoItem > ) =>
	{
		const i = o.target ;
		return ef.li
		(
			{ class : "TODO_ITEM" } ,
			ef.input ( { class : "_CB" , attrs : { type : "checkbox" } , biBind : { chInp : i.completed } } ) ,
			ef.input ( { class : "_TEXT" , biBind : { vChan : i.title } } ) ,
			ef.button ( { passive : { click () { o.delete () ; } } } , "削除" ) ,
		) ;
	}

	/*  */

	export const main = () =>
	{
		DOM.add ( Applet () , "body" )
	}
}

export const ToDo = VC.Applet ;
