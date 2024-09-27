import { Leaf } from "../model/leaf.js";
import { defs } from "./defs.js";
import * as nodet from "./nodet.js";

export const add =
(
	part : defs.part_,
	com_qe : Element | string,
	rel_qe ? : Node | string
)
 : void =>
{
	const com_e : Element | null = typeof com_qe == "string" ? document.querySelector( com_qe ) : com_qe || null;
	const rel_e : Node | null = typeof rel_qe == "string" ? document.querySelector( rel_qe ) : rel_qe || null;

	if( part instanceof nodet.Element )
	{
		com_e && part.node && com_e.insertBefore( part.node, rel_e )
	}
}

type create_nodet_t < E extends Element > =
(
	first ? : defs.ec < E > | defs.parts,
	... remain : defs.parts
)
=> nodet.Element ;

function create_nodet
(
	ns : string,
	type : string,
	first ? : defs.ec < any > | defs.part_ | defs.parts,
	... remain : defs.parts
) : nodet.Element
{
	const ec =
	(
		( first instanceof Object ) && !
		(
			first instanceof nodet.Element ||
			first instanceof Leaf ||
			first instanceof Node
		)
		&& first
		|| undefined
	);

	if( ec )
	{
		return new nodet.Element( { ns, type, ... ec, parts : remain } )
	}

	else
	{
		const parts = [];
		return new nodet.Element( { ns, type, parts } )
	}
}


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

		const fn : create_nodet_t < any > = ( first, ... remain ) => create_nodet( this.ns, type, first, ... remain );
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
