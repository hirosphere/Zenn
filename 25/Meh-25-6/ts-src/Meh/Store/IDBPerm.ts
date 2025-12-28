
const bcast = new BroadcastChannel ( "BC" ) ;

export class Perm
{
	constructor
	(
		public readonly idb_name : string ,
	)
	{}

	public item < V > ( opt : Perm.item_option ) :Perm.Item < V >
	{
		const item = new Perm.Item < V > ( opt ) ;
		return item ;
	}
}


export namespace Perm
{
	/* */

	export type item_option =
	{
		readonly name : string ;
		readonly session ? : boolean ;
	} ;
	export class Item < V >
	{
		constructor ( public readonly opt : Perm.item_option )
		{}
	}
}


function next_session () : string
{
	const ss_name = "MEH_IDB_PERM" ;
	const id = sessionStorage.getItem ( ss_name ) ;
	if ( id )  return id ;

	const ls_name = "MEH_IDB_PERM_NEXT_SESSION" ;
	let next = Number ( localStorage.getItem ( ls_name ) ) ?? 1 ;
	localStorage.setItem ( ls_name , JSON.stringify ( next + 1 ) ) ;

	const rt = "Session-" + next ;
	sessionStorage.setItem ( ss_name , rt ) ;
	return rt ;
}

const session_id = next_session () ;

bcast.postMessage ( { session_id , date : new Date ().toLocaleString () } ) ;
