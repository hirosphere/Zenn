import { Leaf, LoL, setRoValue } from "./leaf.js";
import { Lian, Order } from "./lian.js";
const log = console.log;

// Index, Selector //

// Index //

export class Index < Part extends Index = any > extends Order
{
	public get title() : LoL.String { return this._title; };
	public readonly parts = new Lian < Part >;

	protected _title : LoL.String = "";
}
