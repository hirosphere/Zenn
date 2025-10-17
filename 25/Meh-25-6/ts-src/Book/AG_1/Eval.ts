import { Live , Renn , Key , DD , ef , pl } from "../../Meh/Meh.js" ;

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
	}

	export class Eval
	{
		public title = Live ( "Eval" ) ;

		public code = Live ( "location" ) ;
		public output = Live ( "" ) ;
		public input = Live ( "" ) ;

		constructor ( iv : eval )
		{
			this.title.$ = iv.title ;
		}

		public execute () : void
		{
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
}

export namespace VM
{
	export class App
	{
		public curr = new Key ( Live < DM.Eval | undefined > ( undefined ) ) ;
		public evals : Renn < DM.Eval > ;

		constructor ()
		{
			const evals = times ( 5 , i => new DM.Eval ( { title : "Eval " + (1+i) } ) ) ;
			this.evals = new Renn ( evals ) ;

			this.curr.key.$ = this.evals.at ( 0 )?.target ;
		}
	}

	class Index
	{
		constructor
		(
			ev : DM.Eval ,
			key : Key < DM.Eval | ud >
		)
		{}
	}
}




export namespace VC
{
	const css = /* css */ `

	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ; }

	:host { height : 100% ; }

	main
	{
		height : 100% ;
		display : grid ;
		grid-template-rows : auto  1fr ;
	}

	.BAR
	{
		display : flex ;
		padding : 0.7ex 1em ;

		gap : 1em ;
	}

	button
	{
		padding : 0.2ex  1em ;
	}

	.TABS
	{
		cursor : default ;
		display : flex ;
		list-style : none ;
		gap : 0.3ex ;
	}

	.TAB
	{
		border-radius : 1.6em  0.1ex  0.1ex  0.1ex ;
		border : 1px solid hsl( 50  3%  55% ) ;
		border-bottom : 3px solid  hsl( 50  3%  40% ) ;
		padding : 0.5ex  1em ;
	}

	.TAB._SELECTED
	{
		border-bottom : 4px  solid  hsl( 90  60%  60% ) ;
	}

	.EVAL
	{
		height : 100% ;
		display : none ;
		grid-template-columns : 60%  40% ;
	}

	.EVAL._SELECTED { display : grid ; }

	.EDIT
	{
		display : flex ;
		flex-direction : column ;
	}

	.EDIT textarea
	{
		flex-grow : 1 ;

		background :  hsl( 225  55%  40% );
		resize : vertical ;

		padding : 0.5ex ;
		font-family : Consolas , monospace ;
		font-size: 1.10rem ;
		color : hsl( 0  0%  94% ) ;
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
					Button ( "実行" , () => app.curr.key.$ ?.execute () ) ,
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
				Editor ( dm.code ) ,
				Editor ( dm.output ) ,
				Editor ( dm.input ) ,
			) ,
			ef.section () ,
		) ;
	}

	const Editor = ( text : Live.str ) : DD.Node =>
	{
		return ef.textarea
		(
			{ biBind : { vInp : text } } ,
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


