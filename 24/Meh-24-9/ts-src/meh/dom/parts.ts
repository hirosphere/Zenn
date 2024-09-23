import { log } from "../common.js";

import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";

export class Parts
{
	constructor( def : defs.node [], df : DocumentFragment )
	{
		for( const part of def )
		{
			if( part instanceof Nodet )
			{
				part.node && df.appendChild( part.node );
			}

			else if( part instanceof Node )
			{
				df.appendChild( part );
			}

			else
			{
				const n = new Nodet( { text: part } );
				n.node && df.appendChild( n.node );
			}
		}
	}
}

