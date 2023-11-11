import { Leaf, setRoValue } from "./leaf.js";
import { Lian, Order } from "./lian.js";
const log = console.log;

// Index, Selector //

// Index //

export class Index < Part extends Index = any > extends Order
{
	public readonly title = new Leaf.String( "" );
	public readonly parts = new Lian < Part >;
}
