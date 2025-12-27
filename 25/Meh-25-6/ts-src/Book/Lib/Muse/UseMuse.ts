
import { Node , Osc , Gain , gain , Composite } from "./AudioNode.js" ;



class Inst
{
	public put ()
	{
		;
	}
}


class InstPart
{
	;
}


class Voice extends Composite
{
	protected override init () : void
	{
		const main = new Gain
		(
			new Osc ( { freq : 438 , pitch : 0 } , this ) ,
			{ gain : 0 ,  } ,
			this
		)
	}
}


/* */

type dp < V > = Partial < V > ;
type rt < F extends () => any > = ReturnType < F > ;


function number ( i ? : number ) : number { return i ?? 0 }

namespace byctor
{
	const xy = branch ( { x : number , y : number } ) ;
	type xy = rt < typeof xy > ;

	const rect = branch ( { pos : xy , size : xy } ) ;
	type rect = rt < typeof rect > ;

	function branch ( def : any ) : any {}
}


namespace bytype
{
	type xy = { x : number ; y : number ; } ;

	function xy ( i ? : dp < xy > ) : xy
	{
		return {
			x : number ( i ?.x ) ,
			y : number ( i ?.y )
		} ;
	}

	type rect = { pos : xy ; size : xy ; } ;

	function rect ( i ? : rect ) : rect
	{
		return {
			pos : xy ( i ?.pos ) ,
			size : xy ( i ?.size )
		} ;
	}
}

namespace byclass
{
	class xy
	{
		x : number ; y : number ;

		constructor ( i ? : dp < xy > )
		{
			this.x = number ( i ?.x ) ;
			this.y = number ( i ?.y ) ;
 		}
	}

	class rect
	{
		pos : xy ; size : xy ;

		constructor ( i ? : dp < rect > )
		{
			this.pos = new xy ( i ?.pos ) ;
			this.size = new xy ( i ?.size ) ;
		}
	}
}
