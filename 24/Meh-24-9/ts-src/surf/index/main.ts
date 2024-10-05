import { Leaf, ef, each, dom, log } from "../../meh/index.js";
import * as link from "./link.js";
import { links } from "./link-data.js";

const App = () =>
{
	return null ||
	[
		ef.h1( "Meh-24-9 Surf" ),
		ef.p( "Meh-24-9 Surf" ),
		...links.map( i => link.Block( i ) )
	];
};

dom.add( ef.main( ... App() ), "body" )
