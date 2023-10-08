import { defs } from "./defs.js";
import { Component, bindText } from "./compo.js";
import { Lian } from "../model/lian.js";

const log = console.log;

export abstract class Parts
{
	static create( compo : Component, e : Element, partsDef : defs.Part [], index : number = 0 )
	{
		const partDef = partsDef[ index ];
		
		if( partDef instanceof defs.LianParts )
		{
			;
		}

		else new StaticParts( compo, e, partsDef, index );
	}

	//  //

	protected nodes = new Array < Node > ;

	protected next ? : Parts;
	protected prev ? : Parts;

	constructor( protected compo : Component, protected ce : Element )
	{}

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


// static parts //

class StaticParts extends Parts
{
	constructor( compo : Component, ce : Element, def : defs.Part[], partdefindex : number )
	{
		super( compo, ce );

		compo.partsList ??= this;

		while( partdefindex < def.length )
		{
			const partdef = def[ partdefindex ++ ];
			const part = this.createPart( partdef, ce );
			this.nodes.push( part );
		}
	}
}


//  dynamic parts //

class DynamicParts extends Parts
{
	constructor( compo : Component, ce : Element, def : defs.LianParts )
	{
		super( compo, ce );

		def.source.ref( this.update );
	}

	protected update : Lian.Update = ( start : number, remove : number, add : number ) =>
	{
		log( "DynParts update", start, remove, add );
	}
}

function last < T > ( arr : Array < T > ) : T | undefined
{
	return arr[ arr.length - 1 ];
}
