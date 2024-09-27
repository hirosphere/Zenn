import { Leaf, lol } from "../model/leaf.js";
import * as nodet from "./nodet.js";

export namespace defs
{
	export type primitive = string | number | boolean ;
	export type leaf = Leaf.str | Leaf.num | Leaf.bool ;
	export type text = primitive | leaf ;

	export type acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type act < Ev extends Event = any > = ( ev : Ev ) => void ;


	export type attrs < E extends Element > =
	{
		[ name in keyof E ] ? : lol < E [ name ] > ;
	};

	export type style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : text ;
	};

	export type class_switch = Record < string, Leaf.bool > ;

	export type class_spec = lol.str | class_switch | class_spec [] ;

	export type ec < E extends Element > =
	{
		class ? : class_spec ;
		style ? : style ;
		attrs ? : attrs < E > ;
		props ? : attrs < E > ;
		acts ? : acts ;
		actActs ? : acts ;
	};

	export type node = nodet.Element | text | Node ;
	export type part_ = node ;
	export type parts =  part_ [] | parts [] ;

	export class Each {}
}

