import { Exist, root } from "./exist.js";
import { Leaf } from "./leaf.js";

export abstract class Branch extends Exist
{
	public abstract update() : void;
}
