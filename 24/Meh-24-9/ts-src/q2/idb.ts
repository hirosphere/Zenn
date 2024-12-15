const log = console.log ;

export type db_schema < SS extends stores > =
{
	name : string ;
	version : number ;
	stores : stores_schema < SS > ;
}

export type stores_schema < SS extends stores >  =
{
	[ name in keyof SS ] : store_schema < SS [ name ] , any , any > ;
}

export type store_schema < R , KP , K > =
{
	keyPath : string ,
	make ( key : K , record : R ) : R & KP ;
	autoIncrement ? : boolean ;
	defval ? : R ;
}


/* */

export type stores = Record < string , any > ;

export const create = < SS extends stores >
(
	schema : db_schema < SS >

) : Promise < DB < SS > > =>
{
	const orq = indexedDB.open ( schema.name , schema.version ) ;

	return new Promise
	(
		( resolve , reject ) =>
		{
			orq.onupgradeneeded = ev =>
			{
				log ( "new schema ver " , schema.version ) ;
				const db = ( ev.target as IDBRequest ) .result as IDBDatabase ;
				Object.keys( schema.stores ).forEach
				(
					( name ) => store_update_schema ( db , name , schema.stores )
				) ;
			}
		
			orq.onsuccess = ev =>
			{
				const db : IDBDatabase = orq.result ;		
				log ( "DB 成功 !!" , db ) ;
				resolve ( new DB ( db , schema ) ) ;
			}
		
			orq.onerror = ( ev ) =>
			{
				log ( "DB 失敗 !!" , orq.error ) ;
				reject ( new Error ( "DBオープンのエラー。 " + orq.error ,  ) ) ;
			}
		}
	)
}

const store_update_schema = < SS extends stores >
(
	db : IDBDatabase ,
	name : string ,
	schemata : stores_schema < SS >

) =>
{
	if( ! db.objectStoreNames.contains ( name ) )
	{
		log ( "new store" , name ) ;
		db.createObjectStore ( name , schemata [ name ] ) ;
	}
}




/* */

export class DB < SS extends stores >
{
	stores : Stores < SS > ;

	constructor
	(
		protected db : IDBDatabase ,
		schema : db_schema < SS >
	)
	{
		const stores : any = {} ;

		Object.keys ( schema.stores ).map
		(
			( name ) => stores [ name ] = new Store ( db , name , schema.stores [ name ] )
		)

		this.stores = stores ;
	}

	public transaction ( stores : ( keyof SS ) [] , mode : IDBTransactionMode , tr : transaction ) : Promise < void >
	{
		return new Promise
		(
			( resolve , reject ) =>
			{
				tr ( this.db.transaction ( stores.join ( " " ) , mode ) ) ;
			}
		)
	}

}

type Stores < SS extends stores > =
{
	[ name in keyof SS ] : Store < SS [ name ] > ;
}

export class Store < R >
{
	constructor
	(
		protected db : IDBDatabase ,
		public readonly name : string ,
		protected schema : store_schema < R >
	)
	{
	}

	public list () : Promise < any [] >
	{
		return new Promise
		(
			( resolve , reject ) =>
			{
				resolve ( [] )
			}
		) ;
	}

	public set ( key : string , value : R ) : Promise < void >
	{
		const tr = this.db.transaction ( [ this.name ] , "readwrite" ) ;
		const st = tr.objectStore ( this.name ) ;
		const rq = st.put ( value , key ) ;
		
		return new Promise
		(
			( resolve , reject ) =>
			{
				rq.onsuccess = ev => resolve () ;
				rq.onerror = ev => reject ( rq.error ) ;
			}
		)
	}

	public new ( value ? : R , tr ? : IDBTransaction ) : Promise < R >
	{		
		return new Promise < R >
		(
			( resolve , reject ) =>
			{
				const tr = this.db.transaction ( [ this.name ] , "readwrite" ) ;
				tr.onerror = ev => reject ( tr.error ) ;

				const st = tr.objectStore ( this.name ) ;

				const rq = st.add ( value ?? this.schema.defval ) ;
				rq.onsuccess = ev =>
				{
					const new_key = ( ev.target as IDBRequest ) .result ;
					log ( `Store ${ this.name } new key : ${ new_key } ` , value )
					resolve ( {  } ) ;
				}

				rq.onerror = ev => reject ( rq.error ) ;
			}
		)
	}

	public get ( key : string ) : Promise < R >
	{		
		return new Promise < R >
		(
			( resolve , reject ) =>
			{
				log ( "Store get" , this.db.name , this.name )

				const tr = this.db.transaction ( [ this.name ] , "readonly" ) ;
				tr.onerror = err => reject ( err ) ;

				const st = tr.objectStore ( this.name ) ;
				const rq = st.get ( key ) ;
		
				rq.onsuccess = ev =>
				{
					log ( "store get success result :", rq.result )
					resolve ( rq.result ) ;
				}
				rq.onerror = ev => reject ( rq.error ) ;
			}
		)
	}
}

type transaction = ( tr : IDBTransaction ) => void
