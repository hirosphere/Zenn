import { Leaf, Renn, dom, ef, each, free, log } from "../meh/index.js";

export const ListApp = () =>
{
	const m = new models.App();

	const fr = free();

	fr.content = "";

	return ef.article
	(
		{},
		ef.h2( "List" ),
		ef.section
		(
			ef.h3( "常磐線" ),

			ef.ul
			(
				ef.h4( "快速" ),

				each
				(
					m.list,
					v => ef.li( { style : { textAlign: "right", color: "hsl( 180, 50%, 40% )" } }, v ),
				),

				ef.h4( "各駅停車" ),

				each
				(
					m.list,
					v => ef.li( { style : { textAlign: "right", color: "hsl( 330, 60%, 40% )" } }, v ),
				),
			),
			fr,
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