import { Leaf, Renn, dom, ef, each, log } from "../meh/index.js";

export const ListApp = () =>
{
	const mo = new models.App();

	return ef.article
	(
		{},
		ef.h2( "List" ),
		ef.section
		(
			ef.h3( "快速" ),

			ef.ul
			(
				[ "aoto", "takasago", "koiwa" ]
				.map( v => ef.li( v ) ),
			),
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