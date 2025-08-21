import { Life , Leaf , Leaf_Get_Value , Leaf_Set_Value , Leaf_Notify_Change , Coll , Coll_Update } from "./Leaf.js" ;
import { Renn , Order } from "./Marker.js" ;

export type Compo < V > =
(
	V extends object ?
	(
		V extends Array < infer EV > ?
			LiveArray < EV >
			: LiveObject < V >
	)
	: Leaf < V >
) ;

export function Compo < V > ( newValue : V , coll ? : Coll ) : Compo < V >
{
	const rt =
	(
		newValue instanceof Object ?
		(
			newValue instanceof Array ?
				new Compo.Core.LiveArrayI ( newValue , coll )
				: new Compo.Core.LiveObject ( newValue , coll ) as any
		)
		: new Leaf.Core.Entity ( newValue , coll )
	) ;

	return rt ;
}

interface LiveArray < EV > extends Leaf < Array < EV > >
{
	insert ( newValues : EV [] , start ? : number ) : void ;
	delete ( start : number , length : number ) : void ;

	at ( pos : number ) : Order < Compo < EV > > | undefined ;
	renn : Renn < Compo < EV > > ;
}

type LiveObject < V extends object > = Leaf < V > &
{
	[ prop in keyof V ] : Compo < V [ prop ] > ;
}


export namespace Compo.Core
{
	export class LiveObject < V extends object > extends Leaf.Core < V >
	{
		constructor ( newValue : V , coll ? : Coll )
		{
			super ( coll ) ;

			for ( const [ prop , value ] of Object.entries ( newValue ) )
			{
				( this as any ) [ prop ] = Compo ( value , this ) ;
			}
		}

		public override [ Leaf_Get_Value ] () : V
		{
			return Object.fromEntries
			(
				Object.entries ( this ).map
				(
					( [ prop , leaf ] ) => [ prop , leaf.$ ]
				)

			) as any ;
		}

		public override [ Leaf_Set_Value ] ( newValue : V , coll ? : Coll ) : void
		{
			for ( const [ prop , value ] of Object.entries ( newValue ) )
			{
				const p = ( this as any ) [ prop ] ;
				if ( p instanceof Leaf.Core )
				{
					p [ Leaf_Set_Value ] ( value , this ) ;
				}
			}

			this [ Leaf_Notify_Change ] ( coll ) ;
		}

		public [ Coll_Update ] ()
		{
			this [ Leaf_Notify_Change ] ( undefined ) ;
		}
	}

	export class LiveArrayI < EV > extends Leaf.Core < EV [] > implements LiveArray < EV >
	{
		public readonly renn : Renn < Compo < EV > > = new Renn ( [] ) ;

		constructor ( newValue : EV [] , coll ? : Coll )
		{
			super ( coll ) ;
			this.renn.insert ( newValue.map ( ev => Compo ( ev ) ) ) ;
		}

		public override [ Leaf_Get_Value ] () : EV []
		{
			const o = this.renn.at ( 0 ) ;
			if ( o )
			{
				// const ev : EV = o.target.$ ;
			}
			
			return this.renn.orders.map ( o => o.target.$ ) as any ;
		}

		public override [ Leaf_Set_Value ] ( newValue : EV [] , coll ? : Coll ) : void
		{
			this.renn.clear () ;
			this.renn.insert ( newValue.map ( ev => Compo ( ev ) ) ) ;
		}

		public insert ( newValue : EV [] , start : number ) : void
		{
			this.renn.insert ( newValue.map ( v => Compo ( v ) ) , start ) ;
		}

		public delete ( start : number , length : number ) : void
		{
			;
		}
		
		public at ( pos : number ) : Order < Compo < EV > > | undefined
		{
			return this.renn.at ( pos ) ;
		}
	}

	type x = { x : number ; } ;

	( a : LiveArray < x > ) =>
	{
		const o = a.at ( 0 ) ;
		if ( o )
		{
			const v : number = o.target.x.$ ;
			const z : number [] = a.renn.orders.map ( o => o.target.x.$ ) ;
		}
	} ;
}

