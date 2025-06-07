import { leaf , Renn , ef , pl , log } from "../../meh/index.js" ;

namespace VM
{
	export class Applet
	{
		counters = Array.from ( { length : 5 } , i => new Counter () ) ;
	}

	export class Counter
	{
		count = leaf ( 0 ) ;
		step = leaf ( "120" ) ;

		constructor ()
		{
			this.count.$ = + this.step.$ * Math.floor ( Math.random () * 20 )
		}

		add ()
		{
			this.count.$ += Number ( this.step.$ ) ;
		}
	}
}

export namespace VC
{
	/* CSS */

	const css = /* css */ `

	.FV { display : flex ; flex-direction : column ; }
	.FH { display : flex ; }
	.PGX { padding : 1ex ; gap : 1ex ; }
	.FWR { flex-wrap : wrap ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	button
	{
		border-radius : 1ex ;
		min-width : 5em ;
		height : 3em ;
		padding-inline : 1ex ;
	}

	button:focus
	{
		border : 2px  solid  oklch( 65%  50%  135 ) ;
	}

	:host
	{
		display : flex ;
		flex-direction : column ;
		align-items : center ;
	}
	
	.Counter
	{
		border-radius : 1em ;
		background : oklch( 100%  0%  0 / 70% ) ;
		height : 12em ;

		padding : 1em ;
	}

	.Counter .display
	{
		width : 6em ;
		padding-block : 1.4ex ;
		text-align : center ;
		font-size : 48px ;
	}

	.Counter .bar
	{
		display : flex ;
		justify-content : center ;
		align-items : stretch ;
		gap : 0.8ex ;
	}

	.Counter input
	{
		font-size : 24px ;
		text-align : center ;
	}

	` ;

	/* */

	export const Applet = ( vm : VM.Applet = new VM.Applet ) =>
	{
		return ef.main
		(
			{ shadow : { css } } ,

			ef.h1 ( "実績カウンタ" ) ,
			
			ef.section
			(
				{ class : "FH FWR PGX JC" } ,
				... vm.counters.map ( i => Counter ( i ) ) ,
			) ,
		) ;
	}

	const Counter = ( vm : VM.Counter ) =>
	{
		return ef.article
		(
			{ class : "Counter FV" } ,

			ef.span ( { class : "display" } , vm.count ) ,

			ef.span
			(
				{ class : "bar" } ,

				ef.input ( { style : { width : "5ex" } , binds : { value_input : vm.step } } ) ,
				ef.button ( { action : { click () { vm.add () ; } } } , "追加" ) ,
				ef.button ( { action : { click () { vm.count.$ = 0 ; } } } , "リセット" ) ,
			)
		) ;
	}
}
