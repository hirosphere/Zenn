import { Exist, Leaf, navi, root, log } from "../../meh/index.js";

const br = new navi.Browser( root, { default_title: "Wow Wow Wow !!" } );

export class App extends Exist
{
	constructor( com : Exist )
	{
		super( com );

		br.set_current( this.root );
	}

	public readonly root = new Root( this );
}

export class Index extends navi.Index
{
	protected async fetch() {}
}

namespace types
{
	export type root = { response : { area : string [] } };
}


export class Root extends Index
{
	constructor( com : Exist )
	{
		super( com, { title: "Heart Rails !" } );

		this.fetch();
	}

	protected override async fetch()
	{
		const res = await fetch( "./data/rails/area.json" );
		if( res.ok )
		{
			const s = ( await res.json() ) as types.root;
			
			const parts = s.response.area.map
			(
				title => new Index( this, { title } )
			);

			this.parts.new_orders( parts );
		}

		log( res );
	}
}
