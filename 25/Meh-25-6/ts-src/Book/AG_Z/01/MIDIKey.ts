import { Live , Ease , Renn , Key , DOM , DD , ef , pl , df , times , log } from "../../../Meh/Meh.js" ;
import { Range } from "../../Lib/UI.Range.js" ;
import * as Tone from "../../Lib/Tone.js" ;

type uned = undefined ;
const uned = undefined ;

/*
	KV Store

*/

export namespace DM
{
	export type Node = Ease < node > ;
	export function Node ( i : Ease.dp < node > ) : Node { return Ease.fromPartial ( i , node ) }

	export class node
	{
		title : string ;
		depth : number ;
		parts : node [] ;

		constructor ( i ? : Ease.dp < node > )
		{
			this.title = i ?.title ?? "" ;
			this.depth = i ?.depth ?? 0 ;
			this.parts = i ?.parts ?.map ( p => new node ( p ?? {} ) ) ?? [] ;
		}
	}
}



export namespace VM
{
	export class App
	{
		public available = Live ( false ) ;

		public vis =
		{
			table : Live ( true ) ,
			ctrl : Live ( true ) ,
		}

		public pitch = Live ( 440 ) ;
		public keys = times
		(
			128 ,
			key => new Key ( this.pitch , key )
		) ;

		public tone = new Tone.Tone ;
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



export namespace VC
{
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
	.GX { gap : 1ex ; }

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
		width : 100% ;
	}

	.NOTE_TABLE td
	{
		padding : 1.2ex 1ex ;
		border-bottom : 1px dotted hsl( 0  0%  70% ) ;
		font-size : 1.2em ;
	}

	.NOTE_TABLE tr:hover td
	{
		background : hsl( 90  20%  98% ) ;
	}

	.RANGE
	{
		display : grid ;
		padding-block : 1ex ;
		grid-template-columns : 4em  300px 5em ;
		gap : 1ex ;
		font-family : courier ;
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
				{ class : "FC  PM  AS  GX" } ,
				ef.section
				(
					{ class : " FR AC GX" } ,
					ef.h1 ( "MIDI Key" ) ,
					CheckBox ( "Table" , vm.vis.table ) ,
					CheckBox ( "Ctrl" , vm.vis.ctrl ) ,
				) ,
				Ctrl ( vm ) ,
				Table ( vm ) ,
			) ,
		) ;
	}

	const Table = ( vm : VM.App ) : DD.Node =>
	{
		return ef.section
		(
			{ class : "NOTE_WRP  OA" , style : { flexGrow : "3" , display : vis ( vm.vis.table ) } } ,
			ef.table
			(
				{ class : "NOTE_TABLE" } ,
				... vm.keys.map ( key => Row ( vm , key ) ) ,
			)
		) ;
	}

	const Row = ( app : VM.App , vm : VM.Key ) : DD.Node =>
	{
		return ef.tr
		(
			{ passive : { mousedown : () => playnote ( vm.key , app.tone ) } } ,
			ef.td ( { style : { width : "4em" , fontWeight : "400" } } , vm.key ) ,
			ef.td ( { style : { width : "4em" , fontWeight : "700" } } , vm.name ) ,
			ef.td ( { style : { width : "10em" , fontWeight : "300" } } , vm.freq.trans_r ( v => v.toFixed ( 2 ) ) ) ,
			ef.td () ,
		) ;
	}

	const playnote = ( key : number , tone : Tone.Tone ) : void =>
	{
		tone.voice.sch ( [ [ 16 , key ] ] ) ;
	}

	const Ctrl = ( vm : VM.App ) : DD.Mel => ef.section
	(
		{ class : "FC PM" , style : { flexGrow : "1" , display : vis ( vm.vis.ctrl ) } } ,
		Tone.VC.Player ( vm.tone ) ,
		Range ( { title : "Pitch" , value : vm.pitch , min : 220 , max : 880 } ) ,
	) ;

	const CheckBox = ( label : string | Live.R.str , state : Live.bool ) : DD.Mel => ef.label
	(
		{ class : "FR GX" } ,
		ef.input ( { attrs : { type : "checkbox" } , biBind : { chChan : state } } ) ,
		ef.span ( label ) ,
	) ;

	const vis = ( ls : Live.bool ) => ls.trans_r ( s => s ? "" : "none" ) ;
}

