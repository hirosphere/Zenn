import * as Meh from "../Meh/Meh.js" ;
import { Existence , Leafr , Leaf , setValue , ru , log } from "../Meh/Meh.js" ;

console.log ( "Meh-25-6" ) ;

Meh.log ;


( ex : Meh.Model.Existence ) =>
{
	ex.xt = () => log ( "xt" ) ;
} ;

const xlog = ( ex : Existence ) =>
(
	log ( `${ ex [ ru ] } xt` )
) ;

const vlog = ( new_v : any , old_v : any , ex : Existence ) =>
(
	log ( `${ ex [ ru ] } vc ${ new_v } ${ old_v }` )
) ;

const sep = ( t : string ) => log ( `\t** ${ t } **\t` ) ;


sep ( "LR" ) ;

{
	const lr = Leafr.create ( 111 ) ;
	
	lr.xt = xlog ;
	lr.vch = vlog ;

	lr [ setValue ] ( 222 ) ;
	lr [ setValue ] ( 444 ) ;
	lr [ setValue ] ( 666 ) ;

	lr.terminate () ;
}

sep ( "LR Conv" ) ;

{
	const lr = Leafr.create ( 0 ) ;
	lr.xt = xlog ;
	lr.vch = vlog ;
	
	const cr = lr.cvr < string >
	(
		s => ( s * 100 ) .toFixed ( 1 ) + "%" ,
		r => ( parseFloat ( r ) ?? 0 ) / 100
	) ;

	cr.xt = xlog ;
	cr.vch = vlog ;

	lr [ setValue ] ( 0.0555 ) ;
	lr [ setValue ] ( 0.555 ) ;
	lr [ setValue ] ( 5.55 ) ;

	cr [ setValue ] ( "777" ) ;
	cr [ setValue ] ( "77.7" ) ;
	cr [ setValue ] ( "7.7" ) ;

	lr.terminate () ;
}

sep ( "L" ) ;

{
	const l = Leaf.create ( 111 ) ;
	
	l.xt = xlog ;
	l.vch = vlog ;
	
	l.$ = 555 ;
	l.$ = 777 ;
	l.$ = 999 ;

	l.terminate () ;
}

sep ( "L Conv" ) ;

{
	const l = Leaf.create ( 1 ) ;
	
	l.xt = xlog ;
	l.vch = vlog ;

	const c = l.cv
	(
		s => "*" .repeat ( s ) ,
		r => r.length
	)

	c.vch = vlog ;
	
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
