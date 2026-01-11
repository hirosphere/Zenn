import { Live , Ease , Renn , Key , Store , DOM , DD , ef , pl , df , times , log } from "../../../Meh/Meh.js" ;
import { Range } from "../../Lib/UI.Range.js" ;
import * as Muse from "../../Lib/Muse/index.js" ;

type uned = undefined ;
const uned = undefined ;

/*
	KV Store

*/

export namespace DM
{
}



export namespace VM
{
	export class App
	{
		public player : Muse.VM.Player ;

		public vis =
		{
			table : Live ( true ) ,
			ctrl : Live ( true ) ,
		}

		public pitch = Live ( 440 ) ;

		public readonly pallet = new VM.Pallet () ;

		constructor ()
		{
			const ss = new Store.Session ( "AG_Z01_AUDIO_TL" , session ) ;
			const sv = ss.value ;
			this.player = new Muse.VM.Player ( sv.player ) ;
		}
	}

	class session
	{
		player : Muse.VM.player ;

		constructor ( i : Ease.dp < session > | uned )
		{
			this.player = new Muse.VM.player ( i?.player ) ;
		}
	}

	export class Key
	{
		constructor ( protected pitch : Live.R.num , public key : number )
		{
			this.freq = this.pitch.trans_r ( pitch => pitch * Math.pow ( 2 , ( key - 69 ) / 12 ) ) ; ;
		}

		public freq : Live.R.num ;

		public get name () : string
		{
			const key = this.key % 12 ;
			const oct = Math.floor ( this.key / 12 ) - 1 ;
			return nametable [ key ] + oct ;
		}
	}

	const nametable =
	[
		"C" , "C#" , "D" , "D#" ,
		"E" , "F" , "F#" , "G" ,
		"G#" , "A" , "A#" , "B"
	] ;
}

export namespace VM
{
	export class Pallet
	{
		public readonly perm = Ease.fromPartial ( {} , permstate ) ;
		public readonly items = times ( 11 , n => new PalletItem ( n - 5 ) ) ;

		constructor ()
		{
			this.perm.mode.$ = "Pryu" ;
		}
	}

	export class PalletItem
	{
		constructor
		(
			public readonly indexphase : number ,
		)
		{}
	}


	class permstate
	{
		mode : scale_type ;
		shift : number ;

		constructor ( i ? : Ease.dp < permstate > )
		{
			this.mode = i ?.mode ?? "Pmaj" ;
			this.shift = i ?.shift ?? 0 ;
		}
	}


	const scales =
	{
		"Pmin" : [ -7 , -3 , -1 ,  0 ,  4 ] ,
		"Pmaj" : [ -3 ,  0 ,  2 ,  4 ,  7 ] ,
		"Pryu" : [  0 ,  4 ,  5 ,  7 ,  9 ] ,
		"S"    : [ -1 ,  0 ,  2 ,  4 ,  5 ,  7 ,  9 ]
	
	} ;
	
	
	const doremi_table = [ "Do" , "Do#" , "Re" , "Re#" , "Mi" , "Fa" , "Fa#" , "Sol" , "Sol#" , "Ra" , "Ra#" , "Si" ] ;
	
	
	const doremi = ( index : number , pal : number [] ) =>
	{
		const oct = Math.floor ( index / pal.length ) ;
		const keyindex = pmod ( index , pal.length ) ;
		const key = pal [ keyindex ] ;
		const name = doremi_table [ pmod ( key , 12 ) ] ;
		return [ oct , key , name ] .join ( " , " ) ;
	}
	
	
	const pmod = ( n : number , d : number ) =>
	{
		const  f = n % d ;
		return  f < 0 ? f + d : f ;
	}
	
	
	export type scale_type = keyof typeof scales ;

	export class Tranpose
	{
		public readonly p1 = Live ( 0 ) ;
		public readonly p2 = Live ( 0 ) ;
	}

	const Transpose = () =>
	{
		const t =
		[
			[  -5 , -2 ,  1 ,  4 ,  7  ] ,
			[  -6 , -3 ,  0 ,  3 ,  6  ] ,
			[  -7 , -4 , -1 ,  2 ,  5  ] ,
		] ;

		;
	}

}


