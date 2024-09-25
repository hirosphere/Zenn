import { log } from "../common.js";

import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

export class PartsColl
{
	constructor
	(
		ce : Element,
		df : DocumentFragment,
		def : defs.part [],
		start : number = 0
	)
	{
		this.expand( ce, df, def );
	}

	protected expand
	(
		ce : Element | undefined,
		df : DocumentFragment,
		def : defs.part []
	)
	{
		for( const part of def )
		{
			if( part instanceof nodet.Nodet )
			{
				part.node && df.appendChild( part.node );
			}

			else if( part instanceof Node )
			{
				df.appendChild( part );
			}

			else
			{
				const n = new nodet.Text( part );
				n.node && df.appendChild( n.node );
			}
		}
	}

	public destruct()
	{
		;
	}
}

