import { ef , navi } from "../../meh/index.js" ;
import { PartList } from "../App/PartList.js" ;

import { Posts } from "./Posts.js" ;
import { EQListApp } from "./EQ_List.js" ;
import { UUID_Clock } from "./UUID_Clock.js" ;
import { EkiIndex } from "./Eki/EkiIndex.js" ;
import { CSSOM_Quest } from "./CSS_Qst.js" ;
import { OKLCH } from "./OKLCH.js";
import * as 製造 from "./製造管理/製造Index.js" ;
import * as Com_Port from "./Com_Port.js" ;

export const index_def : navi.types.index =
{
	name : "AG1" ,
	parts :
	[
		{ name : "CSSOM" , page : () => CSSOM_Quest () } ,
		{ name : "Posts" , page : () => Posts () } ,
		{ name : "OKLCH" , page : () =>  OKLCH () } ,
		{ name : "UUID_Clock" , page : () => UUID_Clock () } ,
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
		製造.index ,
		{ name : "Com_Port" , page : () => Com_Port.VC.Applet () } ,
	]
}
