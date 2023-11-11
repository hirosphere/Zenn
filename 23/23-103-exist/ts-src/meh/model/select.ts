import { Leaf, setRoValue, Lian, Index } from "./index.js";
const log = console.log;

//  //

namespace Defs
{
	export type Option < V > =
	{
		value : V ;
		parts ? : Option < V > []
	};
}

//  //

export class Select < V = any >
{
	public readonly current : Leaf < CurrVal < V > > ;
	public get root() : Option < V > | null { return this._root; }

	constructor( optdef ? : Defs.Option < V > )
	{
		this.current = new Leaf < Option < V > | null > ( null, { rel: this.update } );
		this._root = this.createOption( optdef );
	}

	protected _root : Option < V > | null = null ;

	//

	public createOption( def ? : Defs.Option < V > ) : Option < V > | null
	{
		if( ! def ) return null;

		return new Option < V > ( this, undefined, def );
	}

	//

	public setCurrent( option : Option < V > | null ) : void
	{
		this.current.val = option;
	}

	protected update( newitem : CurrVal < V >, olditem ? : CurrVal < V > )
	{
		olditem?.selected.set( false );
		newitem?.selected.set( true );
	}
}

type CurrVal < V > = Option < V > | null;

export namespace Select
{
	export const fromLabels = ( labels : string [] ) =>
	{
		const def = { value: "", parts: labels.map( value => ({ value }) ) };
		return new Select < string > ( def );
	};
}

//  //

export class Option < V = any > extends Index < Option >
{
	public readonly value : V ;
	public readonly selected = new Leaf.Boolean( false ) ;

	constructor(
		protected selector : Select < V > | null,
		orderOwner : Lian | undefined,
		public readonly def : Defs.Option < V > )
	{
		super( orderOwner );
		
		this.value = def.value;
		def.parts && this.parts.addOrders( def.parts.map( def => this.createPart( def ) ) );
	}

	protected createPart( def : Defs.Option < V > ) : Option < V >
	{
		return new Option( this.selector, this.parts, def );
	}

	//

	public select()
	{
		this.selector?.setCurrent( this );
	}

	terminate()
	{
		this.selector = null;
		super.terminate();
	}
}
