import { Owner, StrSrcFactory } from "../model/index.js";
import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";

const log = console.log;

export const create = ( owner : Owner, def : defs.Element, ceqsel : Element | string, rel ? : Node ) =>
{
	const ce = typeof ceqsel == "string" ? document.querySelector( ceqsel ) : ceqsel;

	let nodet = ce && new Nodet( owner, def, ce, rel );

	return { terminate() { nodet?.terminate(); } };
}


/**  */

type FirstArg < E extends Element = any > = defs.EChar < E > | defs.Part;

type CreateElementDefTemplate < E extends Element > =
(
	first ? : FirstArg < E >,
	... remain : defs.Part []
)
=> defs.Element;

const createElementDef = ( ns : string, type : string, first ? : FirstArg, ... remain : defs.Part [] ) : defs.Element =>
{
	if( typeof first == "object" )
	{
		if( first instanceof defs.Element || first instanceof defs.Each || first instanceof StrSrcFactory )
		{
			return new defs.Element( ns, type, undefined, [ first, ... remain ] );
		}
		else
		{
			return new defs.Element( ns, type, first, remain );
		}
	}

	const parts = first !== undefined ? [ first, ... remain ] : undefined;
	return new defs.Element( ns, type, undefined, parts );
}

//

class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	fns = new Map < string, ( first : FirstArg, ... remain : defs.Part [] ) => defs.Element > ;

	makefn( type : string )    //  エレメントタイプ名に応じたエレメント定義レコード作成関数を用意
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		log( type );
		
		const fn = ( first : FirstArg, ... remain : defs.Part [] ) => createElementDef( this.ns, type, first, ... remain );
		this.fns.set( type, fn );
		return fn;
	}
}

const createElementFactory = < T extends object > ( ns : string ) =>
{
	return new Proxy ( {} as T, new Handler( ns ) );
}



type HTMLElementFactory =
{
	[ type in keyof HTMLElementTagNameMap ] : CreateElementDefTemplate < HTMLElementTagNameMap[ type ] > ;
};

type SVGElementFactory =
{
	[ type in keyof SVGElementTagNameMap ] : CreateElementDefTemplate < SVGElementTagNameMap[ type ] > ;
};

export const ef = createElementFactory < HTMLElementFactory > ( "" );
export const sf = createElementFactory < SVGElementFactory > ( "http://www.w3.org/2000/svg" );
