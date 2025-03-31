import { leaf , Renn , ef , pl , dom } from "../meh/index.js" ;



export const EvalPage = () =>
{
	const tab_current = leaf ( 2 ) ;

	return ef.main
	(
		{ class : "EVAL_PAGE" } ,
		ef.p ( "Eval " , tab_current ) ,
		pl.switch
		(
			tab_current ,
			cur => Eval ( cur ) ,
		) ,
	)
}

const Eval = ( num : number ) =>
{
	return ef.section
	(
		{ class : "EVAL" } ,
		ef.section
		(
			{ class : "EVAL_EDIT" } ,
			ef.textarea ( { class : "EVAL_CODE" , binds : {  } , props : { value : sample } } ) ,
			ef.textarea ( { class : "EVAL_OUTPUT" , binds : {  } } ) ,
			ef.textarea ( { class : "EVAL_INPUT" , binds : {  } } ) ,
		) ,
		ef.section ( { class : "EVAL_DISPLAY" , binds : {  } } ) ,
	)
}

const sample =

`	const book_def : navi.t.index =
	{
		name : "" , title : "Meh Root" ,
		parts :
		[
			{ type : "links" , name : "Links" ,  } ,
			{ type : "eval" , name : "Eval" , title : "Eval" } ,
			{ type : "ui-g" , name : "UI" , title : "UI ギャラリー" ,
				parts :
				[
					{ name : "Slide" } ,
					{ name : "HSL" } ,
					{ name : "OKLCH" } ,
					{ name : "Tabs" } ,
				]
			} ,
			{ type : "rail" , name : "Rail" , title : "列車運転" } ,
			{ name : "Tree" , title : "ツリーテスト" , parts : make_part_tree ( 3 ) } ,
			{ type : "h-rails" , name : "H-Rail" , title : "Heart Rails",
				parts :
				[
					{ name : "北海道・東北" , title : "北海道・東北" } ,
					{ name : "関東" , title : "関東" } ,
					{ name : "東海" , title : "東海" } ,
				]
			} ,
		] ,
	} ;
` ;
