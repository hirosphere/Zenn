import { Leafr } from "../Model/Model.js" ;
import { MehElement } from "./MehNode.js";

export type Literal = string | number | boolean | bigint | null ;

export type Text =
(
	Literal |
	Leafr < string > | Leafr < number > | Leafr < boolean > | Leafr < bigint >
) ;


type Part = Text | MehElement ;

type PartPlace =   [] ;

export type Node = Text ;
