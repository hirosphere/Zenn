import { Exist, Leaf, log } from "../../meh/index.js";
import * as data from "./data/items.js";

export class PokeList extends Exist
{
	public readonly search = new Leaf.String( this, "poke", () => this.start_search() );

	public readonly items = Array.from
	(
		data.itemMap.values(),
		( value ) => new PokeItem( this, value )
	);

	protected iid = 0;

	protected start_search()
	{
		log( "changed", this.search.value );

		const s = this.search.value;

		this.items.forEach
		(
			item => item.setSearch( s )
		);
	}

	protected search_current = 0;

	protected search_step()
	{
		;
	}

}

export class PokeItem extends Exist
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

	public setSearch( query : string )
	{
		const name = this.en;
		let start = name.toLowerCase().indexOf( query.toLowerCase() );
		if( start < 0 ) start = name.length;
		const end = start + query.length;

		this.一致前.value = name.substring( 0, start );
		this.一致.value = name.substring( start, end );
		this.一致後.value = name.substring( end, name.length );
	}

	public readonly id;
	public readonly 一致前;
	public readonly 一致;
	public readonly 一致後;
	public readonly en;
	public readonly ja;
}

