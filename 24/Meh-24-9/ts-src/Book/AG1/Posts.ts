import { leaf , Renn , ef , pl , defs , dom , log } from "../../meh/index.js" ;

namespace VM
{
	;

	[
		"TreeType キーボードでツリー構造・値編集" ,
		"Jectia 任意のデータタイプとモデル・ビュー分離なExcel"
	] ;

	[
		"キハ35 6両" ,
		"メトロ10000系 6両" ,
		"80系 7両" ,
		"E231系 山手線 7両" ,
		"メトロ16000系 6両" ,
		"国鉄101系 中央線 6両" ,
		"国鉄485系 8両 , 2両" ,

		"飯田線 2両" ,
		"E233系 京浜東北線 6両" ,
		"国鉄103系 総武線 6両" ,
		"国鉄101系 総武線 10両" ,

		"E231系 湘南新宿ライン 10両" ,

		"国鉄115系 湘南色 11両" ,
		"国鉄165系 12両" ,

		"国鉄583系 13両" ,

		"国鉄415系 8両" ,
		"国鉄455系 7両" ,

		"キハ58 ときわ 6両" ,

		"国鉄14系 さくら 7両" ,
		"国鉄20系 11両" ,
		"国鉄旧客 21両" ,

		"東急5050系4000番台 6両" ,
		"営団地下鉄6000系 10両" ,

		"東武50070系 10両" ,
		"東武8000系 4+2+4両" ,

		"クモハユニ64 2両" ,
		"クモユニ74 2両"
	]
}

namespace DM
{
	export class PostApp
	{
		trees = new Renn < PostTree > ;

		constructor ()
		{}

		async load ( perm_id : string ) : Promise < void >
		{
			const i : post_tree =
			{
				title : "ツリーポスト" ,
				root :
				{
					title : "ルートにござる" ,
					text : ""
				}
			}

			const tree = new PostTree ( i ) ;
			this.trees.new ( [ tree ] ) ;
		}
	}

	export class PostTree
	{
		title = leaf ( "" ) ;
		root : PostItem ;

		constructor ( i : post_tree )
		{
			this.value = i ;
			this.root = new PostItem ( i.root )
		}

		set value ( v : post_tree )
		{
			this.title.$ = v.title ;
		}
	}

	export class PostItem
	{
		title ;
		text ;

		constructor ( i : post_item )
		{
			this.title = leaf ( i.title ) ;
			this.text = leaf ( i.text ) ;
		}
	}

	type post_tree =
	{
		title : string ;
		root : post_item ;
	}

	type post_item =
	{
		title : string ;
		text : string ;
		parts ? : post_item [] ;
	}
}

namespace VM
{
	export class App
	{
		doc = new DM.PostApp ;

		constructor ()
		{
			this.doc.load ( "1" ) ;
		}
	}
}

namespace VC
{
	const css =

/* css */ `


* { box-sizing : border-box ; }

h1 , h2 , h3 { margin : 0 ; text-align : center ; }

h1 { background :  oklch( 0%  0%  0 / 14% ); }

.TREES
{
	display : flex ;
	justify-content : center ;
	flex-wrap : wrap ;
	gap : 1.36em ;
}

.TREE
{
	flex-grow : 1 ;

	border-radius : 0.8em ;
	background-color : oklch( 100%  0%  0 / 40% ) ;

	width : 400px ;
	min-height : 350px ;

	padding : 1em 1.4em ;
}

.TITLE
{
	border : none ;
	background : none ;
	text-align : center ;
	font-size : 2rem ;
}

.TITLE:focus
{
	background : white ;
}


` /*css*/ ;

	export const Applet = () : dom.MehElement =>
	{
		const vm = new VM.App ;

		return ef.main
		(
			{
				class : "FV PXX " ,
				shadow : { css }
			} ,
			// ef.h1 ( "Posts" ) ,
			ef.section
			(
				{ class : "TREES" } ,
				pl.each
				(
					vm.doc.trees ,
					o => Tree ( o.target ) ,
				)
			) ,
		);
	}

	const Tree = ( dm : DM.PostTree ) =>
	{
		return ef.article
		(
			{ class : "TREE" } ,
			ef.h2 ( ef.input ( { class : "TITLE" , binds : { value_input : dm.title } } ) ) ,
			ef.section
			(
				{  } ,
				Item ( dm.root ) ,
			) ,
		) ;
	}

	const Item = ( dm : DM.PostItem ) : dom.MehElement =>
	{
		return ef.section
		(
			ef.span
			(
				{} ,
				dm.title ,
			) ,
		) ;
	}
}

export const Posts = VC.Applet ;
