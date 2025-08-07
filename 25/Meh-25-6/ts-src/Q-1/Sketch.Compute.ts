
function Leaf < V > ( v : V ) : State < V > 
{
	return {
		
		get $ () { return v ; } ,
		set $ ( newv : V ) { v = newv ; } ,
		$_addref () {},
		$_rmvref () {}
	} ;
}

interface State < V >
{
	get $ () : V ;
	set $ ( newv : V ) ;

	$_addref ( ref : State.Ref ) : void ;
	$_rmvref ( ref : State.Ref ) : void ;
}

namespace State { export interface Ref { vChan () : void } }



type Branch < V extends object > = State < V > &
{
	readonly [ prop in keyof V ] : ToState < V [ prop ] > ;
}

type PropTypeList < V extends object > =
{
	readonly [ prop in keyof V ] ? :
	(
		V [ prop ] extends object ?
			{
				new ( newv : V [ prop ] ) : Branch < V [ prop ] >
			}
			: never
	) ;
} ;



interface Renn < E > extends State < Array < E > >
{
	insert ( newvs : E [] ) : void ;
	delete ( start : number , length : number ) : number ;

	at ( pos : number ) : ToState < E > ;
}



type ToState < V > =
(
	V extends object ?
	(
		V extends Array < infer E > ?
			Renn < E > :
			Branch < V >
	) :
	State < V >
) ;




namespace usagi
{
	( s : State < string > ) => s.$ += "Aa" ;
	
	type xy = { x : number ; y : number ; } ;

	( state : ToState < xy > ) =>
	{
		state.$ = { x : 1 , y : 1 } ;
		state.$.x = 0 ;
		state.x.$ *= 1.618 ;
		state.y.$ += 5 ;
	} ;

	type record = { hinmei : string , tanka : number ; kingaku : number ; } ;

	( s : ToState < { total : number , items : record [] } > ) =>
	{
		const r = { vChan() { console.log ( s.$ ) } } ;

		s.$_addref ( r ) ;

		s.total.$ = 5000 ;
		s.items.$ .map ( v => v.kingaku ) ;
		s.items.at( 0 ).kingaku.$ = 500 ;
		s.total.$ = 1000 ;

		s.$.total = 5000 ;

		s.items.at( 5 ).$ = { hinmei : "洗濯石鹸" , tanka : 500 , kingaku : 2000 } ;

		s.$_rmvref ( r ) ;
	}

	( s : Renn < record > ) =>
	{
		s.insert ( [ { hinmei : "" , tanka : 200 , kingaku : 1000 } ] ) ;

		s.at( 0 ).kingaku.$ = 20 ;
		
	} ;
}


namespace ConstructorSwitching
{
	type PropTypeList < V extends object > =
	{
		readonly [ prop in keyof V ] ? :
		(
			V [ prop ] extends object ?
				{
					new ( newv : V [ prop ] ) : Branch < V [ prop ] >
				}
				: never
		) ;
	} ;

	type xy_t = { x : number ; y : number ; } ;

	class XY implements Branch < xy_t >
	{
		constructor ( v: xy_t )
		{}

		x = Leaf ( 0 ) ;
		y = Leaf ( 0 ) ;

		get $ () : xy_t { return { x : this.x.$ , y : this.y.$ } }

		$_addref(ref: State.Ref): void {}
		$_rmvref(ref: State.Ref): void {}
	}
	
	type area = { pos : xy_t , size : xy_t } ;

	const ptlist : PropTypeList < area > =
	{
		pos : XY ,
	} ;

	if ( ptlist.pos )
	{
		const xy = new ptlist.pos ( { x : 0 , y : 0 } ) ;

		xy.x.$ += 5 ;
	}
}

