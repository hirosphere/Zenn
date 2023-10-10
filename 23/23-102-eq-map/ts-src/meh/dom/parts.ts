import { defs } from "./defs.js";
import { Component, bindText } from "./compo.js";
import { Lian } from "../model/lian.js";

const log = console.log;

// part def reader //

class Reader
{
	private index : number = 0;
	constructor( private parts : defs.Part[] ){}

	get cur() : defs.Part | undefined { return this.parts[ this.index ]; }
	get next() : defs.Part { return this.parts[ this.index ++ ]; }
	get hasnext() : boolean { return this.parts[ this.index ] != null; }
	get curisdyn() : boolean { return this.cur instanceof defs.ArrayParts; }
	
	get nextdyn() : defs.ArrayParts | undefined
	{
		const cur = this.cur;
		if( cur instanceof defs.ArrayParts )
		{
			this.index ++;
			return cur;
		}
	}
}


//  //

export class Parts
{
	static create( compo : Component, ce : Element, parts : defs.Part[] )
	{
		const rd = new Reader( parts );
		return new StaticParts( compo, ce, rd );
	}

	constructor( protected compo : Component, protected ce : Element ) {}

	//  //

	protected createPart( def : defs.Part ) : Element | Text
	{
		if( typeof def == "object" && "isElement" in def )
		{
			return this.compo.createElement( def, this.ce );
		}
		
		const n = document.createTextNode( "" );
		bindText( n, "nodeValue", def, this.compo.refs );
		this.ce.appendChild( n );

		return n;
	}

	delete() {}
}

// static parts //

export class StaticParts extends Parts
{
	public next ? : Parts ;
	public prev ? : Parts ;

	constructor( compo : Component, ce : Element, rd : Reader )
	{
		super( compo, ce );

		while( rd.hasnext )
		{
			const dyn = rd.nextdyn;
			if( dyn )
			{
				this.next = new DynamicParts( compo, ce, dyn, rd );
				break;
			}

			const node = this.lastnode = this.createPart( rd.next );
			this.firstnode = this.firstnode || node;
		}
	}

	//  //

	private lastnode ? : Node ;
	private firstnode ? : Node ;

	//  //

	//  //

	public delete()
	{
		this
	}
}


//  dynamic parts //

class DynamicParts extends Parts
{
	constructor( compo : Component, ce : Element, def : defs.ArrayParts, rd : Reader )
	{
		log( "dyn" );
		super( compo, ce );

		if( def.source instanceof Array )
		{
			def.source.forEach( part => this.createPart( part ) );
		}
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
