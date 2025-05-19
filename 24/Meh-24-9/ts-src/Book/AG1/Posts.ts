import { leaf , Renn , ef , defs , dom , log } from "../../meh/index.js" ;

namespace VM
{
	;

	[
		"TreeType キーボードでツリー構造・値編集" ,
		"Jectia 任意のデータタイプとモデル・ビュー分離なExcel"
	]
}


namespace VC
{
	export const Applet = () : dom.MehElement =>
	{
		return ef.main
		(
			{ class : "FV PXX" } ,
			ef.h1 ( "Posts" ) ,
		);
	}
}

export const Posts = VC.Applet ;
