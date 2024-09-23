import { Leaf, lol } from "../model/leaf.js";
import { Nodet } from "./nodet.js";

export namespace defs
{
	export type literal = string | number | boolean ;
	export type leaf = Leaf.str | Leaf.num | Leaf.bool ;
	export type text = literal | leaf ;

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
		[ name in keyof CSSStyleDeclaration ] ? : Text ;
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
		actacts ? : acts ;
	};

	export type node = Nodet | text | Node ;
	export type part = node ;
}

