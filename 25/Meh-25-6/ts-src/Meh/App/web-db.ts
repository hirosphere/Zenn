const log = console.log ;

export type DBSchema =
{
	name : string ;
	version : number ;
}

export type SP < K > =
{
	keyPath : K ;
	autoIncrement ? : boolean ;
} ;

export class IDB
{
	stores = new Map < string , IDB.Store < any , any , any > > ;
	core ? : IDBDatabase ;

	constructor ( protected schema : DBSchema )
	{}

	init () : void
	{
		try
		{
			const oreq = indexedDB.open ( this.schema.name , this.schema.version ) ;

			oreq.onsuccess = ev =>
			{
				this.core = oreq.result ;
				log ( this.core ) ;
				this.on_open_db () ;
			}
		
			oreq.onupgradeneeded = ev =>
			{
				log ( "upgrade" , ev ) ;
				make_store ( oreq.result , this.stores ) ;
			}
		
			oreq.onerror = ev =>
			{
				log ( ev ) ;
			}
		}
		catch ( err )
		{
			log ( err ) ;
		}
	}

	on_open_db () : void {}
}

const make_store = ( db : IDBDatabase , stores : Map < string , IDB.Store < any , any , any > > ) =>
{
	stores.forEach
	(
		store =>
		{
			log ( store.name , db.objectStoreNames.contains ( store.name ) )
			if ( db.objectStoreNames.contains ( store.name ) == false )
			{
				db.createObjectStore ( store.name , store.param ) ;
				log ( "create store" , store.name ) ;
			}
		}
	)
}

export namespace IDB
{
	export class Store < R extends object , K extends keyof R , KT extends ( number | string ) >
	{
		constructor ( public db : IDB , public name : string , public param : SP < K > )
		{
			db.stores.set ( name , this ) ;
		}
	
		public add ( value : R , tr ? : IDBTransaction )
		{
			const db = this.db.core ;
			log ( db ) ;
			if ( ! db )  return ;
			tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
			const preq = tr.objectStore ( this.name ) .add ( value ) ;
			preq.onsuccess = () => log ( this.name , "add" , value )
		}
	
		public set ( value : R & { K : KT } , tr ? : IDBTransaction )
		{
			const db = this.db.core ;
			log ( db ) ;
			if ( ! db )  return ;
			tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
			const preq = tr.objectStore ( this.name ) .put ( value ) ;
			preq.onsuccess = () => log ( this.name , "set" , value )
		}
	
		public async get ( key : KT , tr ? : IDBTransaction ) : Promise < R & { K : KT } >
		{
			const f = ( resolve : ( v : R & { K : KT } ) => void , reject : ( v ? : any ) => void ) =>
			{
				try
				{
					if( ! this.db.core ) throw new Error ( "Coreがないよ。" ) ;
					tr ??= this.db.core.transaction ( [ this.name ] , "readonly" ) ;
					if( ! tr ) throw new Error () ;
	
					const st = tr.objectStore ( this.name ) ;
					const req = st.get ( key ) ;
					req.onsuccess = ev =>
					{
						resolve ( req.result ) ;
					}
				}
	
				catch ( err )
				{
					reject ( err ) ;
				}
			}
	
			return new Promise ( f ) ;
		}
	}	
}

