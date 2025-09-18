import { Life , Live , LiveBase } from "./LiveState.js" ;

export class Renn < T >  extends Life < Renn.Ref < T > >
{
	constructor ()
	{
		super () ;
	}

	/* */

	public readonly length = new Live.Number ( 0 ) ;

	/* */

	public override addRef ( ref : Renn.Ref < T > ) : void
	{
		super.addRef ( ref ) ;
		ref.insert ?. ( this.#_orders , 0 ) ;
	}


	/* */

	public insert ( targets : T [] , start : number = this.#_orders.length ) : void
	{
		const orders = targets.map ( ( t , i ) => new Order ( this , i + start , t ) ) ;
		this.#_orders.splice ( start , 0 , ... orders ) ;

		this.update ( start + targets.length ) ;
	}

	public delete ( start : number , length : number ) : void
	{
		const orders = this.#_orders.splice ( start , length ) ;
		orders.map ( o => Life.terminate ( o ) ) ;
	}

	/* */

	protected update ( start : number ) : void
	{
		const next = this.#_orders.length ;

		for ( let pos = start ; pos < next ; pos ++ )
		{
			this.#_orders [ pos ].$ = pos ;
		}

		this.length.$ = this.#_orders.length ;
	}

	#_orders : Order < T > [] = [] ;
}

export namespace Renn
{
	export type Ref < T > = Life.Ref &
	{
		insert ? ( orders : Order < T > [] , start : number ) : void ;
		delete ? (  ) : void ;
	}
}

export class Order < T > extends Live.Number
{
	constructor ( protected renn  : Renn < T > , init : number , public readonly target : T )
	{
		super ( init ) ;
	}

	
}

