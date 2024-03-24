
import { types } from "./models.js";

export const map : types.danchi = { title: "課題団地", blocks: {} };

map.blocks[ "1" ] = { caption: "1街区", buildings: {} };

map.blocks[ "1" ].buildings[ "1" ] =
{
	caption: "1号棟",
	rooms:
	{
		"101": { title: "Exist" },
		"201": { title: "Leaf" },
		"301": { title: "Renn" },
		"401": { title: "Branch" },
		"501": { title: "Navi" },
	}
};







/**   */


type ca =
	"Exist" | "Leaf" | "Branch" | "Renn" |
	"" | "" | 
	"DOM" | "DOM.Def" | "DOM.Nodet" | "DOM.Part" | "DOM.EF" | "" | "" | "" | "" ;

/*

** コンテナ
*** 集計

** リスト
*** ソート

** 文字列


*/

