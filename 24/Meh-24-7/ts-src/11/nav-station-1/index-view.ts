import { Exist, dom, ef, each, log } from "../../meh/index.js";
import * as m from "./index-model.js";

export const App = ( model : m.App ) =>
{
	return ef.body
	(
		ef.main
		(
			ef.h1( "Station-1" ),
			ef.p( "モバイル指向ナビゲーションサンプル" ),
			Tree( model.root ),
		),
	);
};

const Tree = ( index : m.Index ) =>
{
	return ef.ul
	(
		Index( index ),
	);
}

export const Index = ( model : m.Index ) : dom.defs.Node =>
{
	return ef.li
	(
		ef.a
		(
			{
				attrs: { href: "" },
				acts:
				{
					click( ev )
					{
						ev.preventDefault();
					}
				},
			},
			model.title,
		),

		ef.ul
		(
			each
			(
				model.parts,
				order => Index( order.source )
			)
		),
	);
};
