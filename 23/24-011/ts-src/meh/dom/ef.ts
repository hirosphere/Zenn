import { Container } from "../model/index.js";
import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
const log = console.log;

export const create =
(
	container : Container,
	def : defs.Node,
	ceqsel : Element | string,
	rel ? : Node

) : Nodet =>
{
	const ce : Element | null = typeof ceqsel == "string" ? document.querySelector( ceqsel ) : ceqsel;

	return new Nodet( container, def, ce, rel );
}



/** factory types */


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




/** factory proxy handler */


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

		log( type );
		
		const fn : create_element_t < any > = ( first, ... remain ) => createElement( this.ns, type, first, remain );
		this.fns.set( type, fn );
		return fn;
	}
}

const createElementFactory = < T extends object > ( ns : string ) =>
{
	return new Proxy ( {} as T, new Handler( ns ) );
}

export const ef = createElementFactory < HTMLElementFactory > ( "" );
export const sf = createElementFactory < SVGElementFactory > ( "http://www.w3.org/2000/svg" );

