import { Live , Renn , Key , DD , DOM , ef , pl } from "../../Meh/Meh.js" ;

const log = console.log ;
const ud = undefined ;
type ud = undefined ;

const times = < E > ( t : number , fn : ( i : number ) => E ) : E [] =>
{
	const rt : E [] = [] ;
	for ( let i = 0 ;  i < t ;  i ++ )  rt [ i ] = fn ( i ) ;
	return rt ;
}



/* */

export namespace DM
{
	type eval =
	{
		title : string ;
		code ? : string ;
	}

	export class Eval
	{
		public title = Live ( "Eval" ) ;

		public code = Live ( "" ) ;
		public output = Live ( "" ) ;
		public input = Live ( "" ) ;

		public display ? : HTMLElement ;

		constructor ( iv : eval )
		{
			this.title.$ = iv.title ;
			this.code.$ = iv.code ?? "" ;
		}

		public execute () : void
		{
			let input = this.input.$ ;
			let d = this.display ;

			try
			{
				this.output.$ = eval ( this.code.$ ) ;
			}
			catch ( exc )
			{
				this.output.$ = String ( exc ) ;
			}
		}
	}

	export type iExecute = { execute () : void ; }

	/* */

	export const samples =
	[
		"d.innerHTML = 'DISPLAY'" ,
		"4 * 9 / 7" ,
		"location" ,
		"[ 1 , 2 , 3 ] .map ( e => `* ${ e } *` )" ,
		"( 1 + Math.sqrt( 5 ) ) / 2" ,
	]
	.map ( ( code , i ) => new Eval ( { title : "Eval" + (1+i) , code } ) ) ;

}

export namespace VM
{
	export class App
	{
		public curr = new Key ( Live < DM.Eval | undefined > ( undefined ) ) ;
		public evals = new Renn < DM.Eval > ( DM.samples ) ;

		constructor ()
		{
			const evals = times ( 5 , i => new DM.Eval ( { title : "Eval " + (1+i) } ) ) ;

			this.curr.key.$ = this.evals.at ( 0 )?.target ;
		}
	}
}




export namespace VC
{
	const css = /* css */ `

	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ; }

	:host { height : 100% ; }

	*:focus
	{
		box-shadow : 0.2ex  0.2ex  0.3ex  hsl( 0  0%  60% ) ;
	}

	main
	{
		height : 100% ;
		background : white ;
		display : flex ;
		flex-direction : column ;
		padding : 1px ;
	}

	.BAR
	{
		display : flex ;
		padding : 0.4ex 0.4ex  0.09ex ;
		gap : 1.0ex ;
	}

	.BUTTON_PAD
	{
		display : flex ;
		justify-content : center ;
		align-items : center ;
	}

	.BUTTON_PAD  button
	{
		border-radius : 0.4ex ;
		width : calc( 4em + 4vw ) ;
		height : 2.2em ;
	}

	.TABS
	{
		border-bottom : 2px solid hsl( 0  0%  60% ) ;

		cursor : default ;
		display : flex ;
		overflow : auto ;
		scrollbar-width : none ;

		align-items : end ;
		list-style : none ;
		gap : 0.3ex ;
	}

	.TAB
	{
		border-radius : 1.0em  1.0em  0.1ex  0.1ex ;
		border : 1px solid hsl( 50  3%  55% ) ;
		border-bottom : 0.4ex solid  hsl( 345  6%  80% ) ;
		padding : 0.6ex  min( 1.6em , 3vw ) ;
		text-align : center ;
	}

	.TAB._SELECTED
	{
		border-bottom : 0.4ex  solid  hsl( 90  60%  45% ) ;
		background-color : hsl( 90  0%  96% ) ;
	}

	.EVALS
	{
		height : 100% ;
	}

	.EVAL
	{
		height : 100% ;
		display : none ;
		grid-template-columns : 65fr  35fr ;
		overflow : auto ;
	}

	.EVAL._SELECTED
	{
		display : grid ;
	}

	.EDIT
	{
		display : flex ;
		flex-direction : column ;
		gap : 2px ;
	}

	.EDIT textarea
	{
		flex-grow : 1 ;

		background :  hsl( 200  65%  40% );
		resize : vertical ;

		padding : 0.4ex ;
		font-family : Consolas , monospace ;
		font-size: 1.10rem ;
		color : hsl( 0  0%  100% ) ;

		tab-size : 4ex ;
	}

	.EDIT textarea::selection
	{
		background : hsl( 28  70%  70% ) ;
		color : hsl( 0  0%  10% ) ;
	}

	.DISPLAY
	{
		background : white ;

		display : flex ;
		flex-direction : column ;
		justify-content : center ;
		align-items : center ;
	}


	` ;



	/* */

	export const EvalApp = () : DD.Node =>
	{
		const app = new VM.App ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				ef.section
				(
					{ class : "BAR" } ,
					ef.section
					(
						{ class : "BUTTON_PAD" } ,
						Button ( "実行" , () => app.curr.key.$ ?.execute () ) ,
					) ,
					Tabs ( app ) ,
				) ,
				ef.section
				(
					{ class : "EVALS" } ,
					pl.key ( app.curr.key , ev => ev ? Eval ( ev , app.curr.match ( ev ) ) : ud ) ,
				) ,
			) ,
		) ;
	}

	const Button = ( text : string , click : () => void ) => ef.button ( { passive : { click } } , text ) ;

	const Eval = ( dm : DM.Eval , _SELECTED : Key.Match < DM.Eval | ud > ) : DD.Node =>
	{
		return ef.article
		(
			{ class : [ "EVAL" , { _SELECTED } ] } ,
			ef.section
			(
				{ class : "EDIT" } ,
				Editor ( dm.code , dm ) ,
				Editor ( dm.output , dm ) ,
				Editor ( dm.input , dm ) ,
			) ,
			ef.section
			(
				{ class : "DISPLAY" , hook : { init : el => dm.display = el } } ,
			) ,
		) ;
	}

	const Editor = ( text : Live.str , ex : DM.iExecute ) : DD.Node =>
	{
		const keydown = ( ev : KeyboardEvent ) =>
		{
			if ( ev.ctrlKey && ev.key == "Enter" )
			{
				ex.execute () ;
				ev.preventDefault () ;
			}

			else if ( ev.ctrlKey && ev.key == " " )
			{
				if ( ev.target instanceof HTMLTextAreaElement )
				{
					const el = ev.target ;
					const text = el.value ;
					const start = el.selectionStart ;
					const end = el.selectionEnd ;

					el.value =
					(
						text.substring ( 0 , start ) +
						"\t" +
						text.substring ( start )
					) ;

					el.selectionStart = start + 1 ; 
					el.selectionEnd = end + 1 ;
				}
			}
		} ;

		return ef.textarea
		(
			{ biBind : { vInp : text } , active : { keydown } } ,
		) ;
	}

	const Tabs = ( app : VM.App ) : DD.Node => ef.ul
	(
		{ class : "TABS" } ,
		pl.each ( app.evals , ev => Tab ( ev , app.curr.match ( ev ) ) ) ,
	) ;

	const Tab = ( ev : DM.Eval , _SELECTED : Key.Match < DM.Eval | ud > ) : DD.Node =>
	{
		const click = () => { _SELECTED.select () ; } ;
	
		return ef.li
		(
			{
				class : [ "TAB" , { _SELECTED } ] ,
				passive : { click }
			} ,
			ev.title ,
		) ;
	}
}


