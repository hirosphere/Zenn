interface Renn < T >
{
	insert ( targets : T [] ) : void ;
}

interface State < V >
{
	get () : V ;
	set ( new_v : V ) : void ;

	addRef ( ref : State.Ref < V > ) : void ;
}

abstract class State < V > implements State < V >
{
}

namespace State
{

	export class Leaf < V > extends State < V >
	{
		constructor ( iv : V )
		{
			super () ;
		}
	}

	export type state < V > = V extends object ? V extends Array < any > ? Renn < V > : Branch < V > : Leaf < V > ;
	export type Branch < V extends object > = Leaf < V > & { [ K in keyof V ] : state < V [ K ] > }

	export class BranchImpl < V extends object > extends State < V >
	{
		public static create < V extends object > ( iv : V ) : Branch < V >
		{
			return new BranchImpl ( iv ) as Branch < V > ;
		}

		constructor ( iv : V )
		{
			super () ;

			Object.entries( iv ).forEach
			(
				( [ name , iv ] ) => ( this as any ) [ name ] = new_state ( iv )
			) ;
		}
	}

	const new_state = ( iv : any ) : State < any > =>
	{
		return iv instanceof Object ? new BranchImpl ( iv ) : new Leaf ( iv ) ;
	} 

	export interface Ref < V >
	{
		vChan ( new_v : V ) : void ;
	}	
}

namespace UA
{
	type v2 = { x : number ;  y : number ; }
	type shape = { pos : v2 ;  size : v2 }
	type doc =
	{
		title : string ;
		content : shape ;
	}

	type Doc = State.state < doc > ;

	( doc : Doc ) =>
	{
		doc.set ( { title : "" , content : { pos : { x : 0 , y : 0 } , size : { x : 0 , y : 0 } } } ) ;

		doc.title.set ( "" ) ;
	}

	const idoc = State.BranchImpl.create < doc > ( { title : "洋菓子のヒロタ" , content : { pos : { x : 0 , y : 0 } , size : { x : 0 , y : 0 } } } ) ;

	idoc.title.set ( "" ) ;
	idoc.content.pos.get()

}
