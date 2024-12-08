import { leaf , Renn , dom , forms , ef , log } from "../meh/index.js" ;
import * as idb from "./idb.js" ;

namespace PS	// permanent
{
	/* DB Schemata */

	type stores =
	{
		"text-memo" : DM.record
	}

	const schema : idb.schema.db < stores > =
	{
		name : "db-quest" ,
		version : 1 ,
		stores :
		{
			"text-memo" :
			{
				keyPath : "id" ,
				autoIncrement : true ,
				defval : { title : "IndexDBは"  , text : "激メンドクサイけど、便利そう。" }
			}
		}
	}

	export type DB = idb.DB < stores > ;

	export const create = () => idb.create ( schema ) ;
}

namespace DM
{
	export class App
	{
		// record ;

		constructor ( protected db ? : PS.DB )
		{
			log ( "DM.App" , db ?.stores [ "text-memo" ] .name ) ;

			const store = db ?.stores [ "text-memo" ] ;
			
			if( store )
			{
				log ( store.name );
				store.set ( "5" , { title : "" , text : "" } )
			}

			// this.record  = new Record ( store ) ;
		}
	}

	export type record = { title : string , text : string }

	export class Record
	{
		title = leaf ( "" ) ;
		text = leaf ( "" ) ;

		constructor ( protected store ? : idb.Store < record > )
		{
			store ?.name ;
			store ?.new ();
		}

		set value ( v : record )
		{
			this.title.value = v.title ;
			this.text.value = v.text ;
		}

		get value () : record
		{
			return { title : this.title.value , text : this.text.value } ;
		}

		save ()
		{
			log ( this.title.value , this.text.value ) ;
			//this.store.set ( this.id , this.value )
		}
	}
}

namespace VC
{
	export const App = ( d : DM.App ) =>
	{
		return ef.main
		(
			ef.h1 ( "Indexed DB - 1" ) ,
			//Record ( d.record ) ,
		)
	}

	const Record = ( d : DM.Record ) =>
	{
		return ef.section
		(
			{ class : "record" } ,

			forms.input ( d.title ) ,
			forms.textarea ( d.text ) ,
			ef.button ( { acts : { click () { d.save () } } } , "保存" )
		)
	}
}

export const main = async () =>
{
	const db = await PS.create () ;
	dom.add ( VC.App ( new DM.App ( db ) ) , "body" ) ;
}

function upgrade ( db : IDBDatabase )
{
	if ( ! db.objectStoreNames.contains ( "docs" ) )
	{
		log ( "schema docs" ) ;
		db.createObjectStore ( "docs" ) ;
	}
}

