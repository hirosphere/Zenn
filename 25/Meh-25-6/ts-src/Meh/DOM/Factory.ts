import { Leaf } from "../Meh.js";
import { log } from "../Util.js" ; 
import { DD , MehElement , PartsPlace } from "./DOM.js" ;


/* HTMLドキュメントに MehElement / Text を追加 */

export const add =
(
	dec : DD.Part | DD.Part [] ,	/* 追加したいエレメント/ノードの宣言 */
	celq : Element | string ,		/* 追加先のエレメント/クエリー */
	relq ? : Element | string		/* 追加したい位置の後に来るエレメント/クエリー */

) : PartsPlace | null =>
{
	const cel = mak_el ( celq ) ;
	const rel = relq && mak_el ( relq ) || null ;
	if ( cel == null )  return null ;

	return PartsPlace.create
	(
		dec instanceof Array ? dec : [ dec ] ,
		cel ,
		rel
	) ;
}


const mak_el = ( elq : Element | string ) : Element | null =>
{
	if ( elq instanceof Element )  return elq ;
	return document.querySelector ( elq ) ;
}


/* ElementFactory */

const first = {} ;


const create = < E extends Element = any >
(
	ns : string ,
	type : string ,

	first : DD.Element | DD.Part | undefined ,
	remain : DD.Part [] ,

) : MehElement =>
{
	if ( first instanceof Object )
	{
		if
		(
			first instanceof MehElement ||
			first instanceof DD.PartPlace ||
			first instanceof Leaf
		)
		{			
			return new MehElement ( ns , type , {} , [ first , ... remain ] ) ;
		}

		return new MehElement ( ns , type , first , remain ) ;
	}

	return new MehElement ( ns , type , {} , [ first , ... remain ] ) ;
}


type create < E extends Element > =
(
	first ? : DD.Element | DD.Part ,
	... remain : DD.Part []
)
=> MehElement ;


class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	private fns = new Map < string, create < any > > ;

	private makefn( type : string )
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		const fn : create < any > = ( first, ... remain ) =>
		(
			create ( this.ns, type, first, remain )
		) ;

		this.fns.set( type, fn );
		return fn;
	}
}


type ElementFactory < Map extends { [ key : string ] : any } > =
{
	[ e in keyof Map ] : create < Map[ e ] > ;
};

export const ef = new Proxy
(
	{} as ElementFactory < HTMLElementTagNameMap >,
	new Handler( "" )
);

export const sf = new Proxy
(
	{} as ElementFactory < SVGElementTagNameMap >,
	new Handler( "http://www.w3.org/2000/svg" )
);
