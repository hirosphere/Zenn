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
	
	get nextap() : defs.ArrayParts | undefined
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
		return new StaticParts( compo, ce, rd, null );
	}

	//  //

	next ? : Parts ;
	prev : Parts | null;

	constructor( protected compo : Component, protected ce : Element, prev : Parts | null )
	{
		this.prev = prev;
		if( prev ) prev.next = this;
	}

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
	constructor( compo : Component, ce : Element, rd : Reader, prev : Parts | null )
	{
		super( compo, ce, prev );

		while( rd.hasnext )
		{
			this.ap( rd );
			if( this.next ) break;  // next が作成されたらループ終了 //

			const node = this.lastnode = this.createPart( rd.next );
			this.firstnode = this.firstnode || node;
		}
	}

	ap( rd : Reader ) : void
	{
		const ap = rd.nextap;
		if( ! ap ) return;

		// dynamic parts //

		if( ap.source instanceof Lian )
		{
			log( "ap * dyn", ap.source )
			new DynamicParts( this.compo, this.ce, ap, rd, this );
			return;
		}

		// static parts //

		log( "pa * stat", ap.source )
		ap.source.forEach
		(
			item =>
			{
				const def = ap.create( item );
				log( "ap*stat", def );
				this.createPart( def );
			}
		);
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
	constructor
	(
		compo : Component,
		ce : Element,
		ap : defs.ArrayParts,
		rd : Reader,
		prev : Parts | null
	)
	{
		log( "**dyn**" );
		super( compo, ce, prev );

		if( ap.source instanceof Array )
		{
			ap.source.forEach( part => this.createPart( ap.create( part ) ) );
		}

		if( rd.hasnext ) new StaticParts( compo, ce, rd, this );
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
