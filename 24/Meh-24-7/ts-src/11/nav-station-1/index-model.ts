import { Exist, Leaf, navi, log } from "../../meh/index.js";

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
	constructor( com : Exist, br : navi.Browser )
	{
		super( com, br, { title: "Heart Rails !" } );

		// this.parts.new_orders( [ "青砥", "高砂" ].map( title => new Index( this, br, { title } ) ) );
		
		this.fetch();
	}

	protected override async fetch()
	{
		const res = await fetch( "./data/rails/area.json" );
		if( res.ok )
		{
			const s = ( await res.json() ) as types.root;
			
			log( s.response.area );

			const parts = s.response.area.map
			(
				title => new Index( this, this.browser, { title } )
			);

			this.parts.new_orders( parts );
		}

		log( res );
	}
}
