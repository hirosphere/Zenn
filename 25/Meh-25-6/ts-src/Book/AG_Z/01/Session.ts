import { Live , Ease , Renn , Order , Key , DOM , DD , ef , pl , df , Store , log } from "../../../Meh/Meh.js" ;
import { ls_get } from "../../../Meh/Model/LiveState.js";

type uned = undefined ;
const uned = undefined ;



export namespace VM
{
	export class App
	{
		public available = Live ( false ) ;
		public session : Ease < session > ;

		public sessionStore ;

		constructor ()
		{
			this.sessionStore = new Store.Session ( "Session_Quest" , session ) ;
			this.session = this.sessionStore.value ;
		}

		public add () : void
		{
			this.session.nodes.insert
			(
				[ new hsl ( {} ) ]
			) ;
		}
	}

	export function hslrand ( s : Ease < hsl > ) : void
	{
		s.hue.$ += ( Math.random () - 0.5 ) * 30 ;
	}


	class session
	{
		nodes : node [] ;

		constructor ( i ? : Ease.dp < session > )
		{
			this.nodes = i?.nodes?.map ( i => node ( i ) ) ??
			[
				new counter ( {} ) , new counter ( {} ) , new hsl ( {} ) , new hsl ( {} )
			] ;
		}
	}

	function node ( i : Ease.dp < node > ) : node
	{
		switch ( i.type )
		{
			case "counter" : return  new counter ( i ) ;
			case "hsl"     : return  new hsl ( i ) ;
		}

		return { type : "" } ;
	}

	export type Node = Ease < node > ;
	type node = counter | hsl | { type : "" } ;

	export type Counter = Ease < counter > ;
	export type HSL = Ease < hsl > ;

	class counter
	{
		type : "counter" = "counter" ;

		title : string ;
		value : number ;

		constructor ( i : Ease.dp < counter > | uned )
		{
			this.title = i ?.title ?? "Counter" ;
			this.value = i ?.value ?? 0 ;
		}
	}

	export class hsl
	{
		type : "hsl" = "hsl" ;
		title : string ;

		hue : number ;
		sat : number ;
		light : number ;

		constructor ( i : Ease.dp < hsl > | uned )
		{
			this.title = i ?.title ?? "HSL" ;

			this.hue = i ?.hue ?? 90 ;
			this.sat = i ?.sat ?? 0.6 ;
			this.light = i ?.light ?? 0.6 ;
		}
	}
}



export namespace VC
{
	/* CSS */

	const css = /* css */ `

	:host { height : 100% ; }
	
	* { box-sizing : border-box ;  margin : 0 ; }

	.RM { border-radius : 1em ; }
	.RX { border-radius : 1ex ; }
	
	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }

	.OA { overflow : auto ; }
	
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }
	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }

	main
	{
		height : 100% ;
		overflow : auto ;
		color : hsl( 0  0%  20% ) ;
	}

	h1 { text-align : center ; }

	input
	{
		padding : 0.6ex  1.0ex ;
		font-size : 1.2em ;
	}

	button { padding : 0.8ex  1em ; }

	.COUNTERS
	{
	}

	.COUNTER
	{
		border : 3px  solid  hsl( 0  0%  20% ) ;
		border-radius : 1em ;
	}
	
	.COUNTER_TITLE
	{
		border : none ;
		text-align : center ;
		font-size : 1.2em ;
		font-weight : 700 ;
	}

	.COUNTER_DISPLAY
	{
		padding-block : 0.4ex ;
		text-align : center ;
		font-size : 3.0em ;
		font-weight : 400 ;
	}

	.COUNTER_CTRL
	{
		padding-block : 1ex ;
		text-align : center ;
	}


	.COUNTER_CTRL button
	{
		border-radius : 1ex ;
		padding : 0.4ex  0.8em ;
		font-size : 1.2em ;
	}
	
	` ;


	/* Components */

	export function App () : DD.Mel
	{
		const vm = new VM.App ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC  PM  GM  AC" } ,
				ef.h1 ( "Session" ) ,
				ef.section
				(
					{ class : "FR  GX AC" } ,
					ef.button ( { passive : { click : () => log ( "session.$" , vm.session.nodes.clear () ) } } , "Reset" ) ,
					ef.button ( { passive : { click : () => log ( "session.$" , vm.add () ) } } , "Add" ) ,
					ef.button ( { passive : { click : () => vm.sessionStore.save () } } , "Save" ) ,
				) ,
				ef.section
				(
					{ class : "COUNTERS FC AS GM " } , 
					pl.each
					(
						vm.session.nodes.renn ,
						( node , o ) => Node ( node , o ) ,
					)
				) ,
			) ,
		) ;
	}

	function Node ( m : VM.Node , o : Order < any > ) : DD.Mel
	{
		return ef.li
		(
			{ class : "FR AC GX" } ,
			ef.section
			(
				{  } , "x"
			) ,
			NodeContent ( m ) ,
		) ;
	}

	function NodeContent ( m : VM.Node ) : DD.Mel
	{
		if ( m [ Ease.type ] == "counter" ) return Counter ( m ) ;
		if ( m [ Ease.type ] == "hsl" ) return HSL ( m ) ;

		return ef.section ( ef.h2 ( "Item" ) ) ;
	}

	function Counter ( vm : VM.Counter ) : DD.Mel
	{
		return ef.section
		(
			{ class : "COUNTER  FR PX GX" } ,
			ef.input ( { class: "COUNTER_TITLE" , biBind : { vInp : vm.title } } ) ,
			ef.p ( { class :"COUNTER_DISPLAY" , style : { width : "5ex" } } , vm.value ) ,
			ef.section
			(
				{ class : "COUNTER_CTRL  FR GX JC" } ,
				ef.button ( { passive : { click : () => vm.value.$ -- } } , "-" ) ,
				ef.button ( { passive : { click : () => vm.value.$ ++ } } , "+" ) ,
			) ,
		) ;
	}

	function HSL ( mo : VM.HSL ) : DD.Mel
	{
		const bg = Live.trans_r ( mo , v => tocss ( v ) ) ;

		return ef.section
		(
			{ class : "HSL  FR RX AC PM GX" , style : { background : bg } } ,
			ef.h2 ( ef.input( { style : { width : "7em" } , biBind : { vChan : mo.title } } ) ) ,
			ef.p
			(
				{ style : { width : "25ex" } , active : { click : () => mo.hue.$ += 10 } } ,
				bg
			) ,
			ef.section
			(
				{ class : "FR AC GX" } ,
				ef.input ( { attrs : { type : "range" , max : "360" } , biBind : { vInpN : mo.hue } } ) ,
				" " ,
				ef.span ( mo.hue ) ,
			) ,
		) ;
	}

	const tocss = ( s : VM.hsl ) : string =>
	{
		const { hue , sat , light } = s ;
		return `hsl( ${ hue.toFixed ( 1 ) }  ${ ( sat * 100 ).toFixed ( 1 ) }%  ${ ( light * 100 ).toFixed ( 1 ) }% )` ;
	}
}

