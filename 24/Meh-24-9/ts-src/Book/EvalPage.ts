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

		execute ()
		{
			this.current.value.execute () ;
		}
	}

	export class Item
	{
		code = leaf ( sample ) ;
		output = leaf ( "" ) ;
		input = leaf ( "" ) ;
		e ? : Element ;

		constructor ( public title : string )
		{}

		execute ()
		{
			const input = this.input.value ;
			const e = this.e ;

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
			{ class : "EVAL_PAGE_BAR" } ,
			"Eval " , vm.current .value .title ,
			ef.button
			(
				{ acts : { click : () => vm.execute () } } ,
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
			ef.textarea ( { class : "EVAL_CODE" , binds : { value_input : vm.code } } ) ,
			ef.textarea ( { class : "EVAL_OUTPUT" , binds : { value_input : vm.output } } ) ,
			ef.textarea ( { class : "EVAL_INPUT" , binds : { value_input : vm.input }  } ) ,
		) ,
		ef.section ( { class : "EVAL_DISPLAY" , hook : { init ( el ) { vm.e = el ; } } } ) ,
	)
}

const sample =
`Math.random () * Math.pow ( 10 , 10 )`;
