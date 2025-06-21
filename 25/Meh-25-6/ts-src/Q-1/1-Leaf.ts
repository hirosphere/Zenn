import * as Meh from "../Meh/Meh.js" ;
import { Life , Leaf , ru , log } from "../Meh/Meh.js" ;

console.log ( "Meh-25-6" ) ;


const dlog_e = document.getElementById ( "log" ) ;

const ecr = ( com : Element | null , type : string , text ? : string ) : HTMLElement =>
{
	const e = document.createElement ( type ) ;
	if ( text != null ) e.textContent = text ;
	com?.appendChild ( e ) ;
	return e ;
}

const dlog = ( title : string ) =>
{
	const e = ecr ( dlog_e , "section" ) ;
	ecr ( e , "h2" , title ) ;
	
	return ( leaf : Leaf < any > ) =>  leaf.addRef ( cr_ref ( e , leaf ) ) ;
}

const cr_ref = ( e : Element , lf : Leaf < any > ) =>
({
	vchan ( n : any , o : any ) { ecr ( e , "div" , `${ lf [ ru ] } vchan ${ n }` ) ; }
}) ;

{
	const addlog = dlog ( "Leaf" ) ;

	const lf = Leaf.cr ( 0 ) ;
	addlog ( lf ) ;

	lf.$ ++ ;
	lf.$ *= 10 ;
}
