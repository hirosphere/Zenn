import { LS , Renn , Order } from "../Model/Model.js" ;
import { MehElement , TargetDOMElement } from "./Node.js";

type llr < V > = V | LS.Ro < V > ;

/* Element */

export type ElementSpec < E extends TargetDOMElement = any > =
{
	target ? : string ;
	class ? : Class ;
	style ? : Style ;
	shadow ? : Shadow ;
	attrs ? : Attributes < E > ;
	props ? : Properties < E > ;
	biBind ? : BB ;
	passive ? : Actions ;
	active ? : Actions ;
	focus ? : Focus ;
	hook ? : Hook < E > ;
}

export type Class =
(
	string | LS < string > | ClassSwitch |
	( string | LS < string > | ClassSwitch ) []
);


export type ClassSwitch = Record < string , llr < boolean > > ;

export type Style =
{
	[ name in keyof CSSStyleDeclaration ] ? : llr < CSSStyleDeclaration [ name ] > ;
};

export type Properties < E extends TargetDOMElement > =
{
	[ name in keyof E ] ? : llr < E [ name ] > ;
}

export type Attributes < E extends TargetDOMElement > =
{
	[ name in keyof E ] ? : llr < E [ name ] > ;
};

export type Actions =
{
	[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
}	

export type Action < Ev extends Event = any > = ( ev : Ev ) => void ;


export type BB =  /** BidirectionalBinds */
{
	vInp ? : LS < string > ;
	vChan ? : LS < string > ;

	vInpN ? : LS < number > ;
	vChanN ? : LS < number > ;

	chInp ? : LS < boolean > ;
	chChan ? : LS < boolean > ;
}

export type Focus = LS.Ro < boolean > ;


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
	export const free = () => new PartsPlace.Free () ;
	export const each = < EV >
	(
		model : Renn < EV > ,
		createNode : ( i : Order < EV > ) => Node
	
	) => new PartsPlace.Each ( model , createNode ) ; 
}

export abstract class PartsPlace
{
	#_typetag = plTag ;
}

const plTag = Symbol () ;

export namespace PartsPlace
{
	export class Free  extends PartsPlace
	{
		set contents ( contents : Part | Part [] )
		{
			;
		}
	}

	export class Each < EV > extends PartsPlace
	{
		constructor
		(
			public readonly model : Renn < EV > ,
			public readonly createNode : ( i : Order < EV > ) => Node ,
		)
		{ super () ; }
	}
}


export type Node = Text | MehElement ;
export type Part = Node | PartsPlace | undefined ;
