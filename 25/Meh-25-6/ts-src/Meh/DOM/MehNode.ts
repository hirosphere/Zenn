import { log } from "../Util.js" ;
import { Leafr } from "../Model/Model.js" ;
import * as DD from "./DD.js" ;

export abstract class MehNode
{
	public abstract node : Node ;

	protected bindValue ( ll : DD.Text , update : ( new_v : DD.Literal ) => void ) : void
	{
		if ( ! ( ll instanceof Object ) )
		{
			update ( ll ) ;
		}

		else if ( ll instanceof Leafr.Base )
		{
			ll.addRef ( { vchan : update } ) ;
		}
	}
}

export class MehText extends MehNode
{
	protected p_node : Node ;

	constructor ( arg : DD.Text )
	{
		super () ;

		this.p_node = document.createTextNode ( "" ) ;

		this.bindValue ( arg , new_v => this.p_node.nodeValue = String ( new_v ) ) ;
	}

	public get node () : Node
	{
		return this.p_node ;
	}
}

export class MehElement
{

}
