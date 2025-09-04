import { Live } from "../../Meh/Meh.js" ;

namespace DM
{
	export type Shape = Live < shape > ;

	export type shape = typeof shape ;
	export type hsl = typeof hsl ;
	export type xy = typeof xy ;

	export const xy = { x : 0 , y : 0 } ;
	export const hsl = { hue : 0 , sat : 0 , light : 0 } ;
	export const shape = { pos : xy , size : xy , fill : hsl } ;
	export const polygon = { ... shape , points : [] as xy [] } ;
}

namespace VM
{
	Live ( DM.xy ) .x.$ = 5 ;

	( s : DM.Shape ) =>
	{
		s.fill.$ = { hue : 90 , sat : 0.5 , light : 0 } ;
	}
}


















/*

	* Object
		* フィールド存在の担保


 */
