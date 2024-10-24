import { leaf } from "../model/leaf.js";
import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

function create_element
(
	ns : string,
	type : string,
	first ? : defs.ec < any > | defs.part,
	... remain : defs.parts
) : nodet.Element
{
	if
	(
		first instanceof leaf.r.Leaf ||
		first instanceof nodet.Nodet ||
		first instanceof defs.Place ||
		first instanceof Node ||
		typeof first == "string" ||
		typeof first == "number" ||
		typeof first == "boolean"
	)
	{
		const parts : defs.parts =
		(
			remain !== undefined ? [ first, ... remain ]
			: [ first ] 
		);

		return new nodet.Element( { ns, type, parts } );
	}

	return new nodet.Element( { ns, type, ... first, parts : remain } );
}

type create_nodet_t < E extends Element > =
(
	first ? : defs.ec < E > | defs.part,
	... remain : defs.parts
)
=> nodet.Element ;

class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	private fns = new Map < string, create_nodet_t < any > > ;

	private makefn( type : string )
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		const fn : create_nodet_t < any > = ( first, ... remain ) => create_element( this.ns, type, first, ... remain );
		this.fns.set( type, fn );
		return fn;
	}
}


type EF < Map extends { [ key : string ] : any } > =
{
	[ e in keyof Map ] : create_nodet_t < Map[ e ] > ;
};

export const ef = new Proxy
(
	{} as EF < HTMLElementTagNameMap >,
	new Handler( "" )
);

export const sf = new Proxy
(
	{} as EF < SVGElementTagNameMap >,
	new Handler( "http://www.w3.org/2000/svg" )
);
