import { Leaf } from "./leaf.js";
import { Lian } from "./lian.js";

// Index, Selector //

// Index //

export class Index < Part extends Index = any > extends Lian.Item
{
	public readonly title = new Leaf.String( "" );
	protected readonly parts = new Lian < Part >;
}

