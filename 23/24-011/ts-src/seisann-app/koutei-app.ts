import { dom, ef } from "../meh/index.js";
import * as models from "./koutei-1.js";

const log = console.log;
const ltrue = true;
const ls = {  };

/**  */

const App = () =>
{
	const model : models.単品製造 =
	{
		製品名称: "京成3500形 モハ3504 初期色",
		製品コード: "71119",
		注文数: 3500,
		工程:
		[
			{
				番号: "1",
				名称: "帯印刷",
				色: "朱色",
				セット担当者: { コード: "11-011", 姓: "Pavrovna", 名: "Anna" },
				製品: []
			},			
			{
				番号: "2",
				名称: "ドア枠印刷",
				色: "黒銀",
				セット担当者: { コード: "11-011", 姓: "Pavrovna", 名: "Anna" },
				製品: []
			},			
		]
	};


	return ef.article
	(
		ef.h1( "[ ", model.製品コード, " ", model.製品名称, " ]", " 製造進捗" ),
		工程( model.工程[ 0 ] ),
	);
};

const 工程 = ( model : models.工程 ) =>
{
	return ef.article
	(
		{ class: "工程" },
		ef.h2( "工程 ", model.番号, " ", model.名称, " " ),
		ef.p( model.色 ),
	);
};

const 製品箱 = ( model : models.製品箱 ) =>
{
	return ef.section
	(
		model.番号
	);
}



/**  */

export const KouteiMain = () =>
{
	return App();
};
