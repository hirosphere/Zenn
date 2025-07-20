import { leaf , Renn , ef , pl , dom , log } from "../../meh/index.js" ;
import { fontsets } from "../../meh/app/fontsets.js" ;
import { MehElement } from "../../meh/dom/meh-node.js";

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
			const output = this.output ;
			const e = this.e ;
			const timer = this.timer ;
			fontsets ;

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

	const arrand = ( ar : Array < any > ) => ar [ Math.floor ( Math.random () * ar.length ) ] ;

	const fixrand = ( frac : number , max : number , min = 0 ) => ( Math.random () * ( max - min ) + min ) .toFixed ( frac ) ;

}

export const EvalPage = () =>
{
	const vm = new VM.App ;

	return ef.main
	(
		{ class : "EVAL_PAGE BS" } ,
		ef.section
		(
			{ class : "EVAL_PAGE_BAR" } ,
			"Eval " , vm.current .value .title ,
			ef.button
			(
				{ action : { click : () => vm.execute () } } ,
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
			textarea ( "EVAL_CODE" , vm.code , vm ) ,
			textarea ( "EVAL_OUTPUT" , vm.output, vm ) ,
			textarea ( "EVAL_INPUT" , vm.input, vm ) ,
		) ,
		ef.section
		(
			{
				class : "EVAL_DISPLAY" ,
				hook : { init ( el ) { vm.e = el ; } }
			}
		) ,
	)
}

const textarea = ( classname : string , src : leaf.str , vm : VM.Item ) : MehElement =>
{
	const keydown = ( ev : KeyboardEvent ) : void =>
	{
		const e = ev.target ;

		if ( ! ( e instanceof HTMLTextAreaElement ) )  return ;

		if ( ev.ctrlKey && ev.key == "Enter" )
		{
			vm.execute () ;
		}

		else if ( ev.ctrlKey && ev.key == ";" )
		{
			const v = e.value ;
			const start = e.selectionStart ;
			const end = e.selectionEnd ;

			e.value = v.substring( 0 , start ) + "\t" + v.substring( end ) ;

			e.selectionStart = e.selectionEnd = start + 1 ;
		}

		else  return ;

		ev.preventDefault () ;
	}

	return ef.textarea
	(
		{
			class : classname ,
			binds : { value_input : src } ,
			aa : { keydown } ,
			props : { autocomplete : "off" }
		}
	) ;
}

( e : HTMLElement ) =>
{
	e.style instanceof CSSFontFaceRule ;

	e.style.fontWeight = "normal" ;
}

const sample =
`const fn = () =>
{
	const color = e.style.color = \`hsl( 0 , 0% , 0% , \${ fixrand ( 0 , 70 , 40 ) }% )\` ;
	const ff = e.style.fontFamily = arrand ( fontsets ) ;
	const sz = e.style.fontSize = \`\${ fixrand ( 0 , 72 , 9 ) }px\` ;
	const uuid = e.textContent = crypto.randomUUID () ;

	return { ff , sz , color , uuid } ;
}

JSON .stringify ( fn() , null , "\\t" ) ;
`;


const each = ( start : number , next : number , fn : ( i : number ) => any ) : any [] =>
{
	const rt : any [] = [] ;
	for ( let i = start ; i < next ; i ++ )  rt.push ( fn ( i ) ) ;
	return rt ;
}
