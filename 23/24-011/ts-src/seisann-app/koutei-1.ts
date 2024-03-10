
const log = console.log;
const ltrue = true;
const ls = {  };

/**  */


alert( "工程" )

export type セット製品製造 =
{
	製品名称 : string ;
	製品コード : string ;
	発注コード : string ;
	発注日時 : string ;
	納期 : string ;
	注文数 : number ;
	要素単品 : 単品製造[] ;
};

export type 単品製造 =
{
	製品名称 : string ;
	製品コード : string ;
	注文数 : number ;
	工程 : 工程[] ;
};

export type 工程 =
{
	番号: string ;
	名称 : string ;
	色 : string;
	セット担当者 : 社員;
	製品 : 製品箱[] ;
};

export type 製品箱 =
{
	番号 : number ;
	数量 : number ;
	進捗 : 進捗 ;
};

export type 社員 =
{
	コード : 従業員コード ;
	姓 : string ;
	名 : string ;
};

export type 従業員コード = string ;

export type 進捗 = "開始前" | "完了" | "仕掛り" ;



/**  */
