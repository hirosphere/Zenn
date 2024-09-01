const a = 1;

import { navi, dom, ef, root, log } from "../../meh/index.js";
import * as im from "./index-model.js";
import * as iv from "./index-view.js";

const br = new navi.Browser( root );

const App = () =>
{
	const rootIndex = new im.Root( root, br );

	br.index.value = rootIndex;

	return ef.body
	(
		ef.main
		(
			ef.h1( "Station-1" ),
			ef.p( "モバイル指向ナビゲーションサンプル" ),
			Tree( rootIndex ),
		),
	);
};

const Tree = ( index : im.Index ) =>
{
	return ef.ul
	(
		iv.RootIndex( index ),
	);
}

dom.create( root, App(), "html" );
