* 駅名表示器

HeartRails Express のWeb JSON サービスを使った全国鉄道駅名表示器。


** コンテナスイッチ表

Root  : エリア選択リスト
Area ( 北海道 | ... | 九州 ) => 都道府県選択リスト
Pref ( 北海道 | ... | 沖縄 ) => 路線選択リスト
Line ( 宇都宮線 | ... | ニューシャトル ) => 駅選択リスト
StationContaner ( 並列駅選択リスト )
	Station 駅名表示


const page_switch_defs =
{
	root : ( index : spa.Index ) =>
	{
		if ( index typeof Index.Station )
	} ,

	station :
	{
		get_page_switch_key ( index : SPA.Index ) : SPA.Index
		{
			return index.com ;
		}
	}
}
