import { StrSrcFactory } from "../model/index.js";

/*
	Node
	Element
	Attrs
	Props
	Style
	Acts
	Actacts

	Parts
	Part
	Text
	StringSrouce

	CreateElement
	createElement
*/

type gE = Element;

export namespace defs
{
	/** Text */

	export type Text = string | number | bigint | boolean | StrSrcFactory ;

	/**  Part */

	export class Each < V = any >
	{
		constructor
		(
			public source : Array < V > ,
			public create : ( value : V ) => Node
		){}
	}

	export type Part = Element | Text | Each ;

	/** アクション */

	export type Action < Ev extends Event = any > = ( ev : Ev ) => void ;

	export type Actions =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
	}	

	/** スタイル  */

	export type StyleValue = Text;

	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : StyleValue ;
	};

	/** Attr(s) */

	export type Attrs <  E extends gE = any  > =
	(
		{ [ name in keyof E ] ? : E[ name ]; } |
		{ [ name : string ] : string }
	);

	/** エレメント諸属性定義 */

	export interface EChar < E extends gE = any >
	{
		attrs ? : Attrs < E > ;
		style ? : Style ;
		acts ? : Actions;
	}

	/** エレメント定義 */

	export class Element < E extends gE = any >
	{
		constructor
		(
			public ns : string,
			public type : string,
			public chars ? : EChar < E >,
			public parts ? : Part []
			){}
	}

	/**  */

	export type Node = Element | Text ;
}

export const each = < V = any >
(
	source : Array < V >,
	create : ( value : V ) => defs.Node
	
) => new defs.Each < V > ( source, create );
