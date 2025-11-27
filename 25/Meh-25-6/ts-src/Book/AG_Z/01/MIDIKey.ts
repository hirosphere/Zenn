import { Live , Ease , Renn , Key , DOM , DD , ef , pl , df , KVS , times , log } from "../../../Meh/Meh.js" ;
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

		public keys = times
		(
			128 ,
			key => new Key ( key )
		) ;
	}

	export class Key
	{
		constructor ( public key : number )
		{
			;
		}

		public get name () : string
		{
			const key = this.key % 12 ;
			const oct = Math.floor ( this.key / 12 ) ;
			return nametable [ key ] + oct ;
		}

		public get freq () : number
		{
			return 440 * Math.pow ( 2 , ( this.key - 69 ) / 12 ) ;
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

	td
	{
		padding : 0.7ex 1ex ;
		border-bottom : 1px dotted hsl( 0  0%  70% ) ;
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
				ef.h1 ( "MIDI Key" ) ,
				Table ( vm ) ,
			) ,
		) ;
	}

	const Table = ( vm : VM.App ) : DD.Node =>
	{
		return ef.table
		(
			... vm.keys.map ( key => Row ( vm , key ) ) ,
		) ;
	}

	const Row = ( app : VM.App , vm : VM.Key ) : DD.Node =>
	{
		return ef.tr
		(
			ef.td ( vm.key ) ,
			ef.td ( vm.name ) ,
			ef.td ( vm.freq ) ,
		) ;
	}
}

