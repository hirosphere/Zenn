import { LS , Agg } from "./LiveState.js" ;

export function Ease < V > ()
{
	;
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

type Row < E > = LS < E [] > & Agg &
{
	at ( pos : number ) : Ease < E > ;
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
