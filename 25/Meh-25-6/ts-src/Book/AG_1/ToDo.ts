import { Leaf , Live , Renn , Order , ef , pl , DD , Focus } from "../../Meh/Meh.js" ;

namespace DM
{
	export type Applet = Live < applet > ;
	export type TodoList = Live < todo_list > ;
	export type TodoItem = Live < todo_item > ;

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
					{ title : "財閥街をつくる" , completed : false } ,
					{ title : "官庁街をつくる" , completed : false } ,
					{ title : "石油を掘る" , completed : false } ,
					{ title : "ウランを掘る" , completed : false } ,
					{ title : "露天炭を掘る" , completed : false } ,
					{ title : "炭鉱を掘る" , completed : false } ,
					{ title : "銀座線を掘る" , completed : false } ,
				//	{ title : "丸の内線を掘る" , completed : false } ,
				//	{ title : "日比谷線を掘る" , completed : false } ,
				//	{ title : "千代田線を掘る" , completed : false } ,
				//	{ title : "有楽町線を掘る" , completed : false } ,
				]
			} ,
			{
				title : "「聴く」" ,
				items :
				[
					{ title : "わんこの肚鳴りを聴く" , completed : false } ,
					{ title : "ニャンコの足掻きを聴く" , completed : false } ,
					{ title : "ねずみのいびきを聴く" , completed : false } ,
					{ title : "牛の屁を聴く" , completed : false } ,
					{ title : "文鳥のゲップを聴く" , completed : false } ,
				]
			} ,
		]
	} ;
}

namespace VM
{
	export class Applet
	{
		doc : DM.Applet = Live ( DM.sample_data ) ;
		constructor ()
		{
			this.doc.lists.renn.each ( list => randDone ( list ) ) ;
		}
	}

	const randDone = ( list : DM.TodoList ) => list.items.renn.each
	(
		i => i.completed.$ = Math.random () > 0.8
	) ;
}


namespace VC
{
	const css = /* css */ `
		
		:host { height : 100% ; overflow : auto ; }

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
		}
	
	` ;

	export const Applet = () : DD.Node =>
	{
		const vm = new VM.Applet ;

		return ef.div
		(
			{ shadow : css } ,

			ef.main
			(
				{ class : "FC PGXX AC OA" } ,
				ef.h1 ( vm.doc.title ) ,
				pl.each
				(
					vm.doc.lists.renn ,
					o => TodoList ( o.target )
				) ,
				ef.textarea
				(
					{ class : "JSON" , props : { value : Leaf.transR( vm.doc , o => JSON.stringify ( o , null , "\t" ) ) } }
				) ,
		)
		) ;
	}

	const TodoList = ( dm : DM.TodoList ) : DD.Node => ef.article
	(
		{ class : "TODO_LIST FC PGXX" } ,

		ef.h2 ( dm.title ) ,
		Editor ( dm ) ,
		ef.ul
		(
			pl.each
			(
				dm.items.renn ,
				o => TodoItem ( o )
			)
		) ,
	) ;

	const Editor = ( dm : DM.TodoList ) =>
	{
		const title = Leaf ( "すべき何か" ) ;

		const submit = () =>
		{
			dm.items.insert ( [ { title : title.$ , completed : false } ] , 0 ) ;
			title.$ = "まだ何かしたい？" ;
		}

		return ef.form
		(
			{
				class : "EDITOR  FR PGXX" ,
				active : { submit : ev => { submit () ; ev.preventDefault () ; } }
			} ,
			ef.input ( { biBind : { vChan : title } } ) ,
			ef.button ( "新規作成" ) ,
		) ;
	}

	const TodoItem = ( o : Order < DM.TodoItem > ) =>
	{
		const d = o.target ;
		return ef.li
		(
			{ class : "TODO_ITEM" } ,
			ef.input ( { attrs : { type : "checkbox" } , biBind : { chInp : d.completed } } ) ,
			ef.span ( { class : "_TEXT" } , d.title ) ,
			ef.button ( { passive : { click () { o.delete () ; } } } , "削除" ) ,
		);
	}
}

export const ToDo = VC.Applet ;
