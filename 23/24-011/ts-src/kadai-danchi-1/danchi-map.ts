
import { types } from "./models.js";

const buils = ( path : types.path ) =>
{
	;
};


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

map.blocks[ "1" ].buildings[ "3" ] =
{
	caption: "1-3 鉄道ウィジェット",
	rooms:
	{
		"101": { title: "踏み切り音" },
		"102": { title: "駅名表示" },
	}
};

map.blocks[ "1" ].buildings[ "13" ] =
{
	caption: "13号棟",
	rooms:
	{
		"101": { title: "ToDo" },
		"201": { title: "日高屋メモ" },
		"301": { title: "気象庁地震リスト" },
		"401": { title: "URONラボ" },
		"501": { title: "ツリーメモ" },
		
		"102": { title: "タブインデントテキストツリービュー" },
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

