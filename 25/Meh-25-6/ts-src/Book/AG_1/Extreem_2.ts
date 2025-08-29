import { Life , Leaf , Renn , Live , DD , ef , pl , DOM } from "../../Meh/Meh.js" ;
import { Refs } from "../../Meh/Model/Leaf.js";

export namespace DM
{
	export type nodebase =
	{
		type : string ;
		parts : nodebase [] ;
	}

	export type memo = nodebase &
	{
		type : "memo" ;
		text : string ;
	}

	export type hsl =
	{
		type : "HSL" ,
		hue : number ;
		sat : number ;
		light : number ;
	}

	type leaf < V > = Omit < V , "type" | "parts" > ;
	export type node = memo | hsl ;

	/* */

	export class NodeBase < V extends node > extends Leaf.Core.Entity < V >
	{
		public readonly type : string ;
		
		constructor ( v : V )
		{
			super ( v ) ;
			this.type = v.type ;
		}

		public readonly parts = new Renn < NodeBase < never > > ;
	}


	export class Memo extends NodeBase < memo >
	{
		public readonly text : Leaf < string > ;

		constructor ( v : memo )
		{
			super ( v ) ;
			this.text = Leaf ( v.text ) ;
		}
	}

	export class HSL extends NodeBase < hsl >
	{
	}

	export type Node = Memo ;
}


export namespace VM
{
	( s : DM.Node ) =>
	{
		switch ( s.type )
		{
			case "memo" :
				s.text.$ = "Waaai" ;
				break ;
		}
	}
}


export namespace VC
{
	const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }
	
	:host
	{
		display : flex ;
		flex-direction : column ;
		padding : 5em ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  10% ) ;
	}
	
	` ;


	export const Applet = () =>
	{
		return ef.main
		(
			{ shadow : css } ,
			ef.h1 ( "Extreem 2" ) ,
		) ;
	}
}

export default VC.Applet ;
