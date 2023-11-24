import { Owner, Exist, root } from "../model/index.js";
import { defs } from "./defs.js";
const log = console.log;

export const create = ( def : defs.Node, ce : Element ) =>
{
	new Nodet( root, def, ce );
};

/** class Nodet */

export class Nodet extends Exist
{
	constructor( owner : Owner, def : defs.Node, ce ? : Element )
	{
		super( owner );

		if( def instanceof defs.Element ) this.node = this.createElement( def );
		else this.node = this.createText( def );

		log( this.node.nodeName )
	}

	protected node ? : Node;

	protected createText( def : defs.Text ) : Text
	{
		const n = document.createTextNode( "" );
		return n;
	}

	protected createElement( def : defs.Element ) : Element
	{
		const e = document.createElement( def.type );

		return e;
	}


	/**  */

	public terminate(): void
	{
		delete this.node;
		
		super.terminate();
	}
}
