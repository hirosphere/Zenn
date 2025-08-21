import { log , Leaf , Compo } from "../Meh/Meh.js" ;

const Qst1 = () =>
{
	const n1 = Leaf ( 1 ) ;

	Leaf.addRef ( n1 , { vChan : () => log ( "vChan" , n1.$ ) } ) ;

	n1.$ ++ ;
	n1.$ ++ ;
	n1.$ ++ ;
	n1.$ ++ ;

	log ( n1.$ ) ;
}


Qst1 () ;
