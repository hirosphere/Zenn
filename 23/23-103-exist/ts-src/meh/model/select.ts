import { Leaf, LoL, setRoValue, Lian, Index } from "./index.js";
const log = console.log;

/** class Select */

export class Select < V = any >
{
	public readonly current : Leaf < CurrVal < V > > ;
	public get root() : Option < V > { return this._root; }
	public get default() : Option < V > | null { return this._default; }

	constructor( optarg : Option.Args < V >, defaultDef ? : Option.Args < V > )
	{
		this.current = new Leaf < Option < V > | null > ( null, { rel: this.update } );
		this._root = this.createOption( optarg );
		this._default = defaultDef ? this.createOption( defaultDef ) : null;
	}

	protected _root : Option < V > ;
	protected _default : Option < V > | null;

	//

	public createOption( def : Option.Args < V > ) : Option < V >
	{
		return new Option < V > ( this, undefined, def );
	}

	//

	public setCurrent( option : Option < V > | null ) : void
	{
		this.current.val = option || this._default;
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
	export const fromLabels = ( labels : string [], deflab ? : string ) =>
	{
		const def = { title: "", value: "", parts: labels.map( value => ( { title: value, value } ) ) };
		return new Select < string > ( def, { title: deflab ?? "", value: "" } );
	};

	export const fromValues = < V > ( arg : Option.Args < V > ) : Select < V > =>
	{
		return new Select < V > ( arg );
	}
}


/** class Option */

export class Option < V = any > extends Index < Option < V > >
{
	public get v() { return this.value; }
	public get val() { return this.value; }
	public readonly value : V ;
	public readonly selected = new Leaf.Boolean( false ) ;

	constructor(
		protected selector : Select < V > | null,
		orderOwner : Lian | undefined,
		public readonly args : Option.Args < V > )
	{
		super( orderOwner );
		
		this._title = args.title;
		this.value = args.value;
		args.parts && this.parts.addOrders( args.parts.map( def => this.createPart( def ) ) );
	}

	protected createPart( def : Option.Args < V > ) : Option < V >
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

export namespace Option
{
	export type Args < V > =
	{
		title : LoL.String;
		value : V ;
		parts ? : Args < V > []
	};
}
