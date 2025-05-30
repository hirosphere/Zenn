import { ef , navi } from "../../meh/index.js" ;
import { PartList } from "../UI/PartList.js" ;

export * from "./Posts.js" ;
export * from "./OKLCH.js" ;
import { EQListApp } from "./EQ_List.js" ;
//export * from "./UUID_Clock.js" ;
//export * from "./Rectia.js" ;
//export * as 物流 from "./Logistic/index.js" ;
import { EkiIndex } from "./Eki/EkiIndex.js" ;
import { CSSOM_Quest } from "./CSS_Qst.js" ;

/*

"AG1" : AG1.Index ,
"AG1.Posts" : AG1.Posts ,
"uig-oklch" : AG1.OKLCH ,
"EQ_LIST" : AG1.EQListApp ,
"UUID_CLOCK" : AG1.UUID_Clock ,
"Rectia" : AG1.Rectia ,
"AG1.物流.看板" : AG1.物流.看板

*/

export const index = { name : "AG1" , type : "AG1" ,
	parts :
	[
		{ name : "CSSOM" , page : () => CSSOM_Quest () } ,
		{ type : "AG1.Posts" , name : "Posts" } ,
		{ name : "OKLCH" , type : "uig-oklch" } ,
		{ name : "Rectia" , type : "Rectia" } ,
		{ name : "UUID_Clock" , type : "UUID_CLOCK" } ,
		{ name : "EQ_List" , page : () => EQListApp () } ,
		EkiIndex ,
		{ name : "物流" , title : "物流進捗管理" , parts :
			[
				{ name : "全体進捗" } ,
				{ name : "グループ進捗" } ,
				{ name : "製品情報" } ,
				{ name : "店舗情報" } ,
				{ name : "看板" , type : "AG1.物流.看板" }
			]
		} ,
		{ name : "製造進捗管理" , parts :
			[
				{ name : "進捗" } ,
				{ name : "実績記録" } ,
				{ name : "プロジェクト情報" } ,
				{ name : "工程情報" } ,
			]
		}
	]
}
