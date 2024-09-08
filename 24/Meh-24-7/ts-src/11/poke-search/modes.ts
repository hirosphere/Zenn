import { Exist, Leaf } from "../../meh/index.js";
import * as data from "./data/items.js";

export class App extends Exist
{
	public readonly search = new Leaf.String( this, "" );

	public readonly items = Array.from
	(
		data.itemMap.values(),
		( value ) => new Item( this, value, this.search )
	);

}

export class Item extends Exist
{
	constructor( com : Exist, data : data.Item, search : Leaf.String )
	{
		super( com );

		this.id = data.id;
		this.en = data.en;
		this.ja = data.ja;

		this.一致前 = new Leaf.String( this, this.en );
		this.一致 = new Leaf.String( this, "" );
		this.一致後 = new Leaf.String( this, "" );
	}

	public readonly id;
	public readonly 一致前;
	public readonly 一致;
	public readonly 一致後;
	public readonly en;
	public readonly ja;
}

