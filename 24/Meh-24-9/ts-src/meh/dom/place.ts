import { defs } from "./defs.js" ;
import * as nodet from "./nodet.js" ;

export class Place
{
	protected next ? : Place ;

	constructor
	(
		protected el : Element ,
		protected prev ? : Place ,
	)
	{
		;
	}
}

export class FreePlace extends Place
{
	public add( def : defs.node )
	{}

	public set content( value : defs.node | defs.node [] )
	{}
}
