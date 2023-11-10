import { Leaf, setRoValue, LianBase, Order, OrderBase } from "./index.js";
const log = console.log;

//  //

export class Select < V = any >
{
	public readonly current : Leaf < CurrVal < V > > ;
	public readonly options = new Options < V > ( this );

	constructor( vals ? : V [] )
	{
		this.current = new Leaf < Option < V > | null > ( null, { rel: this.update } );

		vals && this.options.addValues( vals );
	}

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

//  //

class Options < V > extends LianBase < Option < V > >
{
	constructor( protected selector : Select < V > | null )
	{
		super();
	}

	public addValues( vals : V [] )
	{
		this.addOrders( vals.map( val => new Option( this, this.selector, val ) ) );
	}

	public terminate() : void
	{
		this.selector = null;
		super.terminate();
	}
}

//  //

export class Option < V > extends OrderBase
{
	public readonly selected = new Leaf.Boolean( false );

	constructor(
		orderOwner : Options < V >,
		protected selector : Select < V > | null,
		public readonly value : V )
	{
		super( orderOwner );
	}

	public select(  )
	{
		this.selector?.setCurrent( this );
	}

	terminate()
	{
		this.selector = null;
		super.terminate();
	}
}
