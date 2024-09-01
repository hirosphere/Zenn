import { dom, ef, root, log } from "../../meh/index.js";

const App = () =>
{
	return ef.article
	(
		ef.h1( "Noddi - Meh" ),
	);
};


dom.create( root, App(), "body" );
