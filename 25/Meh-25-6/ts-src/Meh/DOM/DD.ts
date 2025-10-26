import { Plain , Live , Renn , Order } from "../Model/Model.js" ;
import { MehElement } from "./MehNode.js";

export type TargetDOMElement = HTMLElement | SVGElement | MathMLElement ;

type llr < V > = V | Plain.R < V > ;

/* Element */

export type ElementSpec < E extends TargetDOMElement > =
{
	target ? : string ;
	class ? : Class ;
	style ? : Style ;
	shadow ? : Shadow ;
	attrs ? : Attrs < E > ;
	props ? : Props < E > ;
	biBind ? : BB ;
	passive ? : Actions ;
	active ? : Actions ;
	focus ? : Focus ;
	hook ? : Hook < E > ;
}

export type Class =
(
	llr < string > | ClassSwitch |
	( llr < string > | ClassSwitch ) []
);


export type ClassSwitch = Record < string , llr < boolean > > ;

export type Style =
{
	[ name in keyof CSSStyleDeclaration ] ? : llr < CSSStyleDeclaration [ name ] > ;
};

export type Attrs < E extends TargetDOMElement > =
{
	[
		name in keyof E  as
			E [ name ] extends ( number | string | boolean ) ? name : never
	] ? : llr < E [ name ] | undefined > ;
};

export type Props < E extends TargetDOMElement > =
{
	[
		name in keyof E  as
			E [ name ] extends ( number | string | boolean ) ? name : never
	] ? : llr < E [ name ] > ;
};

export type Actions =
{
	[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
}	

export type Action < Ev extends Event = any > = ( ev : Ev ) => void ;


export type BB =  /** BidirectionalBinds */
{
	vInp ? : Plain < string > ;
	vChan ? : Plain < string > ;

	vInpN ? : Plain < number > ;
	vChanN ? : Plain < number > ;

	chInp ? : Plain < boolean > ;
	chChan ? : Plain < boolean > ;
}

export type Focus = Plain.R < boolean > ;


export type Hook < E extends TargetDOMElement > =
{
	el ? : E ;
	init ? ( el : E ) : void ;
	term ? ( el : E ) : void ;
};

export type Shadow = llr < string > | CSSStyleSheet | ( llr < string > | CSSStyleSheet ) [] ;






/* Part */

export type Text = llr < string > | llr < number > | llr < boolean > | llr < bigint > | null ;

export namespace pl
{
	export const key = < K >
	(
		key : Live < K > ,
		createNode : ( key : K ) => Node | undefined
	
	) => new PartsPlace.Key ( key , createNode )

	export const each = < E >
	(
		model : Renn < E > ,
		createNode : ( e : E , o : Order < E > ) => Node
	
	) => new PartsPlace.Each ( model , createNode ) ; 
}

export abstract class PartsPlace
{
	#_typetag = plTag ;
}

const plTag = Symbol () ;

export namespace PartsPlace
{
	export class Key < K > extends PartsPlace
	{
		constructor
		(
			public readonly key : Live < K > ,
			public readonly createNode : ( key : K ) => Node | undefined
		)
		{ super () ; }
	}

	export class Each < E > extends PartsPlace
	{
		constructor
		(
			public readonly model : Renn < E > ,
			public readonly createNode : ( part : E , order : Order < E > ) => Node ,
		)
		{ super () ; }
	}
}


export type Node = Text | MehElement < any > ;
export type Part = Node | PartsPlace | undefined ;
