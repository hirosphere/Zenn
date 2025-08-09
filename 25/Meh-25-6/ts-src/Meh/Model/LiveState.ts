const log = console.log ;


const Refs = Symbol () ;
const Life_Terminate = Symbol () ;

const Leaf_Get = Symbol () ;
const Leaf_Set = Symbol () ;
const Leaf_Change_Notify = Symbol () ;

const Coll = Symbol () ;
const Coll_Update = Symbol () ;



/** Life */

export class Life < R extends Life.Ref >
{
	public [ Refs ] = new Set < R > ;

	public [ Life_Terminate ] ()
	{
		this [ Refs ] .forEach ( ref => ref.lTerm ?.() ) ;
		this [ Refs ] .clear () ;
	}
}

export namespace Life
{
	export interface Ref { lTerm ? () : void ; }

	export const addRef = < R extends Ref > ( life : Life < R > , ref : R ) : void =>
	{
		life [ Refs ].add ( ref ) ;
	}

	export const removeRef = < R extends Ref > ( life : Life < R > , ref : R ) : void =>
	{
		life [ Refs ].delete ( ref ) ;
	}
}



/* Live { Leaf , Compo } */

export interface Leaf < V > extends Life < Leaf.Ref >
{
	get $ () : V ;
	set $ ( newV : V ) ;

	[ Leaf_Get ] () : V ;
	[ Leaf_Set ] ( newV : V , collection ? : Coll ) : void ;

	[ Leaf_Change_Notify ] ( coll : Coll ) : void ;

}

export namespace Leaf
{
	export function create < V > ( newV : V , coll ? : Coll ) : Leaf < V >
	{
		return new Entity ( newV , coll ) ;
	}
	
	export interface Ref extends Life.Ref { vChan ? () : void ;  }

	export const addRef = ( state : Leaf < any > , ref : Ref ) =>
	{
		Life.addRef ( state , ref ) ;
	}
}

interface Coll
{
	[ Coll_Update ] () : void ;
}

export type Compo < V > =
(
	V extends object ?
		V extends Array < infer EL > ?
			Renn < EL >
			: Branch < V >
		: Leaf < V >
) ;

export interface Renn < E > extends Leaf < Array < E > >
{
	insert ( newVs : E [] ) : void ;
	delete ( start : number , length : number ) : void ;

	at ( pos : number ) : Compo < E > ;
} ;

export type Branch < V extends object > = Leaf < V > &
{
	[ prop in keyof V ] : Compo < V [ prop ] > ;
} ;


/* 実装 */

abstract class Leaf_Imple < V > extends Life < Leaf.Ref > implements Leaf < V >
{
	constructor ( coll ? : Coll )
	{
		super () ;
		this [ Coll ] = coll ;
	}

	get $ () : V { return this [ Leaf_Get ] () ; }
	set $ ( newV : V ) { this [ Leaf_Set ] ( newV ) ; }

	public abstract [ Leaf_Get ] () : V ;
	public abstract [ Leaf_Set ] ( newV : V , collection ? : Coll ) : void ;

	protected [ Coll ] ? : Coll ;

	public [ Leaf_Change_Notify ] ( coll ? : Coll ) : void
	{
		this [ Refs ].forEach ( ref => ref.vChan ?.() ) ;
		coll && coll != this [ Coll ] && coll [ Coll_Update ] () ;
	}
}

class Entity < V > extends Leaf_Imple < V > 
{
	constructor ( newV : V , coll ? : Coll )
	{
		super ( coll ) ;
		this.#_value = newV ;
	}

	public [ Leaf_Get ] () : V { return this.#_value ; }

	public [ Leaf_Set ] ( newV : V , coll ? : Coll ) : void
	{
		if ( newV === this.#_value )  return ;
		this.#_value = newV ;
		this [ Leaf_Change_Notify ] ( coll ) ;
	}

	#_value : V ;
}

class Branch_Impl extends Leaf_Imple < any >
{
	[ Leaf_Get ] () { return {} }

	[ Leaf_Set ] (  ) {}
}



/* usagi */
{
	type xy = { x : number ; y : number ; }

	( s : Compo < xy > ) =>
	{
		s.$ = { x : 5 , y : 15 } ;
		s.x.$ += 10 ;
	}

	type todo = { title : string ; completed : boolean ; }

	( todoList : Compo < todo [] > ) =>
	{
		todoList.at ( 5 ).title.$ = "" ;
		todoList.at( 3 ).$ = { title : "ヴラヂヴォストーク 東方支配" , completed : true } ;
	}
}

