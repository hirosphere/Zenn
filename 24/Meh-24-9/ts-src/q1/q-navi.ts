import { Renn, ef, each , navi } from "../meh/index.js";

export const NaviApp = () =>
{
	const m = new ms.App();
	
	return ef.article
	(
		ef.h2( "Navi" ),
		ef.p( "Navi" ),
	);
};

namespace ms
{
	const sitetree : navi.Index.values =
	{
		name : "",
		title : "通勤電車",
		parts :
		[
			{
				name : "jb",
				title : "常磐線",
				parts :
				[
					{ name : "kita-senju", title : "北千住" },
					{ name : "matsudo", title : "松戸" },
					{ name : "kashiwa", title : "柏" },
					{ name : "abiko", title : "我孫子" },
				]
			}
		]
	};

	export class App
	{
		public readonly browser = new navi.Browser();
		public readonly root = new navi.Index( sitetree );
	}
}
