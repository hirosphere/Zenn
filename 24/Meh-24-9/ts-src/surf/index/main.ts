import { leaf, ef, each, dom, log } from "../../meh/index.js";
import * as link from "./link.js";
import { links } from "./link-data.js";

const App = () =>
{
	const clock = new ClockModel();

	return null ||
	[
		ef.h1( Clock( clock ) ),
		
		...links.map( i => link.Block( i ) ),
	];
};

const loop = < T > ( count : number, fn : ( i : number ) => T ) : T[] =>
{
	const rt = new Array < T >;
	for( let i = 0 ; i < count ; i ++ )
	{
		rt.push( fn( i ) ) ;
	}
	return rt;
}

const Clock = ( m : ClockModel ) =>
{
	return ef.span
	(
		m.time, " ", m.iid
	);
};

class ClockModel
{
	time = leaf.str ( "" );
	iid = leaf.num ( 0 );

	constructor()
	{
		this.update();
	}

	update()
	{
		const date = new Date();
		this.iid.value = setTimeout( () => this.update(), 1000 - date.getTime() % 1000 );
		this.time.value = date.toLocaleString();
	}
}

namespace models
{
}

dom.add( App(), "body" )
