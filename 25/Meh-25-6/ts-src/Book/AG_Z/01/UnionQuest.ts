import { LS_SET } from "./UnionQuest.symbols.js" ;

type Live < V > =
{
	$ : V ;
}

namespace Live
{
	export function $set < V > ( s : Live < V > , val ? : V ) : V
	{
		if ( arguments.length >= 2 ) s.$ = val as V ;
		return s.$ ;
	}
}

namespace Ease
{
	export type Branch < V extends typo < any > > =
	{
		[ prop in keyof V ] :  prop extends "type" ? V [ prop ] :  Live < V [ prop ] > ;
	}

	type typo < TN extends string > =
	{
		readonly type ? : TN ;
	}
}

/*  */

type Memo = Ease.Branch < memo > ;
class memo
{
	type : "memo" = "memo" ;
	title : string ;
	favorited : boolean ;

	constructor ( i : Partial < memo > )
	{
		this.title = i.title ?? "" ;
		this.favorited = i.favorited ?? false ;
	}
}

type Todo = Ease.Branch < todo > ;
class todo
{
	type : "todo" = "todo" ;
	title : string ;
	comleted : boolean ;

	constructor ( i : Partial < todo > )
	{
		this.title = i.title ?? "" ;
		this.comleted = i.comleted ?? false ;
	}
}

type node = memo | todo ;

type Node = Ease.Branch < node > ;

( s : Node ) =>
{
	switch ( s.type )
	{
		case "memo" :
			Live.$set ( s.title , "Oo oo Aoo" ) ;
			Live.$set ( s.favorited , true ) ;
			break ;

		case "todo" :
			Live.$set ( s.comleted , true ) ;
			break ;
	}
}

