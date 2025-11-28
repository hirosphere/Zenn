import { Live , Ease , Renn , Key , DOM , DD , ef , pl , df , KVS , times , log } from "../../../Meh/Meh.js" ;
import { Range } from "../../Lib/UI.Range.js" ;
import * as BB from "../../BookBase.js";

type uned = undefined ;
const uned = undefined ;

/*
	KV Store

*/

export namespace DM
{
	export type Node = Ease < node > ;
	export function Node ( i : Partial < node > ) : Node { return Ease.fromPartial ( i , node ) }

	export class node
	{
		title : string ;
		depth : number ;
		parts : node [] ;

		constructor ( i : Partial < node > )
		{
			this.title = i.title ?? "" ;
			this.depth = i.depth ?? 0 ;
			this.parts = i.parts ?.map ( p => new node ( p ) ) ?? [] ;
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
		"C" , "C♯" , "D" , "D♯" ,
		"E" , "F" , "F♯" , "G" ,
		"G♯" , "A" , "A♯" , "B"
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
		min-width : 40vw ;
		overflow : auto ;
	}

	td
	{
		padding : 1.2ex 1ex ;
		border-bottom : 1px dotted hsl( 0  0%  70% ) ;
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
				{ class : "FC  PM  ASt  GX" } ,
				ef.section
				(
					{ class : "FR AC GX" } ,
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
		return ef.table
		(
			{ class : "NOTE_TABLE" } ,
			... vm.keys.map ( key => Row ( vm , key ) ) ,
		) ;
	}

	const Row = ( app : VM.App , vm : VM.Key ) : DD.Node =>
	{
		return ef.tr
		(
			ef.td ( { style : { fontWeight : "400" } } , vm.key ) ,
			ef.td ( { style : { fontWeight : "600" } } , vm.name ) ,
			ef.td ( { style : { fontWeight : "300" } } , vm.freq ) ,
		) ;
	}

	const Ctrl = ( vm : VM.App ) : DD.Mel => ef.section
	(
		{ class : "FC PM" } ,
		Range ( { title : "Pitch" , value : vm.pitch , min : 220 , max : 880 } ) ,
	) ;

	const CheckBox = ( label : string | Live.R.str , state : Live.bool ) : DD.Mel => ef.label
	(
		{ class : "FR GX" } ,
		ef.input ( { attrs : { type : "checkbox" } , biBind : { chChan : state } } ) ,
		ef.span ( label ) ,
	) ;
}

