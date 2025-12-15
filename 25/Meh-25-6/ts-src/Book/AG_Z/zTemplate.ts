import { Live , Ease , Renn , Key , DOM , DD , ef , pl , df , Store , log } from "../../Meh/Meh.js" ;
import { ls_get } from "../../Meh/Model/LiveState.js";
import * as BB from "../BookBase.js";

type uned = undefined ;
const uned = undefined ;

/*
	KV Store
*/

export namespace DM
{
	export type Node = Ease < node > ;
	export type ToDo = Ease < todo > ;
	export type HSL = Ease < hsl > ;

	export function Node ( i : Ease.dp < node > ) : Node
	{
		return Ease.fromPartial ( i , node ) ;
	}

	export class node
	{
		type = "node" ;
		title : string ;
		parts : part [] ;

		constructor ( i ? : Ease.dp < part > )
		{
			this.title = i ?.title ?? "" ;
			this.parts = i ?.parts ?.map ( p => part ( p ?? {} ) ) ?? [] ;
		}
	}

	export class todo extends node
	{
		override type = "todo" ;
		completed : boolean ;

		constructor ( i : Ease.dp < todo > )
		{
			super ( i ) ;
			this.completed = i.completed ?? false ;
		}
	}

	export class hsl extends node
	{
		override type = "hsl" ;

		hue : number ;
		sat : number ;
		light : number ;

		constructor ( i : Ease.dp < hsl > )
		{
			super ( i ) ;
			this.hue = i.hue ?? 0 ;
			this.sat = i.sat ?? 0 ;
			this.light = i.light ?? 0 ;
		}
	}

	export type part = node | todo | hsl ;

	function part ( i : Ease.dp < part > ) : part
	{
		switch ( i.type )
		{
			case "todo" : return new todo ( i ) ;
			case "hsl" : return new hsl ( i ) ;
			
			default : return new node ( i ) ;
		}
	}
}



export namespace VM
{
	export class App
	{
		public available = Live ( false ) ;
		public root = DM.Node ( { title : "Han Node" } ) ;

		protected kv = new Store.KVS < DM.todo > ( "MB_2511_TEMPLATE" ) ;
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
				ef.h1 ( "App Template" ) ,
				ef.section
				(
					Node ( vm.root ) ,
				) ,
			) ,
		) ;
	}

	const Node = ( dm : DM.Node ) : DD.Mel =>
	{
		return ef.section
		(
			{ class : "NODE" } ,
			ef.input ( { biBind : { vInp : dm.title } } ) ,
		) ;
	}
}

