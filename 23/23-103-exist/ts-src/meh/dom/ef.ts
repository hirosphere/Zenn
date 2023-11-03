import { defs } from "./defs.js";
import { Nodette } from "./nodette.js";

const log = console.log;
//

export const create = ( def : defs.Element, ceqsel : Element | string, rel ? : Node ) =>
{
	const ce = typeof ceqsel == "string" ? document.querySelector( ceqsel ) : ceqsel;

	let nodet = new Nodette( def, ce, rel );

	return { delete() { nodet.delete(); } };
}

type HTMLElementFactory =
{
	[ type in keyof HTMLElementTagNameMap ] : defs.CreateElement < HTMLElementTagNameMap[ type ] > ;
};

class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{
		;
	}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	fns = new Map < string, () => defs.Element > ;

	makefn( type : string )    //  エレメントタイプ名に応じたエレメント定義レコード作成関数を用意
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		log( type );
		
		const fn = ( ... args : any ) => defs.createElement( type, ... args );
		this.fns.set( type, fn );
		return fn;
	}
}

const createElementFactory = < T extends object > ( ns : string ) =>
{
	return new Proxy ( {} as T, new Handler( ns ) );
}

export const ef = createElementFactory < HTMLElementFactory > ( "" );
