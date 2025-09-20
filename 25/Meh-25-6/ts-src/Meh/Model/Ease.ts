import { LS , Agg , ls_set , ls_get } from "./LiveState.js" ;
import { Renn } from "./Marker.js" ;

export function Ease < V > ( newv : V ) : Ease < V >
{
	return {} as any;
}

export type Ease < V > =
(
	V extends object ?
	(
		V extends Array < infer E > ?
			Row < E > :
			Branch < V >
	)
	: LS < V >
) ;

type Branch < V extends object > = LS < V > & Agg &
{
	[ prop in keyof V ] : Ease < V [ prop ] >
} ;


export type Row < E > = LS < E [] > & Agg &
{
	renn : Renn < E > ;

	at ( pos : number ) : Ease < E > | undefined ;
	insert ( vs : E [] ) : void ;
	delete () : void ;
	clear () : void ;
}


/* */

export class BranchCore < V extends object >  extends LS.Core < V >
{
	public [ ls_set ] ( newv : V , ch ? : object ) : void
	{}

	public [ ls_get ] () : V
	{
		return {} as any ;
	}
}


const lv = 0 ;
const xy = { x : 55 } ;
const shape = { size : xy } ;

( e : Ease < number > ) => e.$ = 5 ;
( e : Ease < typeof xy > ) => e.x.$ = 5 ;
( e : Ease < typeof xy > ) => e.$ = xy ;
( e : Ease < typeof shape > ) => e.size.x.$ = 5 ;
( e : Ease < typeof shape > ) => e.$ = shape ;

( e : Ease < typeof shape > ) =>
{
	e.add_ref ( { vChan : () => console.log } ) ;
}


( rw : Ease < typeof shape [] > ) =>
{
	rw.add_ref ( { vChan : () => console.log } ) ;
	rw.$ = [ shape , shape ] ;

	const e = rw.at ( 0 ) ;
	e && e.size.x.set ( xy.x ) ;

	rw.$ [ 0 ] ?.size.x.toFixed ( 2 ) ;
}
