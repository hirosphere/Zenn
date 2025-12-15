import { Live , Ease , Renn , Key , DOM , DD , ef , pl , df , log } from "../../Meh/Meh.js" ;
import * as BB from "../BookBase.js";

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
		public display = new Display ;

		// protected kv = new KVS < DM.node > ( "MB_2511_TEMPLATE" ) ;
	}

	export class Display
	{
		public items = Ease < hsl [] > ;
	}

	type display =
	{
		items : hsl [] ;
		div : number ;
	}

	type hsl =
	{
		hue : number ;
		sat : number ;
		light : number ;
	}
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
	
	` ;


	/* Components */

	export function App () : DD.Mel
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC  PM  AC" } ,
				ef.h1 ( "HSL" ) ,
			) ,
		) ;
	}
}

