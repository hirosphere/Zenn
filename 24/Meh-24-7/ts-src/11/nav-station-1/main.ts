const a = 1;

import { dom, ef, root, log } from "../../meh/index.js";


const App = () =>
{
	return ef.body
	(
		ef.main
		(
			ef.h1( "Station-1" ),
			ef.p( "モバイル指向ナビゲーションサンプル" ),
		),
	);
};

dom.create( root, App(), "html" );
