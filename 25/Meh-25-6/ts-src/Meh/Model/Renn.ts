import { terminate , refs } from "./Symbol.js" ;
import { Life , State , Leaf } from "./Model.js" ;
const log = console.log ;

export class Renn < T >  extends Life < Renn.Ref < T > >
{
	#_orders : Renn.OrderI < T > [] = [] ;
	public get orders () : Renn.Order < T > [] { return this.#_orders ; }

	public insert
	(
		targets : T [] ,
		start : number = this.#_orders.length
	
	) : void
	{
		start = Math.min ( start , this.#_orders.length ) ;

		const orders = targets.map
		(
			( target , i ) => new Renn.OrderI ( this , start + i , target )
		) ;

		this.#_orders.splice ( start , 0 , ... orders ) ;

		const next = start + targets.length ;
		this.update ( next ) ;
		this[ refs ].forEach ( ref => ref.insert ?.( { start , next , orders } ) ) ;
	}

	public delete
	(
		start : number = this.#_orders.length - 1 ,
		next : number = start + 1
	
	) : void
	{
		if ( start > next ) [ start , next ] = [ next , start ] ;
		if ( start >= this.#_orders.length ) return ;
		if ( next >= this.#_orders.length )  next = this.#_orders.length ;

		const orders = this.#_orders.splice ( start , next - start ) ;

		this.update ( start ) ;
		this[ refs ] .forEach ( ref =>  ref.delete ?. ({ start , next , orders }  ) ) ;
	}

	public clear () : void {  this.delete ( 0 , this.orders.length ) ;  }


	/* */

	protected update ( start : number )
	{
		for ( let pos = start ; pos < this.#_orders.length ; pos ++ )
		{
			this.#_orders [ pos ].$ = pos ;
		}
	}

	public override [ terminate ] () : void
	{
		;
	}
}

export namespace Renn
{
	export interface Order < T >  extends State.RO < number >
	{
		get target () : T ; 
	}

	export class OrderI < T >  extends Leaf < number >
	{
		constructor
		(
			protected renn : Renn < T > ,
			pos : number ,
			public readonly target : T
		)
		{
			super ( pos ) ;
		}
	}

	/** Ref */

	export interface Ref < T >  extends Life.Ref < Renn < T > >
	{
		src ? : Renn < T > ;

		insert ? ( note : range < T > ) : void ;
		delete ? ( note : range < T > ) : void ;
		add ? ( note : range < T > ) : void ;
		remove ? ( note : range < T > ) : void ;
	}

	export type range < T > =
	{
		start : number ;
		next : number ;
		orders : Order < T > [] ;
	}
}
