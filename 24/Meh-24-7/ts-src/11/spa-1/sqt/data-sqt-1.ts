
namespace models
{
	type 注文 =
	{
		Id : string ;
		品番 : string ;
		注文数 : number ;
		工程リスト : リスト < 工程 > ;
	};
	
	type リスト < T > = { [ id : string ] : T }; 
	
	type 工程 =
	{
		Id : string ;
		名称 : string ;
	};
	
	type 製品状態 = "良品" | "その他不良品" | "ゴミ付き";
	
	type 製品箱 =
	{
		箱Id : string ;
		入り数 : number ;
		工程履歴 : 工程実績 [] ;
	};
	
	type 工程実績 =
	{
		工程Id : string ;
		
	};
	
	const 注文リスト =
	{
		"114-223345-0667899":
		{
			品番: "10-5585",
			注文数: 4890,
			
		}
	};	
}

namespace vm
{
	;

	type 号機ビュー =
	{
		
	};
}
