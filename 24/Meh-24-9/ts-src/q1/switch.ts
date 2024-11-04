import { leaf , Renn , dom , ef , log } from "../meh/index.js" ;

class PageSelector
{
	;
}

const sw = < S >
(
	state : leaf.types.lol < S > ,
	create : ( state : S ) => dom.defs.node
) =>
{
	const map = new Map < S, ( state : S ) => dom.defs.node > ;

	const update = ( state : S ) => create ( state ) ;
}

( state : boolean ) =>
{
	const l : leaf.types.lol.str = leaf( "" ) ;
	const ol : leaf.types.lol.str = "" ;
	sw ( state , sw_bool )
}

const sw_bool = ( state : boolean ) : dom.defs.node =>
{
	switch( state )
	{
		case true : return ef.p ( "TRUE !!" ) ;
		case false : ef.del ( "FALSE !!" ) ;
	}
}
