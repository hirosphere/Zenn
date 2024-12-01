import { leaf } from "../model/leaf.js";
import { defs } from "./defs.js";
import * as mn from "./meh-node.js";

function create_element
(
	ns : string,
	type : string,
	first ? : defs.ec < any > | defs.part,
	... remain : defs.parts
) : mn.MehElement
{
	if
	(
		first instanceof leaf.Src ||
		first instanceof mn.MehNode ||
		first instanceof defs.Place ||
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

		return new mn.MehElement( { ns, type, parts } );
	}

	return new mn.MehElement( { ns, type, ... first, parts : remain } );
}

type create_meh_element_t < E extends defs.El > =
(
	first ? : defs.ec < E > | defs.part,
	... remain : defs.parts
)
=> mn.MehElement ;

class Handler < T extends object > implements ProxyHandler < T >
{
	constructor( private ns : string )
	{}

	public get( target : T, type : string )
	{
		return this.makefn( type );
	}

	private fns = new Map < string, create_meh_element_t < any > > ;

	private makefn( type : string )
	{
		if( this.fns.has( type ) )  return this.fns.get( type );

		const fn : create_meh_element_t < any > = ( first, ... remain ) => create_element( this.ns, type, first, ... remain );
		this.fns.set( type, fn );
		return fn;
	}
}


type EF < Map extends { [ key : string ] : any } > =
{
	[ e in keyof Map ] : create_meh_element_t < Map[ e ] > ;
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
