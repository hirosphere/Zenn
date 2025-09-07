/*
	プリミティブデータクラスはデフォルト値を持つこと。
	アグリゲーションクラスはメンバーコンストラクタを持つこと
*/

import
{
	Life , Leaf ,
	Leaf_Get_Value ,
	Leaf_Set_Value ,
	Leaf_Notify_Change ,
	Aggregate , Part_Change

} from "./Leaf.js" ;

import { Renn , Order } from "./Marker.js" ;


export type Live < V > =
(
	V extends object ?
	(
		V extends Array < infer EV > ?
			LiveArray < EV >
			: LiveObject < V >
	)
	: Leaf < V >
) ;

export function Live < V > ( newValue : V , agg ? : Aggregate ) : Live < V >
{
	const rt =
	(
		newValue instanceof Object ?
		(
			newValue instanceof Array ?
				new Live.Core.LiveArrayI ( newValue , agg )
				: new Live.Core.LiveObject ( newValue , agg ) as any
		)
		: new Leaf.Core.Entity ( newValue , agg )
	) ;

	return rt ;
}

interface LiveArray < EV > extends Leaf < Array < EV > >
{
	insert ( newValues : EV [] , start ? : number ) : void ;
	delete ( start : number , length : number ) : void ;
	clear () : void ;

	at ( pos : number ) : Order < Live < EV > > | undefined ;
	renn : Renn < Live < EV > > ;
}

type LiveObject < V extends object > = Leaf < V > &
{
	[ prop in keyof V ] : Live < V [ prop ] > ;
}


export namespace Live.Core
{
	export class LiveObject < V extends object > extends Leaf.Core < V >
	{
		constructor ( newValue : V , ag ? : Aggregate )
		{
			super ( ag ) ;

			for ( const [ prop , value ] of Object.entries ( newValue ) )
			{
				( this as any ) [ prop ] = Live ( value , this ) ;
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

		public override [ Leaf_Set_Value ] ( newValue : V , ag ? : Aggregate ) : void
		{
			for ( const [ prop , value ] of Object.entries ( newValue ) )
			{
				const p = ( this as any ) [ prop ] ;
				if ( p instanceof Leaf.Core )
				{
					p [ Leaf_Set_Value ] ( value , this ) ;
				}
			}

			this [ Leaf_Notify_Change ] ( ag ) ;
		}

		[ Part_Change ] ()
		{
			this [ Leaf_Notify_Change ] ( undefined ) ;
		}

	}


	/* LiveArray */

	export class LiveArrayI < EV > extends Leaf.Core < EV [] > implements LiveArray < EV >
	{
		public readonly renn : Renn < Live < EV > > = new Renn ( [] , this ) ;

		constructor ( newValue : EV [] , ag ? : Aggregate )
		{
			super ( ag ) ;
			this.renn.insert ( newValue.map ( ev => Live ( ev , this ) ) ) ;
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

		public override [ Leaf_Set_Value ] ( newValue : EV [] , coll ? : Aggregate ) : void
		{
			this.renn.clear () ;
			this.renn.insert ( newValue.map ( ev => Live ( ev , this ) ) ) ;
		}

		public insert ( newValue : EV [] , start : number ) : void
		{
			this.renn.insert ( newValue.map ( v => Live ( v , this ) ) , start ) ;
		}

		public delete ( start : number , length : number ) : void
		{
			this.renn.delete ( start , length ) ;
		}

		public clear () : void
		{
			this.renn.clear () ;
		}
		
		public at ( pos : number ) : Order < Live < EV > > | undefined
		{
			return this.renn.at ( pos ) ;
		}

		/* */

		[ Part_Change ] ()
		{
			this [ Leaf_Notify_Change ] ( undefined ) ;
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

