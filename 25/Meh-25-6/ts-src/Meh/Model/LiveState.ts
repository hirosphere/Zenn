const log = console.log ;


const Refs = Symbol () ;
const Refs_Add = Symbol () ;
const Refs_Remove = Symbol () ;
const Life_Terminate = Symbol () ;

const State_Get = Symbol () ;
const State_Set = Symbol () ;
const State_Change_Notify = Symbol () ;

const Coll = Symbol () ;
const Coll_Update = Symbol () ;



/** Life */

export class Life < R extends Life.Ref >
{
	public zzz_addRef ( ref : R )
	{
		this [ Refs ].add ( ref ) ;
	}

	protected [ Refs ] = new Set < R > ;

	public [ Life_Terminate ] ()
	{
		this [ Refs ] .forEach ( ref => ref.lTerm ?.() ) ;
		this [ Refs ] .clear () ;
	}
}

export namespace Life
{
	export interface Ref { lTerm ? () : void ; }
}



/* State */

export function State < V > ( newV : V , coll ? : State.Collection ) : State < V >
{
	return new Leaf ( newV , coll ) ;
}

export interface State < V > extends Life < State.Ref >
{
	get $ () : V ;
	set $ ( newV : V ) ;

	[ State_Get ] () : V ;
	[ State_Set ] ( newV : V , collection ? : State.Collection ) : void ;
}

export namespace State
{
	export type Constructor < V > = new ( newV : V , coll : Collection ) => Deep < V > ;

	export interface Ref extends Life.Ref { vChan ? () : void ;  }

	/*  */

	export type Deep < V > =
	(
		V extends object ?
			V extends Array < infer EL > ?
				Renn < EL >
				: Branch < V >
			: State < V >
	) ;
	
	export interface Collection
	{
		[ Coll_Update ] () : void ;
	}

	export interface Renn < E > extends State < Array < E > >
	{
		at ( pos : number ) : Deep < E > ;
	} ;
	
	export type Branch < V extends object > = State < V > &
	{
		[ prop in keyof V ] : Deep < V [ prop ] > ;
	} ;	
}



/* State 実装 */

abstract class State_Imple < V > extends Life < State.Ref > implements State < V >
{
	constructor ( coll ? : State.Collection )
	{
		super () ;
		this [ Coll ] = coll ;
	}

	public override zzz_addRef ( ref : State.Ref ) : void
	{
		super.zzz_addRef ( ref ) ;
		ref.vChan ?.() ;
	}

	get $ () : V { return this [ State_Get ] () ; }
	set $ ( newV : V ) { this [ State_Set ] ( newV ) ; }

	public abstract [ State_Get ] () : V ;
	public abstract [ State_Set ] ( newV : V , collection ? : State.Collection ) : void ;

	protected [ Coll ] ? : State.Collection ;

	protected [ State_Change_Notify ] ( coll ? : State.Collection ) : void
	{
		this [ Refs ].forEach ( ref => ref.vChan ?.() ) ;
		coll && coll != this [ Coll ] && coll [ Coll_Update ] () ;
	}
}

export class Leaf < V > extends State_Imple < V > 
{
	constructor ( newV : V , coll ? : State.Collection )
	{
		super ( coll ) ;
		this.#_value = newV ;
	}

	public [ State_Get ] () : V { return this.#_value ; }

	public [ State_Set ] ( newV : V , collection ? : State.Collection ) : void
	{
		if ( newV === this.#_value )  return ;
		this.#_value = newV ;
		this [ State_Change_Notify ] () ;
	}

	#_value : V ;
}


/* usagi */
{
	type xy = { x : number ; y : number ; }

	( s : State.Deep < xy > ) =>
	{
		s.$ = { x : 5 , y : 15 } ;
		s.x.$ += 10 ;
	}

	type todo = { title : string ; completed : boolean ; }

	( todoList : State.Deep < todo [] > ) =>
	{
		todoList.at ( 5 ).title.$ = "" ;
		todoList.at( 3 ).$ = { title : "ヴラヂヴォストーク 東方支配" , completed : true } ;
	}
}

