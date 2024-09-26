import { Leaf, Renn, dom, ef, each, log } from "../meh/index.js";

export const ListApp = () =>
{
	return ef.article
	(
		{},
		ef.h2( "List" ),
		ef.section
		(
			//each(),
			"each"
		),
	);
};

namespace models
{
	export class App
	{
		list = new Renn
		(
			[
				"柏 かしわ",
				"我孫子 あびこ",
				"天王台 てんのうだい",
				"取手 とりで"
			]
		);
	}
}