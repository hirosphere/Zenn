import
{
	Life ,
	Leaf , Coll , Refs ,
	Leaf_Get_Value , Leaf_Set_Value , Leaf_Notify_Change

} from "./Leaf.js" ;

const log = console.log ;


/** Order Marker */

export class Renn < EV > extends Leaf.Core < EV [] , Renn.Ref < EV > >
{
	#_length = Leaf ( 0 ) ;
	#_orders : OrderImpl < EV > [] ;

	constructor ( newValue ? : EV [] , coll ? : Coll )
	{
		super ( coll ) ;

		this.#_orders = newValue ? newValue.map
		(
			( target , pos ) => new OrderImpl ( this , pos , target )
		)
		: [] ;
	}

	public [ Leaf_Get_Value ] () : EV []
	{
		return this.#_orders.map ( o => o.target ) ;
	}

	public [ Leaf_Set_Value ] ( newValue : EV [] , coll ? : Coll )
	{
		this.clear () ;
		this.insert ( newValue ) ;

		this [ Leaf_Notify_Change ] ( coll ) ;
	}

	/* 参照 */

	public addRef ( ref : Renn.Ref < EV > )
	{
		this [ Refs ].add ( ref ) ;
		ref.insert ?.( 0 , this.#_orders ) ;
	}

	public removeRef ( ref : Renn.Ref < EV > )
	{
		this [ Refs ].delete ( ref ) ;
	}

	/* 生成・消去 */
	
	public insert ( targets : EV [] , start : number = this.#_orders.length ) : void
	{
		const orders = targets.map
		(
			( target , i ) => new OrderImpl ( this , start + i , target )
		) ;

		this.#_orders.splice ( start , 0 , ... orders ) ;

		const next = start + orders.length ;
		this.update ( next ) ;

		this [ Refs ].forEach ( ref => ref.insert ?. ( start , orders ) ) ;
	}

	public delete ( start : number , length : number ) : void
	{
		const orders = this.#_orders.splice ( start , length ) ;
		orders.forEach ( o => Life.terminate ( o ) ) ;

		this.update ( start ) ;
		this [ Refs ].forEach ( ref => ref.delete ?. ( start , length ) ) ;
	}

	public clear () : void
	{
		this.delete ( 0 , this.#_orders.length ) ;
	}

	/* プロパティ */

	public get length () : Leaf.RO < number >
	{
		return this.#_length ;
	} 


	/* アクセス */

	public at ( pos : number ) : Order < EV > | undefined
	{
		return this.#_orders [ pos ] ;
	}

	public get orders () : ReadonlyArray < Order < EV > >
	{
		return this.#_orders ;
	}

	/*  */

	protected update ( start : number ) : void
	{
		for ( let pos = start ; pos < this.#_orders.length ; pos ++ )
		{
			this.#_orders [ pos ].$ = pos ;
		}

		this.#_length.$ = this.#_orders.length ;
	}
}


export namespace Renn
{
	export interface Ref < EV > extends Leaf.Ref
	{
		insert ? ( start : number , orders : ReadonlyArray < Order < EV > > ) : void ;
		add ? ( start : number , length : number ) : void ;
		remove ? ( start : number , length : number ) : void ;
		delete ? ( start : number , length : number ) : void ;
	}
}


export type Order < T > = Leaf.RO.From < OrderImpl < T > > ;


export class OrderImpl < T > extends Leaf.Core.Entity < number >
{
	constructor
	(
		protected renn : Renn < T > ,
		pos : number ,
		public readonly target : T
	
	)
	{ super ( pos ) ; }

	public get count () : Leaf.RO < number >
	{
		return Leaf.transR ( this , pos => ( pos + 1 ) )
	}

	public get next () : Order < T > | undefined
	{
		return this.renn.at ( this.$ + 1 ) ;
	}

	public get prev () : Order < T > | undefined
	{
		return this.renn.at ( this.$ - 1 ) ;
	}

	public delete () : void
	{
		this.renn.delete ( this.$ , 1 ) ;
	}
}





/** Key Match Marker */

export class Key < K >
{
	protected items = new Map < K | undefined , MatchImpl < K > > ;

	#_match ? : MatchImpl < K > ;

	constructor ( public readonly curr : Leaf < K | undefined > = Leaf ( undefined ) )
	{
		Leaf.addRef ( this.curr , { vChan : () => this.update () } ) ;
	}

	public set ( key ? : K )
	{
		this.curr.$ = key ;
	}

	public getItem ( key : K | undefined ) : Key.Match < K >
	{
		return this.makeItem ( key ) ;
	}

	/* */

	protected makeItem ( key : K | undefined ) : MatchImpl < K >
	{
		let item = this.items.get ( key ) ;
		if ( item )  return item ;

		item = new MatchImpl < K > ( this.curr , key , key === this.curr.$ ) ;
		this.items.set ( key , item ) ;

		return item ;
	}

	protected update () : void
	{
		if ( this.#_match ) this.#_match.$ = false ;
		this.#_match = this.makeItem ( this.curr.$ ) ;
		if ( this.#_match ) this.#_match.$ = true ;
	}
}

export namespace Key
{
	export type Match < K > = Leaf.RO.From < MatchImpl < K > > ;	
}

class MatchImpl < K > extends Leaf.Core.Entity < boolean >
{
	constructor
	(
		protected current : Leaf < K | undefined >  ,
		public readonly key : K | undefined ,
		newValue : boolean
	)
	{ super ( newValue ) ; }

	public set ( state : boolean = true ) : void
	{
		this.current.$ = state ? this.key : undefined ;
	}
}
