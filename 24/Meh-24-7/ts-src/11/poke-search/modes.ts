import { Exist, Leaf, log } from "../../meh/index.js";
import * as data from "./data/items.js";

export class App extends Exist
{
	public readonly search = new Leaf.String( this, "poke", () => this.search_changed() );

	public readonly items = Array.from
	(
		data.itemMap.values(),
		( value ) => new Item( this, value )
	);

	search_changed()
	{
		log( "changed", this.search.value );

		const s = this.search.value;

		this.items.forEach
		(
			item => item.setSearch( s )
		);
	}

}

export class Item extends Exist
{
	constructor( com : Exist, data : data.Item )
	{
		super( com );

		this.id = data.id;
		this.en = data.en;
		this.ja = data.ja;

		this.一致前 = new Leaf.String( this, this.en );
		this.一致 = new Leaf.String( this, "" );
		this.一致後 = new Leaf.String( this, "" );
	}

	public setSearch( word : string )
	{
		this.一致.value = ( this.en.search( word ) ).toString();
	}

	public readonly id;
	public readonly 一致前;
	public readonly 一致;
	public readonly 一致後;
	public readonly en;
	public readonly ja;
}

