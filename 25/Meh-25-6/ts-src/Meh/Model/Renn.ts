import { Life , refs , State } from "./Model.js" ;
const log = console.log ;

export class Renn < T >  extends Life < Renn.Ref < T > >
{
	protected p_orders : Renn.OrderI < T > [] = [] ;

	public get orders () : Renn.Order < T > [] { return this.p_orders ; }

	public insert
	(
		targets : T [] ,
		start : number = this.p_orders.length
	
	) : void
	{
		start = Math.min ( start , this.p_orders.length ) ;

		const orders = targets.map
		(
			( target , i ) => new Renn.OrderI ( this , start + i , target )
		) ;

		this.p_orders.splice ( start , 0 , ... orders ) ;

		const next = start + targets.length ;
		this.update ( next ) ;
		this[ refs ].forEach ( ref => ref.insert ?.( { start , next , orders } ) ) ;
	}

	public delete
	(
		start : number = this.p_orders.length - 1 ,
		next : number = start + 1
	
	) : void
	{
		if ( start > next ) [ start , next ] = [ next , start ] ;
		if ( start >= this.p_orders.length ) return ;
		if ( next >= this.p_orders.length )  next = this.p_orders.length ;

		const orders = this.p_orders.splice ( start , next - start ) ;

		this.update ( start ) ;
		this[ refs ] .forEach ( ref =>  ref.delete ?. ({ start , next , orders }  ) ) ;
	}

	public clear () : void {  this.delete ( 0 , this.orders.length ) ;  }


	/* */

	protected update ( start : number )
	{
		for ( let pos = start ; pos < this.p_orders.length ; pos ++ )
		{
			this.p_orders [ pos ].$ = pos ;
		}
	}

	public override terminate () : void
	{
		;
	}
}

export namespace Renn
{
	export interface Order < T >  extends State.r < number >
	{
		get target () : T ; 
	}

	export class OrderI < T >  extends State.Leaf < number >
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

	export interface Ref < T >  extends Life.Ref
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