export namespace VC
{
	/* Components */

	export function App () : DD.Mel
	{
		const vm = new VM.App ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC  PM  GX" } ,
				ef.section
				(
					{ class : " FR AC GX" } ,
					ef.h1 ( "Audio Timeline" ) ,
					CheckBox ( "Table" , vm.vis.table ) ,
					CheckBox ( "Ctrl" , vm.vis.ctrl ) ,
				) ,
				Ctrl ( vm ) ,
				Pallet ( vm.pallet ) ,
			) ,
		) ;
	}

	const Ctrl = ( vm : VM.App ) : DD.Mel => ef.section
	(
		{ class : "FC PM" , style : { display : vis ( vm.vis.ctrl ) } } ,
		ef.section
		(
			{ class : "FR GX AC" } ,
		) ,
		Muse.VC.PlayerA ( vm.player , { main : "PLAYER  FC GX" , ctrl : "CTRL FR GM AC" } ) ,
		Range ( { title : "Pitch" , value : vm.pitch , min : 220 , max : 880 } ) ,
	) ;

	const CheckBox = ( label : string | Live.R.str , state : Live.bool ) : DD.Mel => ef.label
	(
		{ class : "FR GX" } ,
		ef.input ( { attrs : { type : "checkbox" } , biBind : { chChan : state } } ) ,
		ef.span ( label ) ,
	) ;

	const vis = ( ls : Live.bool ) => ls.trans_r ( s => s ? "" : "none" ) ;

	/* Pallet */

	const Pallet = ( vm : VM.Pallet ) : DD.Mel =>
	{
		return ef.section
		(
			{ class : "FC GX AC" } ,
			ef.section
			(
				{  } ,
				LN ( "Shift" , vm.perm.shift ) ,
			) ,
			PalletDisplay ( vm ) ,
			ef.section
			(
				{ class : "FR  GX" } ,
				... vm.items.map ( vm => PalletItem ( vm ) )
			) ,
		) ;
	}

	const PalletDisplay = ( vm : VM.Pallet ) : DD.Mel =>
	{
		return ef.section
		(
			ef.table
			(
				ef.tr ( ... times ( 10 , n => ef.td ( n ) ) ) ,
			)
		) ;
	}

	const PalletItem = ( vm : VM.PalletItem ) : DD.Mel =>
	{
		return ef.label
		(
			{ class : "FC GX AC" , style : { padding : "0  0.4ex" } } ,
			ef.span ( vm.indexphase ) ,
			ef.input
			(
				{ attrs : { type : "radio" , name : "pi_shift" } } ,
				vm.indexphase ,
			) ,
		) ;
	}

	const LN = ( title : string , ls : Live.num ) : DD.Mel => ef.label
	(
		{ class : "FR GX AC" } ,
		ef.span( title ) , 
		ef.input ( { class : "F12" , biBind : { vChanN : ls } } )
	) ;





	/* CSS */

	const css = /* css */ `

	:host { height : 100% ; }
	
	* { box-sizing : border-box ;  margin : 0 ; }
	
	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }

	.OA { overflow : auto ; }
	
	.JC { justify-content : center ; }
	.AC { align-items : center ; }
	.ASt { align-items : start ; }

	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }
	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }

	.F12 { font-size : 1.2em ; }

	button { padding : 0.8ex  1em ; }

	main
	{
		height : 100% ;
		overflow : auto ;
		color : hsl( 0  0%  20% ) ;
	}

	h1 { text-align : center ; }

	.NOTE_TABLE
	{
		cursor : default ;
	}

	td
	{
		padding : 1.2ex 1ex ;
		border-bottom : 1px dotted hsl( 0  0%  70% ) ;
		font-size : 1.2em ;
	}

	.PLAYER .PROG { font-size : 3em ; }

	.RANGE
	{
		max-width : 600px ;

		display : grid ;
		padding-block : 1ex ;
		grid-template-columns : 3.5em  auto 3em ;
		gap : 1ex ;
		font-family : courier ;
	}
	
	` ;
}

