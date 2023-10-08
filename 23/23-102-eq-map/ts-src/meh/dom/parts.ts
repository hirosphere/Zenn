import { defs } from "./defs.js";
import { Component, bindText } from "./compo.js";

export class Parts
{
	static create( compo : Component, e : Element, def : defs.Part [], partdefindex : number = 0 )
	{
		const parts = new Parts( compo, e, def, partdefindex );
	}

	//  //

	protected nodes = new Array < Node > ;

	protected next ? : Parts;
	protected prev ? : Parts;

	constructor( private compo : Component, private ce : Element, def : defs.Part[], partdefindex : number )
	{
		compo.partsList ??= this;

		while( partdefindex < def.length )
		{
			const partdef = def[ partdefindex ++ ];
			const part = this.createPart( partdef, ce );
			this.nodes.push( part );
		}
	}

	protected createNext( def : defs.Part[] )
	{
		;
	}

	public get last() : Node | null
	{
		return last < Node > ( this.nodes ) || null;
	}

	protected createPart( def : defs.Part, ce : Element ) : Element | Text
	{
		if( typeof def == "object" && "isElement" in def )
		{
			return this.compo.createElement( def, ce );
		}
		
		const n = document.createTextNode( "" );
		bindText( n, "nodeValue", def, this.compo.refs );
		ce.appendChild( n );

		return n;
	}

	public delete()
	{
		this.next?.delete();
	}
}

function last < T > ( arr : Array < T > ) : T | undefined
{
	return arr[ arr.length - 1 ];
}
