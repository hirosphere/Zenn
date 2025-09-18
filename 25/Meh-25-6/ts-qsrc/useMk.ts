import { Life , LS } from "./LiveState.js" ;
import { Renn , Order } from "./Marker.js" ;

const log = console.log ;

function qst1 ()
{
	const r = new Renn < string > ( [ "上野" , "日暮里" , "松戸" ] ) ;

	const ref : Renn.Ref < string > =
	{
		insert ( start , orders )
		{
			log ( "insert" , start , orders.map ( o => o.target ).join ( " " ) ) ;
			log ( r.orders.map ( o => `${ o } ${ o.target }` ) .join ( " " ) ) ;

			r.orders.toSorted ;
			r.targets.sort
		} ,

		delete ( start , length )
		{
			log ( "delete" , start , length ) ;
			log ( r.orders.map ( o => `${ o } ${ o.target }` ) .join ( " " ) ) ;
		}
	}

	r.add_ref ( ref ) ;

	r.insert ( [ "三河島" , "南千住" , "北千住" ] , -1000 ) ;

	r.delete ( 100 , 100 ) ;


	const o = r.at ( 0 ) ;
	// o && LS.set ( o , 5 ) ;

}


qst1 () ;