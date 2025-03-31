import { leaf , Renn , ef , pl , dom , log } from "../meh/index.js" ;


namespace VM
{
	export class App
	{
		current  : leaf < Item > ;
		items = new Renn < Item >
		(
			Array( 8 ) .fill ( null ) .map ( ( i , n ) => new Item ( "Pad" + ( n + 1 ) ) )
		) ;

		constructor ()
		{
			this.current = leaf ( this .items .orders [ 0 ] .target ) ;
		}

		eval ()
		{
			log ( this.current.value.code.value )
		}
	}

	export class Item
	{
		code = leaf ( sample ) ;
		output = leaf ( "" ) ;
		input = leaf ( "" ) ;

		constructor ( public title : string )
		{}

		execute ()
		{
			try
			{
				this.output.value = eval ( this.code.value ) ;
			}
			catch ( err )
			{
				this.output.value = String ( err ) ;
			}
		}
	}
}

export const EvalPage = () =>
{
	const vm = new VM.App ;

	return ef.main
	(
		{ class : "EVAL_PAGE" } ,
		ef.section
		(
			"Eval " , vm.current .value .title ,
			ef.button
			(
				{ acts : { click : () => vm.eval () } } ,
				"Eval"
			)
		) ,
		pl.switch
		(
			vm.current ,
			cur => Eval ( cur ) ,
		) ,
	)
}

const Eval = ( vm : VM.Item ) =>
{
	return ef.section
	(
		{ class : "EVAL" } ,
		ef.section
		(
			{ class : "EVAL_EDIT" } ,
			ef.textarea ( { class : "EVAL_CODE" , binds : { value_change : vm.code } } ) ,
			ef.textarea ( { class : "EVAL_OUTPUT" , binds : {  } , props : { value : vm.output } } ) ,
			ef.textarea ( { class : "EVAL_INPUT" , binds : {  } , props : { value : vm.input } } ) ,
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
