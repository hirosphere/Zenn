
import { State , Leaf , Branch as Br } from "../Meh/Meh.js" ;
const log = console.log ;

namespace Sample
{
	const Struct = < Props extends Record < string , unknown > > ()
	
	: new ( props : Props ) => Readonly < Props > =>
	
	{
		abstract class Class
		{
			protected constructor ( props : Props )
			{
				Object.assign ( this , props );
			}
		}
	  
		return Class as any;
	} ;
}
