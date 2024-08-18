import { Exist, Leaf, ef, root } from "../../../meh/index.js";

/*

App
	注文リスト
		注文
			工程リスト
				工程実績

*/


type 注文_i =
{

};

class 注文 extends Exist
{
	constructor( com : Exist, i : 注文_i )
	{ super( com ) }
};

class 工程リスト extends Exist
{
	constructor
	(
		com : Exist,
	)
	{ super( com ); }
}

class 工程 extends Exist
{
	constructor
	(
		com : Exist,
	)
	{ super( com ) }

	実績 = new 工程実績( this ) ;
};

class 工程実績 extends Exist
{
	合計 = new Leaf.Number( this, 0 );
	入り数 = new Leaf.Number( this, 120 );

	追加()
	{
		this.合計.value += this.入り数.value;
	}

	リセット()
	{
		this.合計.value = 0;
	}
}

namespace vm
{
	export class 号機ビュー extends Exist
	{
		constructor
		(
			com : Exist,
			public name : string ,
		)
		{
			super( com );
		}
	}
}

////

const sampledata =
[
	{
		セット品番: "10-3501",
		品番: "4413",
		注文数: 3511,
		受入数: 3830,
		工程リスト:
		[
			{ 名称: "窓下帯", 色: "朱色" },
			{ 名称: "ナンバーベース", 色: "朱色" },
			{ 名称: "ドア枠", 色: "黒銀" },
			{ 名称: "ナンバー", 色: "ゴールド" },
		]
	},
];

class App extends Exist
{
	constructor( com : Exist )
	{
		super( com );

		this.注文リスト = sampledata.map( i => new 注文( this, i ) );
	}

	注文リスト : 注文 [];
	号機リスト : vm.号機ビュー [] = [ "R7" ].map( name => new vm.号機ビュー( this, name ) )
}



////

export const 号機ビュー = () =>
{
	const app_model = new App( root );
	const model = new 工程実績( root );

	return ef.article
	(
		ef.h1( "号機ビュー" ),
		ef.p( "10-2241 / 42123-A 工程7 表記 クチバ銀" ),
		実績ペイン( model ),
	);
};

const 実績ペイン = ( model : 工程実績 ) =>
{	
	return ef.section
	(
		{ class: "実績" },
		ef.section
		(
			{ class: "bar" },
			ef.span( "実績合計 : " ),
			ef.span( { style: { fontSize: "24px" } }, model.合計 ),
		),
		ef.section
		(
			{ class: "bar" },
			ef.label( "入り数" ),
			ef.input
			(
				{
					props: { value: model.入り数 },
					style: { width: "6em" },
					acts: { change( ev ){ if( ev.target instanceof HTMLInputElement ) model.入り数.value = Number( ev.target.value ) || 0 ; } }
				}
			),
			ef.button
			(
				{ acts: { click() { model.追加() } } },
				"一箱できた"
			),
			ef.button
			(
				{ acts: { click() { model.リセット() } } },
				"ご破算"
			),
		)
	);
};
