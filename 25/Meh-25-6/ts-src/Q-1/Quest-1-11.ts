import * as Meh from "../Meh/Meh.js" ;
import { Life , Leafr , Leaf , ru , log } from "../Meh/Meh.js" ;

console.log ( "Meh-25-6" ) ;

Meh.log ;


const addlog = ( lr : Leafr < any > ) =>
{
	const ref : Leafr.Ref < any > =
	{
		lterm : () => log ( `${ lr [ ru ] } lterm` ) ,
		vchan : ( n , o ) => log ( `${ lr [ ru ] } vchan ${ o } => ${ n }` ) 
	}

	lr.addRef( ref ) ;
}

const sep = ( t : string ) => log ( `\t** ${ t } **\t` ) ;

sep ( "R" ) ;

{
	const lr = Leafr ( 111 ) ;

	addlog ( lr ) ;

	lr [ Leafr.setValue ] ( 222 ) ;
	lr [ Leafr.setValue ] ( 444 ) ;
	lr [ Leafr.setValue ] ( 666 ) ;

	lr.terminate () ;
}

sep ( "R Conv" ) ;

{
	const lr = Leafr ( 0 ) ;

	addlog ( lr ) ;
	
	const cr = lr.cvr < string >
	(
		s => ( s * 100 ) .toFixed ( 1 ) + "%" ,
		r => ( parseFloat ( r ) ?? 0 ) / 100
	) ;

	addlog ( cr ) ;

	lr [ Leafr.setValue ] ( 0.0555 ) ;
	lr [ Leafr.setValue ] ( 0.555 ) ;
	lr [ Leafr.setValue ] ( 5.55 ) ;

	cr [ Leafr.setValue ] ( "777" ) ;
	cr [ Leafr.setValue ] ( "77.7" ) ;
	cr [ Leafr.setValue ] ( "7.7" ) ;

	lr.terminate () ;
}

sep ( "RW" ) ;

{
	const l = Leaf ( 111 ) ;

	addlog ( l ) ;
	
	l.$ = 555 ;
	l.$ = 777 ;
	l.$ = 999 ;

	l.terminate () ;
}

sep ( "RW Conv" ) ;

{
	const l = Leaf ( 1 ) ;

	addlog ( l ) ;

	const c = l.cv
	(
		s => "*" .repeat ( s ) ,
		r => r.length
	)

	addlog ( c ) ;
	
	l.$ = 5 ;
	l.$ = 10 ;
	l.$ = 20 ;

	c.$ = "**************" ;
	c.$ = "*************" ;
	c.$ = "************" ;
	c.$ = "***********" ;
	c.$ = "**********" ;

	l.terminate () ;
}
