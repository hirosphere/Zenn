import { Leaf, setRoValue } from "./leaf.js";
import { LianBase, OrderBase } from "./lian.js";
const log = console.log;

// Index, Selector //

// Index //

export class Index < Part extends Index = any > extends OrderBase
{
	public readonly title = new Leaf.String( "" );
	protected readonly parts = new LianBase < Part >;
}

export namespace Index
{
	export const from = ( src : Record < string, any > ) =>
	{
		;
	}

	export const labels = ( labels : string[] ) =>
	{

	}
}

