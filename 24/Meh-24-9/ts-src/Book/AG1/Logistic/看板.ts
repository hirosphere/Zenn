import { ef , } from "../../../meh/index.js" ;

export const 看板 = () =>
{
	const dms =
	[
		{ 名称 : "桜神田" , よみ : "さくら じんで" , 略コード : "108" } ,
		{ 名称 : "鶴ヶ島脚折" , よみ : "つるがしま すねおり" , 略コード : "1xx" } ,
		{ 名称 : "志木中宗岡4丁目" , よみ : "しきなかむねおか よんちょうめ" , 略コード : "441" } ,
	] ;

	const dm = dms [ 1 ] ;

	return ef.article
	(
		{
			class : "FV BH JC AC" ,
			style :
			{
			}
		} ,
		ef.p
		(
			{
				style :
				{
					fontSize : "3em" ,
				}
			} ,
			dm.略コード
		) ,
		ef.h1
		(
			{
				style :
				{
					fontSize : "10em" ,
					fontFamily : "Meiryo" ,
				}
			} ,
			dm.名称 ,
		) ,
		ef.p
		(
			{} ,
			dm.よみ
		) ,
	)
}
