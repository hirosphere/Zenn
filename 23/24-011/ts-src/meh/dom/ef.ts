import { Exist, Renn } from "../model/index.js";
import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
const log = console.log;


/**  create()  ファクトリー等で組み立てた「構造定義」から実DOMNodeを作成。  */

export const create =
(
	container : Exist.Container,
	def : defs.Node,
	com_qe ? : Element | string,
	rel_qe ? : Node | string

) : Nodet =>
{
	const com_e : Element | null = typeof com_qe == "string" ? document.querySelector( com_qe ) : com_qe || null;
	const rel_e : Node | null = typeof rel_qe == "string" ? document.querySelector( rel_qe ) : rel_qe || null;

	return new Nodet
	(
		container,
		def,
		com_e,
		(
			rel_e && rel_e.parentElement == com_e
		
		) ? rel_e : undefined
	);
}

export const each = < I = any >
(
	source : Array < I > | Renn < I >,
	create : ( value : I ) => defs.Node,

) => new defs.Each
(
	source,
	create,
); 


/** エレメントファクトリーのプロキシにあたえる「ハンドラー」の型定義。 */


const createElement =
(
	ns               : string,
	type             : string,
	first_part ?     : defs.EChar | defs.Part,
	remain_parts ?   : defs.Part[]

) : defs.Element =>
{
	return new defs.Element( ns, type, first_part, remain_parts );
};



class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	fns = new Map < string, create_element_t < any > > ;

	makefn( type : string )
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		// log( type );
		
		const fn : create_element_t < any > = ( first, ... remain ) => createElement( this.ns, type, first, remain );
		this.fns.set( type, fn );
		return fn;
	}
}

const createElementFactory = < T extends object > ( ns : string ) =>
{
	return new Proxy ( {} as T, new Handler( ns ) );
}



/** HTML / SVG ファクトリー型定義 */

type create_element_t < E extends Element > =
(
	first ? : defs.EChar < E > | defs.Part,
	... remain : defs.Part []

) => defs.Element < E > ;

type HTMLElementFactory =
{
	[ type in keyof HTMLElementTagNameMap ] : create_element_t < HTMLElementTagNameMap[ type ] > ;
};

type SVGElementFactory =
{
	[ type in keyof SVGElementTagNameMap ] : create_element_t < SVGElementTagNameMap[ type ] > ;
};



/** HTML / SVG エレメントファクトリー */

export const ef = createElementFactory < HTMLElementFactory > ( "" );
export const sf = createElementFactory < SVGElementFactory > ( "http://www.w3.org/2000/svg" );

