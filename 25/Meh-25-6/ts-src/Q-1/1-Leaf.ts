import { ru , setValue , terminate } from "../Meh/Model/Symbol.js" ;
import { Life , State , Leaf , leaf , log } from "../Meh/Meh.js" ;

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

	const addlf = ( lf : State.RO < any > ) =>
	{
		const ref =
		{
			vChan : () =>
			{
				const text = `${ lf [ ru ] } vChan ${ lf.$ }` ;
				ecr ( ul , "li" , { text } );
			} ,

			lTerm : () =>
			{
				const text = `${ lf [ ru ] } lTerm` ;
				ecr ( ul , "li" , { text } );
			} ,
		}

		lf.$_addRef ( ref ) ;
	}

	return { addlf }
}


{
	const flog = flog_new ( "vchan" ) ;

	const lf = leaf ( 0 ) ;
	flog.addlf ( lf ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	const cv = lf.$_conv ( v => `* ${ ( v / 7 ).toFixed ( 3 ) } *` ) ;
	flog.addlf ( cv ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;
	lf.$ *= 10 ;

	lf [ terminate ] () ;
}


{
	/* リードオンリー検査 */

	const lf1 = leaf ( "ところざわ" ) ;

	const rr : State.RO < any > = lf1 ;

	lf1.$ += "*" ;
	lf1 [ setValue ] ( "" ) ;
	
	// rr.$ = "" ;
	rr.$_conv ( s => false ) ;

	const lf2 = leaf ( 5 ) ;

}
