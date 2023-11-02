import { defs } from "./defs.js";
import { Component, bindText } from "./compo.js";
import { Lian } from "../model/lian.js";

const log = console.log;

export abstract class Parts
{
	static create( compo : Component, ce : Element, def : defs.Parts )
	{
		return new StaticParts( new Work( compo, ce, def ) );
	}

	//  //
	
	constructor( protected wk : Work ) {}

	public abstract delete() : void ;
}

//  //

abstract class PartsImpl extends Parts
{
	public abstract get firstnode() : Node | undefined ;
	public abstract set firstnode( value : Node | undefined );
	public next ? : PartsImpl;
}

export class StaticParts extends PartsImpl
{
	constructor( wk : Work )
	{
		super( wk );

		for( let partdef : defs.Node | undefined;  partdef = this.wk.getnext( this ); )
		{
			const node = this.wk.createPart( partdef );
			this._firstnode = this._firstnode || node;
		}
	}

	public get firstnode() : Node | undefined { return this._firstnode }
	private _firstnode ? : Node;

	delete()
	{
		this.next?.delete();
	}
}


class ArrayParts extends PartsImpl
{
	protected readonly  nodes = new Array < Node >;

	constructor( protected def : defs.ArrayParts, wk : Work )
	{
		super( wk );

		def.source.forEach
		(
			partmodel => this.createPart( partmodel )
		);

		if( ! ( def.source instanceof Lian ) )  return;

		def.source.ref( this );
	}

	// Lian Ref オペレーション //

	add( start : number, count : number )
	{
		const order = start;
		const model = this.def.source[ order ];
		const rel = this.nodes[ order ];
		this.nodes.splice( order, 0, this.createPart( model, rel ) );
	}
	

	remove( start : number, count : number )
	{
		const rem = this.nodes.splice( start, count );
		log( "remove", rem, start, count )
		rem.forEach( node => this.wk.ce.removeChild( node ) );
	}

	//  //

	protected createPart( model : any, rel ? : Node ) : Node
	{
		const partdef = this.def.create( model );
		return this.wk.createPart( partdef, rel );
	}

	get firstnode() { return this.nodes[ 0 ]; }

	public delete()
	{
		this.next?.delete();
	}
}


class Work
{
	protected index = 0;

	constructor
	(
		protected compo : Component,
		public readonly ce : Element,
		protected def : defs.Parts
	)
	{
	}

	public getnext( prevparts : PartsImpl ) : defs.Node | undefined
	{
		const def = this.def[ this.index ++ ];

		if( def instanceof defs.ArrayParts )
		{
			prevparts.next = new ArrayParts( def, this )
			return;
		}

		return def;
	}

	public createPart( def : defs.Node, rel ? : Node ) : Node
	{
		return this.compo.createNode( def, this.ce, rel );
	}

}
