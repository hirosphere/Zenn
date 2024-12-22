const log = console.log ;

export type DBSchema =
{
	name : string ;
	version : number ;
}

export type SP = IDBObjectStoreParameters ;

export class DB
{
	stores = new Map < string , Store < any , any , any > > ;
	core ? : IDBDatabase ;

	init ( sch : DBSchema ) : void
	{
		try
		{
			const oreq = indexedDB.open ( sch.name , sch.version ) ;

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

const make_store = ( db : IDBDatabase , stores : Map < string , Store < any , any , any > > ) =>
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

export class Store < R , KR , K extends ( number | string ) >
{
	constructor ( public db : DB , public name : string , public param : SP )
	{
		db.stores.set ( name , this ) ;
	}

	add ( value : R , tr ? : IDBTransaction )
	{
		const db = this.db.core ;
		log ( db ) ;
		if ( ! db )  return ;
		tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
		const preq = tr.objectStore ( this.name ) .add ( value ) ;
		preq.onsuccess = () => log ( this.name , "add" , value )
	}

	set ( value : R & KR , tr ? : IDBTransaction )
	{
		const db = this.db.core ;
		log ( db ) ;
		if ( ! db )  return ;
		tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
		const preq = tr.objectStore ( this.name ) .put ( value ) ;
		preq.onsuccess = () => log ( this.name , "set" , value )
	}

	get ( key : K , tr ? : IDBTransaction ) : Promise < R & KR >
	{
		const f = ( resolve : ( v : R & KR ) => void , reject : ( v ? : any ) => void ) =>
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


/* */

type todo  = { task : string , completed : boolean }
type idr = { id : number } ;

export const idb_quest = () =>
{
	const db = new class extends DB
	{
		todo_1 ;
		todo_2 ;
		todo_3 ;

		constructor ()
		{
			super () ;
			const sp : SP = { keyPath : "id" , autoIncrement : false } ;
			this.todo_1 = new Store < todo , idr , number > ( this, "todo_1" , sp ) ;
			this.todo_2 = new Store < todo , idr , number > ( this, "todo_2" , sp ) ;
			this.todo_3 = new Store < todo , idr , number > ( this, "todo_3" , sp ) ;

			this.init ( { name : "IDB-Quest" , version : 1 } ) ;
		}

		override on_open_db () : void
		{
			db.todo_1.set ( { id : 1 , task : "お風呂に入ろう" , completed : false } ) ;
			db.todo_2.set ( { id : 1 , task : "大地が球体か確認" , completed : true } ) ;
		}
	}
}

async function create_db ()
{
}
