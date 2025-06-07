import { leaf , Renn  , dom , place , pl , ef , log } from "../meh/index.js" ;

function new_sel < K > ( value : K )
{
	return leaf < K > ( value ) ;
}

type t_item = { title : string , color : string } ;

export namespace vc
{
	export const App = () =>
	{
		const items : t_item [] =
		[
			{ title : "常磐線" , color : "hsl( 180, 100%, 40% )" } ,
			{ title : "埼京線" , color : "hsl( 170, 100%, 35% )" } ,
			{ title : "京浜東北線" , color : "hsl( 198, 75%, 53% )" } ,
			{ title : "山手線" , color : "hsl( 100, 60%, 70% )" } ,
			{ title : "総武線" , color : "hsl( 50, 70%, 68% )" } ,
			{ title : "中央線" , color : "hsl( 18, 75%, 60% )" } ,
		];
	
		const osel = new_sel < t_item > ( items [ 0 ] );
		const bsel = new_sel < boolean > ( false );
	
		return ef.article
		(
			ef.h1( "ページ切り替えサンプル" ) ,
			
			ef.section
			(
				{ class : "fcol" },

				ef.h2 ( "キー型 : [ Object ]" ) ,

				ef.section
				(
					{ class : "buttons x" } ,
					... items.map ( item => sel_bu ( item.title , osel , item ) )
				),
		
				ef.h3 ( "実装 1" ) ,
				pl.switch ( osel , k =>  k && card( k.title , k.color , k.color ) ) ,

				ef.h3 ( "実装 2" ) ,
				pl.switch ( osel , items.map ( k => [ k , card( k.title, "全駅グルメコンプリート" , k.color ) ] ) ) ,

				ef.h3 ( "実装 3" ) ,
				pl.switch ( osel , k => k && card( k.title , "各駅停車の旅" , k.color ) , items ) ,
	
			) ,

			ef.section
			(
				ef.h2 ( "キー型 : [ Boolean ]" ) ,

				ef.section
				(
					... [ false , true ].map ( k => sel_bu ( k , bsel , k ) )
				),
	
				ef.h3 ( "実装 1" ) ,
				pl.switch
				(
					bsel ,
					[
						[ true, ef.span ( { class : "card" } , "はい" ) ] ,
						[ false, ef.span ( { class : "card" } , "いいえ" ) ] ,
					] ,
				) ,
	
				ef.h3 ( "実装 2" ) ,
				pl.switch
				(
					bsel ,
					k => ef.span ( { class : "card" } , k ? "ごもっとも*" : "知りません" ) ,
				)

			)
		);
	};

	const card = ( title : string , text ? : string , color ? : string ) =>
	(
		ef.section
		(
			{ class : "card" , style : { backgroundColor : color } } ,
			ef.p ( { class : "title" } , title ) ,
			ef.p ( { class : "text" } , text ) 
		)
	);
	
	const sel_bu = < K = any > ( title : any , sel : leaf < any > , key : K ) =>
	{
		return ef.button
		(
			{ action : { click() { sel.value = key ; } } } ,
			String( title )
		);
	};
	
		
}

export const main = () =>
{
	dom.add ( vc.App () , "body" ) ;

	const r = new Renn ( [ "Eins" , "Zwei" , "Drei" , ] ) ;

	dom.add
	(
		ef.article
		(
			ef.h1 ( "DOM DOM Bourge" ) ,
			pl.each
			(
				r,
				p => ef.p ( p.count , " - " , p.target )
			)
		),
		"body"
	)
};
