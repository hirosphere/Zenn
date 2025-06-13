import { Leafr } from "../Model/Model.js" ;
import { MehElement } from "./MehNode.js";


export type Primitive =
(
	string | number | boolean | bigint | null | undefined |
	Leafr < string > | Leafr < number > | Leafr < boolean > | Leafr < bigint >
) ;


type Part = Primitive | MehElement ;

type PartPlace =   [] ;

/* MI : Meh DOM Item */
export type MI = Primitive ;

const mi : MI = 55555 ;
