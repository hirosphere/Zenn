
type ca = "鉄道" | "地震" | "色彩" | "グラフィック" | "オーディオ" | "モーション" | "構造幾何" | "工程管理" | "業務支援" | "業務知識蓄積" | "資材管理" | "実装" | "" | "" | "" ;
type cb = "GUI" | "" | "" | "" | "自動制御" | "マイコン" | "オブジェクト" | "アレイ" | "文字列" | "" ;

type item = { title : string, ca ?: ca [] , cb ?: cb [] , }

export const kadaimap : item [] =
[
	{ title: "自動運転", ca: [ "鉄道" ] },
	{ title: "コマアニメーション", ca: [ "グラフィック" ] },
	{ title: "リストモデリング", ca: [ "実装" ], cb: [ "アレイ" ] },
	{ title: "UIモデル" },
	{ title: "ぴよこ隊リズムアニメ" },
	{ title: "プロフェット-5 モデリング" },
	{ title: "Notata 音符を伝える" },
	{ title: "地震発生リスト音モニター", ca:[ "地震", "オーディオ" ] },
	{ title: "製造業モデリングViews", ca: [ "工程管理", "資材管理", "業務支援", "業務知識蓄積" ] },
	{ title: "Nonex Excelに代わる万能アプリケーション" },
	{ title: "ツリーメモ" },
];

