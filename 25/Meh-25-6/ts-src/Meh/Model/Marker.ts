import { Life , life_add_ref , refs , Agg  , agg , agg_echan , LS, } from "./LiveState.js" ;



/* */

export class Renn < T >  extends Life < Renn.Ref < T > >  implements Agg
{
	public get length () : LS.Ro < number > { return this.#_length ; } ;

	constructor ( targets ? : T [] , agg ? : Agg )
	{
		super ( agg ) ;

		this.#_orders = create_orders ( this , 0 , targets ) ;
	}

	/*  */

	public add_ref ( ref : Renn.Ref < T > ) : void
	{
		Life.add_ref ( this , ref ) ;
	}

	public override [ life_add_ref ] ( ref : Renn.Ref < T > ) : void
	{
		super [ life_add_ref ] ( ref ) ;
		ref.insert ?. ( 0 , this.#_orders ) ;
	}

	/* */

	public insert ( targets : T [] , start : number = this.#_orders.length ) : void
	{
		start = pos_trim ( start , this.#_orders ) ;

		const orders = create_orders ( this , start , targets ) ;

		this.#_orders.splice ( start , 0 , ... orders ) ;

		this.update ( start + orders.length ) ;
		this [ refs ] .forEach ( ref => ref.insert ?. ( start , orders ) ) ;
		this [ agg ] ?. [ agg_echan ] () ;
	}

	public delete ( start : number , length : number ) : void
	{
		start = pos_trim ( start , this.#_orders ) ;

		const orders = this.#_orders.splice ( start , length ) ;

		this.update ( start ) ;
		this [ refs ] .forEach ( ref => ref.delete ?. ( start , orders.length ) ) ;
		this [ agg ] ?. [ agg_echan ] () ;
	}

	/* */

	public get targets () : T []
	{
		return this.#_orders.map ( o => o.target ) ;
	}

	public get orders () : readonly Order < T > []
	{
		return this.#_orders ;
	}

	public at ( pos : number ) : Order < T > | undefined
	{
		return this.#_orders [ pos ] ;
	}

	/* */

	public [ agg_echan ] () : void
	{
		this [ refs ] .forEach  ( ref => ref.eChan ?.() ) ;
		this [ agg ] ?. [ agg_echan ] () ;
	}

	/*  */

	protected update ( start : number ) : void
	{
		for ( let pos = start ; pos < this.#_orders.length ; pos ++ )
		{
			LS.set ( this.#_orders [ pos ] , pos , this ) ;
		}
		
		LS.set ( this.#_length , this.#_orders.length ) ;
	}

	#_orders : OI < T > [] ;
	#_length = new LS.Leaf ( 0 ) ;
}

const create_orders = < T > ( agg : Renn < T > , start : number , targets ? : T [] ) : OI < T > [] =>
{
	if ( ! targets )  return [] ;

	const rt : OI < T > [] = [] ;
	for ( let i = 0 ; i < targets.length ; i ++ )
	{
		rt.push ( new OI ( targets [ i ] , start + i , agg ) ) ;
	}
	return rt ;
}

const pos_trim = ( start : number , ar : Array < any > ) =>
{
	return Math.max ( 0 , Math.min ( ar.length , start ) ) ;
}

export namespace Renn
{
	export type Ref < T > = Life.Ref &
	{
		insert ? ( start : number , orders : Order < T > [] ) : void ;
		delete ? ( start : number , length : number ) : void ;

		eChan ? () : void ;
	}
}


/* Order */

export type Order < T > = LS.Ro < number > & O < T > ;

type O < T > =
{
	readonly target : T
}

export class OI < T >  extends LS.Leaf < number >  implements O < T >
{
	constructor ( public readonly target : T , pos : number , protected agg : Renn < any > )
	{
		super ( pos , agg ) ;
	}

	/* */

	public override toString ()
	{
		return LS.get ( this ) ;
	}
}
