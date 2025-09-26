import { ru , Agg , agg , agg_echan , } from "./Life.js" ;
import { Live , ls_set , ls_get , ls_notify } from "./LiveState.js" ;
import { Row , RowCore } from "./Arrigate.js" ;

const log = console.log ;

export function Ease < V > ( val : V , agg ? : Agg ) : Ease < V >
{
	return val instanceof Object ?
	(
		val instanceof Array ?
			new EaseRow ( val , agg ) as any
			: new EaseBranch ( val , agg ) as any
	)
	: Live ( val , agg ) as any ;
}


export type Ease < V > =
(
	V extends object ?
	(
		V extends Array < infer E > ?
			Row < E , Ease < E > > :
			Branch < V >
	) :
	V extends boolean ?
		Live < boolean > :
		Live < V >
) ;



class EaseRow < E > extends RowCore < E , Ease < E > >
{
	protected override createElement ( val : E ) : Ease < E >
	{
		return Ease ( val , this ) ;
	}
}


/* */


type Branch < V extends object > = Live < V > & Agg &
{
	[ prop in keyof V ] : Ease < V [ prop ] >
} ;

export class EaseBranch < V extends object >  extends Live.Core < V >  implements Agg
{
	constructor ( val : V , agg ? : Agg )
	{
		super ( agg ) ;

		Object.entries ( val ) .forEach
		(
			( [ prop , val ] ) => ( this as any ) [ prop ] = Ease ( val , this ) 
		) ;
	}

	public [ ls_set ] ( val : V , ch ? : object ) : void
	{
		Object.entries ( val ).forEach ( ent => set_prop ( this , ent ) ) ;
		this [ ls_notify ] ( ch ) ;
	}

	public [ ls_get ] () : V
	{
		const rt : any = {} ;
		Object.entries ( this ).forEach
		(
			( [ prop , ls ] ) =>
			{
				if ( ls instanceof Live.Core )
				{
					rt [ prop ] = ls.$ ;
				}
			}
		)
		return rt ;
	}

	public [ agg_echan ] () : void
	{
		this [ ls_notify ] ( undefined ) ;
	}
}

function set_prop ( br : any , [ prop , val ] : [ any , any ] )
{
	const ls = br [ prop ] ;
	if ( ls instanceof Live.Core )
	{
		ls.set ( val , br ) ;
	}
}

