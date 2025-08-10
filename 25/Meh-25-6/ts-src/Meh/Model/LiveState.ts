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



/*  . 実体生成 */

export function Leaf < V > ( newValue : V , coll ? : Coll ) : Leaf < V >
{
	return new Implements.Entity ( newValue , coll ) ;
}

export function Compo < V > ( newValue : V , coll ? : Coll ) : Compo < V >
{
	return newValue instanceof Object ?
		newValue instanceof Array ?
			new Implements.Renn ( newValue , coll ) as any
			: new Implements.Branch ( newValue , coll ) as any
		: new Implements.Entity ( newValue , coll ) as any
	;
}
	

/*  . typedef */

export type Leaf < V > = Life < Leaf.Ref > &
{
	get $ () : V ;
	set $ ( newValue : V ) ;

	[ Leaf_Get ] () : V ;
	[ Leaf_Set ] ( newValue : V , collection ? : Coll ) : void ;

	[ Leaf_Change_Notify ] ( coll : Coll ) : void ;
}

export namespace Leaf
{
	export interface Ref extends Life.Ref { vChan ? () : void ;  }
}

export type Compo < V > =
(
	V extends object ?
		V extends Array < infer EL > ?
			Renn < EL >
			: Branch < V >
		: Leaf < V >
) ;

interface Coll
{
	[ Coll_Update ] () : void ;
}

export interface Renn < E > extends Leaf < Array < E > >
{
	insert ( newValues : E [] ) : void ;
	delete ( start : number , length : number ) : void ;

	at ( pos : number ) : Compo < E > | undefined ;
} ;

export type Branch < V extends object > = Leaf < V > &
{
	[ prop in keyof V ] : Compo < V [ prop ] > ;
} ;


/* 実装 */

export namespace Leaf
{
	export const addRef = ( state : Leaf < any > , ref : Ref ) =>
	{
		Life.addRef ( state , ref ) ;
	}
}

namespace Implements
{
	/* Leaf */

	export abstract class LeafImp < V > extends Life < Leaf.Ref > implements Leaf < V >
	{
		constructor ( coll ? : Coll )
		{
			super () ;
			this [ Coll ] = coll ;
		}
	
		get $ () : V { return this [ Leaf_Get ] () ; }
		set $ ( newValue : V ) { this [ Leaf_Set ] ( newValue ) ; }
	
		public abstract [ Leaf_Get ] () : V ;
		public abstract [ Leaf_Set ] ( newValue : V , collection ? : Coll ) : void ;
	
		protected [ Coll ] ? : Coll ;
	
		public [ Leaf_Change_Notify ] ( coll ? : Coll ) : void
		{
			this [ Refs ].forEach ( ref => ref.vChan ?.() ) ;
			coll && coll != this [ Coll ] && coll [ Coll_Update ] () ;
		}
	}
	
	export class Entity < V > extends LeafImp < V > 
	{
		constructor ( newValue : V , coll ? : Coll )
		{
			super ( coll ) ;
			this.#_value = newValue ;
		}
	
		public [ Leaf_Get ] () : V { return this.#_value ; }
	
		public [ Leaf_Set ] ( newValue : V , coll ? : Coll ) : void
		{
			if ( newValue === this.#_value )  return ;
			this.#_value = newValue ;
			this [ Leaf_Change_Notify ] ( coll ) ;
		}
	
		#_value : V ;
	}


	/* Collection */

	export class Renn < EV > extends LeafImp < Array < EV > > implements Renn < EV >
	{
		constructor ( newValue : any , coll ? : Coll )
		{
			super ( coll ) ;
		}

		public override [ Leaf_Get ] () : Array < EV > { return [] }
		public override  [ Leaf_Set ] ( newValue : Array < EV > ) {}
	}
	
	export class Branch extends LeafImp < any >
	{
		constructor ( newValue : any , coll ? : Coll )
		{
			super ( coll ) ;
		}

		public override [ Leaf_Get ] () { return {} }
		public override [ Leaf_Set ] (  ) {}
	}
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
		todoList.at ( 5 ) ?.title.$ ;
		const todo = todoList.at( 3 ) ;
		if( todo ) todo.$ = { title : "ヴラヂヴォストーク 東方支配" , completed : true } ;


	}
}

