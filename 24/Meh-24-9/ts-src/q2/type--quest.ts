
type StoreSchema < R , P , K > =
{
	set_data ( v : R & P , store : IDBObjectStore ) : void ;
	get_key ( r : P ) : K ;
}

const store_schema : StoreSchema < {} , { id : number } , number > =
{
	set_data : ( r , s ) =>
	{
		s.put ( r ) ;
	},

	get_key : r => r.id ,
}

class Store < R , P , K >
{
	constructor ( public schema : StoreSchema < R , P , K > )
	{
	}

	set ( r : R & P )
	{
		const key = this.schema.get_key ( r ) ;
	}
}