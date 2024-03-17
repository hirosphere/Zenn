import { Exist, _refs } from "./exist.js";
import { Leafr } from "./leaf.js";
const log = console.log;

/** class Renn */

export class Renn < S = any > extends Exist
{
	/** */


	/** vars */

	protected p_orders = new Array < Order < S > > ;

	/** */

	public new_item( source : S, pos ? : number ) : void
	{
		if( pos === undefined )  pos = this.p_orders.length;

		this.p_orders[ pos ] = new Order( this, 0, source );

		log( "renn", this.p_orders.length );
	}
}

export namespace Renn
{
	export class Ref < S > extends Exist.Ref
	{
		constructor( refcon : Exist.Ref.Container, acts : Acts < S >, source ? : Renn < S > )
		{
			super( refcon, acts );
			this.source = source;
		}
	}

	export interface Acts < S > extends Exist.Acts
	{
		new_order ? ( start : number, list : Order < S > [] ) : void ;
	}
}


/** class Order */

export class Order < S > extends Leafr.Number
{
	constructor( con : Renn, initv : number, source : S )
	{
		super( con, initv );
		this.p_source = source;
	}

	protected p_source ? : S ;

	public override terminate() : void
	{
		this.p_source = undefined;
		super.terminate();
	}
}
