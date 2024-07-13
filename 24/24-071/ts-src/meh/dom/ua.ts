import { Exist, Leaf, root } from "../model/index.js";

class Query extends Exist
{
	protected items = new Map < string, Leaf.String > ;

	public item( name : string ) : Leaf.String | undefined
	{
		if( ! this.items.has( name ) )
		{
			this.items.set( name, new Leaf.String( this, "" ) );
		}

		return this.items.get( name );
	}
}

const get_query = () =>
{
	const qlist = location.search;
}


const query = new Query( root );


export const ua = {  };

