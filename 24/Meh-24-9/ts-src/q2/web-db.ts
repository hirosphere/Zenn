import { leaf , Renn , dom , forms , ef , log } from "../meh/index.js" ;
import { idb_quest } from "./web-db-idb.js" ;

namespace VC
{
	export const App = (  ) =>
	{
		idb_quest () ;

		return ef.main
		(
			ef.h1 ( "Indexed DB - 1" ) ,
			//Record ( d.record ) ,
		)
	}

	const Pane = (  ) =>
	{
		return ef.section
		(
			ef.button ( { acts : { click () {   ; } } } , "New" ) ,
		)
	}
}

export const main = async () =>
{
	dom.add ( VC.App () , "body" ) ;
}

function upgrade ( db : IDBDatabase )
{
	if ( ! db.objectStoreNames.contains ( "docs" ) )
	{
		log ( "schema docs" ) ;
		db.createObjectStore ( "docs" ) ;
	}
}

