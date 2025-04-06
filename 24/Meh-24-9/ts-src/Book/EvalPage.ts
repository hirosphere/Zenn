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

		timer = new Timer ;

		constructor ( public title : string )
		{}

		execute ()
		{
			const input = this.input.value ;
			const e = this.e ;
			const timer = this.timer ;

			timer.action = () => {} ;

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

	class Timer
	{
		p_action ? : () => boolean | void ;
		iid = 0 ;

		set action ( action : () => boolean | void | undefined )
		{
			this.p_action = action ;
			
			if ( this.iid )
			{
				clearInterval ( this.iid ) ;
			}
			
			if ( action ) this.iid = setInterval ( action , 1000 ) ;
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
`const color = e.style.color = \`hsl( 0 , 0% , 0% , \${ 70 - Math.random() * 40 }% )\` ;
e.style.fontSize = \`\${ 50 + Math.random() * 0 }px\` ;
e.innerHTML = crypto.randomUUID () ;
`;
