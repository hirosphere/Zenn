import { log } from "../Util.js" ;
import { Leaf } from "../Model/Model.js" ;
import * as DD from "./DD.js" ;
import { PartsPlace } from "./PartsPlace.js" ;

export abstract class MehNode
{
	public abstract node : Node ;

	protected bindValue ( ll : DD.Text , update : ( new_v : DD.Literal ) => void ) : void
	{
		if ( ! ( ll instanceof Object ) )
		{
			update ( ll ) ;
		}

		else if ( ll instanceof Leaf )
		{
			ll.addRef ( { vchan : update } ) ;
		}
	}
}



/**  */

export class MehText extends MehNode
{
	protected p_node : Node ;
	constructor ( text : DD.Text )
	{
		super () ;

		this.p_node = document.createTextNode ( "" ) ;

		this.bindValue
		(
			text ,
			new_v => this.p_node.nodeValue = String ( new_v )
		) ;
	}

	public get node () : Node
	{
		return this.p_node ;
	}
}


/*  */

export class MehElement extends MehNode
{
	public readonly el : Element ;

	protected p_parts : PartsPlace | null = null ;


	constructor
	(
		ns : string ,
		type : string ,
		dec : DD.Element ,
		parts : DD.Part [] ,
	)
	{
		super () ;

		const { target } = dec ;

		this.el =
		(
			target instanceof Element ? target :
			document.createElement ( type )
		) ;

		/* parts */

		log ( type , parts )

		if ( parts ) this.p_parts = PartsPlace.create ( parts , this.el ) ;
	}

	public get node () : Node
	{
		return this.el ;
	}
}
