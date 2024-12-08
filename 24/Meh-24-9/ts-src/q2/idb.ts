const log = console.log ;

export type stores_type = Record < string , any > ;

export namespace schema
{
	export type db < S extends stores_type > =
	{
		name : string ;
		version : number ;
		stores : stores < S > ;
	}
	
	export type stores < S extends stores_type > =
	{
		[ name in keyof S ] : store < S [ name ] > ;
	}
	
	export type store < R = any > =
	{
		keyPath ? : string ;
		autoIncrement ? : boolean ;
		defval ? : R ;
	}	
}

export const create = < S extends stores_type >
(
	schema : schema.db < S >

) : Promise < DB < S > > =>
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

const store_update_schema = < S extends stores_type >
(
	db : IDBDatabase ,
	name : string ,
	schemata : schema.stores < S >

) =>
{
	if( ! db.objectStoreNames.contains ( name ) )
	{
		log ( "new store" , name ) ;
		db.createObjectStore ( name , schemata [ name ] ) ;
	}
}




/* */

type Stores < SS extends stores_type > =
{
	[ name in keyof SS ] : Store < SS [ name ] > ;
}

export class DB < S extends stores_type >
{
	stores : Stores < S > ;

	constructor
	(
		protected db : IDBDatabase ,
		schema : schema.db < S >
	)
	{
		const stores : any = {} ;

		Object.keys ( schema.stores ).map
		(
			( name ) => stores [ name ] = new Store ( db , name , schema.stores [ name ] )
		)

		this.stores = stores ;
	}
}

export class Store < R >
{
	constructor
	(
		protected db : IDBDatabase ,
		public readonly name : string ,
		protected schema : schema.store < R >
	)
	{
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

	public new ( defv ? : R ) : Promise < R >
	{		
		return new Promise < R >
		(
			( resolve , reject ) =>
			{
				log ( "Store new" , this.db.name , this.name )

				const tr = this.db.transaction ( [ this.name ] , "readwrite" ) ;
				tr.onerror = ev => reject ( tr.error ) ;

				const st = tr.objectStore ( this.name ) ;

				const rq = st.add ( defv ?? this.schema.defval ) ;
				rq.onsuccess = ev =>
				{
					const new_key = ( ev.target as IDBRequest ) .result ;
					log ( `Store ${ this.name } new key : ${ new_key } ` )
					// resolve ( rq.result ?? defv ?? this.defv ) ;
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

