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

	export type Text = string ;


	/** Attr(s) */

	type Attrs <  E extends gE = any  > =
	(
		{ [ name in keyof E ] ? : E[ name ]; } |
		{ [ name : string ] : string }
	);

	/** エレメント属性定義 */

	export class ElementCharactoristics < E extends gE = any >
	{
		attrs ? : Attrs < E >;
	}

	/** エレメント定義 */

	export class Element < E extends gE = any >
	{
		constructor
		(
			public type : string,
			public chars : ElementCharactoristics < E >
		){}
	}

	/**  */

	export type Node = Element | Text ;
}
