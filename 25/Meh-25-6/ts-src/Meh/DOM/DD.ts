import { Leaf } from "../Model/Model.js" ;
import { MehElement , TargetDOMElement } from "./DOM.js";

type llr < V > = V | Leaf.r < V > ;

/* Element */

export type ElementSpec < E extends TargetDOMElement = any > =
{
	target ? : E ;
	class ? : Class ;
	style ? : Style ;
	attrs ? : Attributes < E > ;
	props ? : Attributes < E > ;
	bibinds ? : BidirectionalBinds ;
	passive ? : Actions ;
	active ? : Actions ;
}

export type Class =
(
	string | ClassSwitch | ( string | ClassSwitch ) []
);

export type ClassSwitch = Record < string , llr < boolean > > ;

export type Style =
{
	[ name in keyof CSSStyleDeclaration ] ? : llr < CSSStyleDeclaration [ name ] > ;
};

export type Properties < E extends globalThis.Element > =
{
	[ name in keyof E ] ? : llr < E [ name ] > ;
}

export type Attributes < E extends globalThis.Element > =
{
	[ name in keyof E ] ? : Text ;
};

export type Actions =
{
	[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
}	

export type Action < Ev extends Event = any > = ( ev : Ev ) => void ;


export type BidirectionalBinds =
{
	vInp ? : Leaf < string > ;
	vChan ? : Leaf < string > ;
	chInp ? : Leaf < boolean > ;
	chChan ? : Leaf < boolean > ;
}

export type Hook < E extends TargetDOMElement > =
{
	el ? : E ;
	init ? ( el : E ) : void ;
	term ? ( el : E ) : void ;
};

export type Shadow =
{
	mode ? : "open" | "closed" ;
	css ? : string | CSSStyleSheet | ( string | CSSStyleSheet ) [] ;
}

export type Focus =
{
	state ? : Leaf < boolean > ;
}


/* Part */

export type Literal = string | number | boolean | bigint | null ;
export type Text = llr < Literal > ;


export abstract class pl
{
	public static free () : pl.Free { return new pl.Free () }
}

export namespace pl
{
	export class Free  extends pl
	{
		set contents ( contents : Part | Part [] )
		{
			;
		}
	}
}


export type StaticPart = Text | MehElement | undefined ;
export type Part = StaticPart | pl ;

