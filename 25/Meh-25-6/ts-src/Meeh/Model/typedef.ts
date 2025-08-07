const log = console.log ;

/* 宣言 */

const REFS = Symbol () ;
export const TERMINATE = Symbol () ;
export const GET_VALUE = Symbol () ;
export const SET_VALUE = Symbol () ;
export const NOTIFY = Symbol () ;
export const UPDATE_COMPOSITION = Symbol () ;

export interface Life < R extends Life.Ref >
{
	[ TERMINATE ] () : void ;

	$_addref ( ref : R ) : void ;
	$_rmvref ( ref : R ) : void ;
}

export namespace Life
{
	export interface Ref { lTerm ? () : void ; }
}


export type ToState < V > =
(
	V extends object ?
	(
		V extends Array < infer E > ?
		Renn < E >
		: Branch < V >
	)
	: State < V >
) ;


export namespace State
{
	export interface Ref extends Life.Ref { vChan ? () : void ; }
	export interface Composition { [ UPDATE_COMPOSITION ] () : void ; }
}

export interface Renn < E > extends State < Array < E > >
{
	insert ( newVs : E [] ) : void ;
	delete ( start : number , length : number ) : void ;
}

export type Branch < V extends object > = State < V > &
{
	[ prop in keyof V ] : ToState < V [ prop ] > ;
} ;



/* 実装 */

/*	 Life */

export class Life < R > implements Life < R >
{
	protected [ REFS ] = new Set < R > ;

	public $_addref ( ref : R ) : void  { this [ REFS ] .add ( ref ) ; }
	public $_rmvref ( ref : R ) : void  { this [ REFS ] .delete ( ref ) ; }


	[ TERMINATE ] ()
	{
		this [ REFS ] .forEach ( ref => ref.lTerm ?.() ) ;
		this [ REFS ] .clear () ;
	}
}

/*	 State */

export abstract class State < V > extends Life < State.Ref >  implements State < V >
{
	constructor ()
	{
		super () ;
	}

	public get $ () : V { return this [ GET_VALUE ] () ; }
	public set $ ( newV : V ) { this [ SET_VALUE ] ( newV ) ; }

	public abstract [ GET_VALUE ] () : V ;
	public abstract [ SET_VALUE ] ( newV : V , composition ? : State.Composition ) : void ;

	protected [ NOTIFY ] ( composition ? : State.Composition )
	{
		this [ REFS ] .forEach ( ref => ref.vChan ?.() ) ;
		composition ?.[ UPDATE_COMPOSITION ] () ;
	}
}

export class Leaf < V > extends State < V >
{
	#_value : V ;

	constructor ( newV : V )
	{
		super () ;
		this.#_value = newV ;
	}

	/* */

	public override [ GET_VALUE ] () : V
	{
		return this.#_value ;
	}

	public override [ SET_VALUE ] ( newV : V , composition : State.Composition )
	{
		if ( newV === this.#_value )  return ;
		this.#_value = newV ;
	}
}


/* Renn */







/* Branch */





/* */


namespace usagi
{
	type xy =
	{
		x : number ;
		y : number ;
	} ;

	type area =
	{
		pos : xy ;
		size : xy ;
	} ;

	type XY = Branch < xy > & { x : string ; mul () : number ; } ;
	type Size = Branch < area > & {  } ;

	( o : XY ) =>
	{
		o.mul () ;
	} ;

	( o : Size ) =>
	{
		o.size.x.$ = 722 ;
	} ;

	log ( new Leaf ( 5 ).$ ) ;
}






