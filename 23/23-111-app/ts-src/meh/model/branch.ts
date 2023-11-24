import { Exist, root } from "./exist.js";
import { Leaf } from "./leaf.js";

type Persona = { name : string; };

export type toLeaf < T > =
{
	[ K in keyof T ] : Leaf < T[ K ] > ;
};

export abstract class Branch extends Exist
{
	public abstract update() : void;
}
