import { leaf , Renn  , dom , place , pl , ef , log } from "../meh/index.js" ;

function new_sel < K > ( value : K )
{
	return leaf < K | undefined > ( value ) ;
}

type t_item = { title : string } ;

export namespace vc
{
	export const App = () =>
	{
		const items : t_item [] =
		[
			{ title : "埼京線" } ,
			{ title : "中央線" } ,
			{ title : "総武線" } ,
			{ title : "山手線" } ,
			{ title : "京浜東北線" } ,
			{ title : "常磐線" } ,
		];
	
		const osel = new_sel < t_item > ( items [ 0 ] );
		const bsel = new_sel < boolean > ( false );
	
		return ef.article
		(
			ef.h1( "ページ切り替えサンプル" ) ,
			
			ef.section
			(
				{ class : "fcol" },

				ef.h1 ( "キー型 : [ Object ]" ) ,

				ef.section
				(
					{ class : "buttons x" } ,
					... items.map ( item => sel_bu ( item.title , osel , item ) )
				),
		
				ef.h2 ( "実装 1" ) ,
				pl.switch ( osel , k => ef.div ( { class : "card" } , k.title ) ) ,

				ef.h2 ( "実装 2" ) ,
				pl.switch ( osel , items.map ( k => [ k , ef.div ( { class : "card" } , k?.title ) ] ) ) ,

				ef.h2 ( "実装 3" ) ,
				pl.switch ( osel , k => ef.div ( { class : "card" } , k?.title ) , items ) ,
	
			) ,

			ef.section
			(
				ef.h1 ( "キー型 : [ Boolean ]" ) ,

				ef.section
				(
					... [ false , true ].map ( k => sel_bu ( k , bsel , k ) )
				),
	
				ef.h2 ( "実装 1" ) ,
				pl.switch < boolean >
				(
					bsel ,
					[
						[ true, ef.span ( { class : "card" } , "はい" ) ] ,
						[ false, ef.span ( { class : "card" } , "いいえ" ) ] ,
					] ,
					[ false ]
				) ,
	
				ef.h2 ( "実装 2" ) ,
				pl.switch
				(
					bsel ,
					k => ef.span ( { class : "card" } , k ? "ごもっとも" : "知りません" ) ,
					[ false , true ]
				)

			)
		);
	};
	
	const sel_bu = < K = any > ( title : any , sel : leaf.types < any > , key : K ) =>
	{
		return ef.button
		(
			{ acts : { click() { sel.value = key ; } } } ,
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
				p => ef.p ( p.count , " - " , p.src )
			)
		),
		"body"
	)
};
