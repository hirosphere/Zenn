import { Life , Leaf , DOM , DD , ef , log } from "../Meh/Meh.js" ;

namespace VM
{
	const new_counter = ( time : number ) : Leaf.Entity < number > =>
	{
		const lf = Leaf ( 0 ) ;

		setInterval ( () => lf.$ ++ , time ) ;

		return lf ;
	}

	export const ct1 = new_counter ( 1000 ) ;
	export const ct2 = new_counter ( 1200 ) ;
	export const ct3 = new_counter ( 1400 ) ;

}


const tag = ( literals : TemplateStringsArray, ...placeholders: string[] ) =>
{
	;
}

tag `na na ${ VM.ct1.$.toString () } ` ;


namespace VC
{
	export const App = () =>
	{
		return ef.main ( "" , VM.ct1 ) ;
	}

}

export const App = () =>
{
	return ef.main ( 0 , "" , undefined , VM.ct1 , null , true , false , 0 , "" ,  ) ;
}


DOM.add ( ef.p ( App () ) , "#Main" )
DOM.add ( VC.App () , "#Main" )

DOM.add
(
	[ "DOM-1 " , " * " , VM.ct1 , " * " , VM.ct2 , " * " , VC.App () ] ,
	"#Main"
) ;
