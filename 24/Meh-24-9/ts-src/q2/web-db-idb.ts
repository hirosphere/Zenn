const log = console.log ;

export type DBSchema =
{
	name : string ;
	version : number ;
}

export type SP = IDBObjectStoreParameters ;

export class DB
{
	stores = new Map < string , Store < any , any > > ;
	db ? : IDBDatabase ;

	init ( sch : DBSchema ) : void
	{
		try
		{
			const oreq = indexedDB.open ( sch.name , sch.version ) ;

			oreq.onsuccess = ev =>
			{
				this.db = oreq.result ;
				log ( this.db ) ;
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

const make_store = ( db : IDBDatabase , stores : Map < string , Store < any , any > > ) =>
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

export class Store < R , I >
{
	constructor ( public db : DB , public name : string , public param : SP )
	{
		db.stores.set ( name , this ) ;
	}

	add ( value : R , tr ? : IDBTransaction )
	{
		const db = this.db.db ;
		log ( db ) ;
		if ( ! db )  return ;
		tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
		const preq = tr.objectStore ( this.name ) .add ( value ) ;
		preq.onsuccess = () => log ( this.name , "add" , value )
	}

	set ( value : R & I , tr ? : IDBTransaction )
	{
		const db = this.db.db ;
		log ( db ) ;
		if ( ! db )  return ;
		tr ??= db.transaction ( [ this.name ] , "readwrite" ) ;
		const preq = tr.objectStore ( this.name ) .put ( value ) ;
		preq.onsuccess = () => log ( this.name , "set" , value )
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
			this.todo_1 = new Store < todo , idr > ( this, "todo_1" , sp ) ;
			this.todo_2 = new Store < todo , idr > ( this, "todo_2" , sp ) ;
			this.todo_3 = new Store < todo , idr > ( this, "todo_3" , sp ) ;

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
