import * as Meh from "../Meh/Meh.js" ;
import { Life , State , ru , log } from "../Meh/Meh.js" ;
import { DM } from "./Branch-Color.js" ;

console.log ( "Meh-25-6" ) ;


const dlog_e = document.getElementById ( "log" ) as HTMLElement ;

type ecr =
{
	class ? : string ,
	text ? : string
}

const ecr = ( com : Element , type : string , p : ecr = {} ) : HTMLElement =>
{
	const e = document.createElement ( type ) ;
	if ( p.class ) e.className = p.class ;
	if ( p.text != undefined ) e.textContent = p.text ;
	com ?.appendChild ( e ) ;
	return e ;
}


const flog_new = ( title : string ) =>
{
	const e = ecr ( dlog_e , "article" , {} ) ;
	ecr ( e , "h2" , { text : title } ) ;
	const ul = ecr ( e , "ul" ) ;

	const addlf = ( lf : State.r < any > ) =>
	{
		const ref =
		{
			vchan : () =>
			{
				const text = `${ lf [ ru ] } vchan ${ lf.toString () }` ;
				ecr ( ul , "li" , { text } );
			} ,

			lterm : () =>
			{
				const text = `${ lf [ ru ] } lterm` ;
				ecr ( ul , "li" , { text } );
			} ,
		}

		lf.addRef ( ref ) ;
	}

	return { addlf }
}


{
	const flog = flog_new ( "vchan" ) ;

	const lf = State.new ( 0 ) ;
	flog.addlf ( lf ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	const cv = lf.cv ( v => `* ${ ( v / 7 ).toFixed ( 3 ) } *` ) ;
	flog.addlf ( cv ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	lf.terminate () ;
}


{
	/* リードオンリー検査 */

	const lf1 = State.new ( "ところざわ" ) ;

	const rr : State.r < any > = lf1 ;

	lf1.$ += "*" ;
	lf1.set ( "" ) ;
	// rr.$ = "" ;
	// rr.cv ( s => false , r => "" )

	const lf2 = State.new ( 5 ) ;

}

{
	const flog = flog_new ( "HSL" ) ;

	const cl = new DM.HSL ( { h:240 , s:0.5 , l:0.5 } ) ;

	flog.addlf ( cl ) ;
	flog.addlf ( cl.h ) ;
	flog.addlf ( cl.s ) ;
	flog.addlf ( cl.l ) ;
	flog.addlf ( cl.css ) ;

	cl.h.$ += 5 ;
	cl.h.$ += 5 ;

	cl.s.$ -= 0.1 ;
	cl.s.$ -= 0.1 ;

	cl.l.$ *= 0.8 ;
	cl.l.$ *= 0.8 ;
}
