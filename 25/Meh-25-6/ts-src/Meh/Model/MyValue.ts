
type MyValue < V > =
{
	value : V ;
}

type Deep < V > =
(
	V extends object ?
	(
		V extends ( infer EV ) [] ?
			MyArray < EV > :
			MyStruct < V >
	) :
	MyValue < V >
) ;

type MyArray < E > = MyValue < E [] > &
{
	at ( pos : number ) : Deep < E > | undefined ;
	els : Deep < E > [] ;
} ;

type MyStruct < V > = MyValue < V > &
{
	[ prop in keyof V ] : Deep < V [ prop ] > ;
}


/* 応用 */

function toV < EV > ( ar : MyArray < EV > ) : EV []
{
	return ar.els.map ( e => e.value ) as EV [] ;
}

type xy = { x : number ;  y : number ; }

( d : Deep < xy > ) =>
{
	d.value = { x : 13 , y : 21 } ;
	const r = d.y.value / d.x.value ;

	d.x.value *= r ;
	d.y.value *= r ;
}


( d : Deep < xy [] > ) =>
{
	d.value = [ { x : 5 , y : 8 } , { x : 13 , y : 8 } ] ;

	const e = d.at ( 0 ) ;
	if ( e )
	{
		e.value = { x : 1 , y : 2 } ;
		e.x.value *= 2 ;
	}
}

