import { leaf , Renn , model , ef , pl , dom , df , log } from "../../../meh/index.js" ;

namespace VC
{
	export const Main = () =>
	{
		return ef.main
		(
			{  } ,

			ef.h1 ( "製造管理" ) ,
			ef.p ( "プロジェクト一元管理と可視化" )
		) ;
	}
}

export const 製造管理 = VC.Main ;

export const index : model.navi.types.index =
{
	name : "製造管理" ,
	parts :
	[
		{ name : "進捗" } ,
		{ name : "作業" } ,
		{ name : "工程設計" } ,
		{ name : "製品情報" } ,
	]
}
