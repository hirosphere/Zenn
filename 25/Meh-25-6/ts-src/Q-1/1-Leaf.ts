import * as Meh from "../Meh/Meh.js" ;
import { Life , Leaf , ru , log } from "../Meh/Meh.js" ;

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

	const add = ( lf : Leaf < any > ) =>
	{
		const ref =
		{
			vchan : ( v : any ) => vchan ( lf ) ,
		}

		lf.addRef ( ref ) ;
	}

	const vchan = ( lf : Leaf < any > ) =>
	{
		ecr ( e , "li" , { text : `${ lf [ ru ] } vchan ${ lf.$ }` } );
	}

	return { add }
}


{
	const flog = flog_new ( "vchan" ) ;

	const lf = Leaf.cr ( 0 ) ;
	flog.add ( lf ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	const cv = lf.cv ( v => `* ${ ( v / 7 ).toFixed ( 3 ) } *` ) ;
	flog.add ( cv ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	lf.terminate () ;
}
