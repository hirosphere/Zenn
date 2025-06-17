import { Leafr } from "../Model/Model.js" ;
import { MehElement } from "./MehNode.js";


/* Element */

export type Element < E extends globalThis.Element = any > =
{
	target ? : E ;
	style ? : Style ;
}

export type Style =
{

}


/* Part */

export type Literal = string | number | boolean | bigint | null | undefined ;

export type Text =
(
	Literal |
	
	Leafr.Base < string > |
	Leafr.Base < number > |
	Leafr.Base < boolean > |
	Leafr.Base < bigint >
) ;


const partPlaceTag = Symbol () ;

export class PartPlace
{
	public readonly partPlaceTag = partPlaceTag ;
}

export type StaticPart = Text | MehElement ;
export type Part = StaticPart | PartPlace ;

