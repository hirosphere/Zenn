export type 車両注文 =
{
	注文Id : string ;
	説明文 : string ;
	
	品番 : string ;
	注文数 : number ;
	受入数 : number ;
	
	工程リスト : 工程 [] ;
};

export type 工程 =
{
	工程Id : string ;
	名称 : string ;
	色 : string ;
	色コード : string ;
};

export type 製品箱 =
{
	数量 : number ;
};

export type 号機Id = string ;

export type 製品状態 = "良品" | "NG" | "ゴミ付きNG" | "カップ跡NG" | "モヤNG" | "版穴NG" | "その他" ;
