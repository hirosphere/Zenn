import { leaf , Renn , ef , pl , log } from "../../meh/index.js" ;

namespace VM
{
	export class Applet
	{
		counters = [ new Counter () , ] ;
	}

	export class Counter
	{
		count = leaf ( 0 ) ;
		step = leaf ( "120" ) ;

		add ()
		{
			this.count.$ += Number ( this.step.$ ) ;
		}
	}
}

export namespace VC
{
	const css = /* css */ `

	.FV { display : flex ; flex-direction : column ; }

	button
	{
		border-radius : 1ex ;
		min-width : 5em ;
		height : 3em ;
		padding-inline : 1ex ;
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
		padding-block : 1ex ;
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

	export const Applet = ( vm : VM.Applet = new VM.Applet ) =>
	{
		return ef.main
		(
			{ shadow : { css } } ,

			ef.h1 ( "実績カウンタ" ) ,
			
			... vm.counters.map ( i => Counter ( i ) ) ,
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
				ef.button ( { acts : { click () { vm.add () ; } } } , "追加" ) ,
				ef.button ( { acts : { click () { vm.count.$ = 0 ; } } } , "リセット" ) ,
			)
		) ;
	}
}
