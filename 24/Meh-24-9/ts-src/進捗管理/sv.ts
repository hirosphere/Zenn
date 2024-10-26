
export namespace sv.指示
{
	export type 製品 =
	{
		名称 : string ;
		注文数 : number ;
		受入数 : number ;
	};
	
	export type 工程 =
	{};
	
}

export namespace sv.進捗
{
	export type 進捗管理 =
	{
		製品 : 指示.製品 ;
	};

	export type 工程 =
	{
		受け入れ : 製品 [] ;
		良品実績 : 製品 [] ;
		不良品実績 : { [ type : string ] : 製品 } ;
	};

	export type 製品 =
	{
		収容数 : number ;
		入り数 : number ;
	};
	
}
