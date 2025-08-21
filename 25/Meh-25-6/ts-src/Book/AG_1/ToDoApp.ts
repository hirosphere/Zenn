import { Leaf , Compo as Live , Renn , Order , ef , pl , DD } from "../../Meh/Meh.js" ;

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
					{ title : "石油を掘る" , completed : false } ,
					{ title : "ウランを掘る" , completed : false } ,
					{ title : "露天炭を掘る" , completed : false } ,
					{ title : "炭鉱を掘る" , completed : false } ,
					{ title : "銀座線を掘る" , completed : false } ,
					{ title : "丸の内線を掘る" , completed : false } ,
					{ title : "日比谷線を掘る" , completed : false } ,
					{ title : "千代田線を掘る" , completed : false } ,
					{ title : "有楽町線を掘る" , completed : false } ,
					{ title : "財閥を掘る" , completed : false } ,
					{ title : "政策官庁を掘る" , completed : false } ,
				]
			} ,
			{
				title : "「聴く」" ,
				items :
				[
					{ title : "わんこの肚鳴りを聴く" , completed : false } ,
					{ title : "ニャンコの足を聴く" , completed : false } ,
					{ title : "ねずみのいびきを聴く" , completed : false } ,
					{ title : "牛の屁を聴く" , completed : false } ,
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
		d = Live ( DM.sample_data ) ;
	}
}


namespace VC
{
	const css = /* css */ `
		
		* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

		.FR { display : flex ;  flex-direction : row ; }
		.FC { display : flex ;  flex-direction : column ; }
		.AC { align-items : center ; }
		.PGMM { padding : 1em ;  gap : 1em ; }
		.PGMX { padding : 1em ;  gap : 1ex ; }
		.PGXX { padding : 1ex ;  gap : 1ex ; }


		ul { list-style : none ; }

		.TODO_LIST { width : min( 25em 100% ) ; background : hsl( 210  90%  90% ) ; }
		.TODO_ITEM { display : grid ; grid-template-columns : 20em auto ; gap : 1ex ; }
	
	` ;

	export const Applet = () : DD.Node =>
	{
		const vm = new VM.Applet ;

		return ef.main
		(
			{ class : "FC PGMM AC" , shadow : css } ,
			ef.h1 ( vm.doc.title ) ,
			pl.each
			(
				vm.doc.lists.renn ,
				o => TodoList ( o.target )
			) ,
		) ;
	}

	const TodoList = ( dm : DM.TodoList ) : DD.Node => ef.article
	(
		{ class : "TODO_LIST FC PGXX" } ,

		ef.h2 ( dm.title ) ,
		ef.ul
		(
			pl.each
			(
				dm.items.renn ,
				o => TodoItem ( o )
			)
		) ,
	) ;

	const TodoItem = ( o : Order < DM.TodoItem > ) =>
	{
		const d = o.target ;
		return ef.li
		(
			{ class : "TODO_ITEM" } ,
			ef.span ( { class : "_TEXT" } , d.title ) ,
			ef.input ( { attrs : { type : "checkbox" } , biBind : { chInp : d.completed } } ) ,
		);
	}
}

export const ToDo = VC.Applet ;
