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
				{ class : "buttons x" } ,
				... items.map ( item => sel_bu ( osel , item ) )
			),
	
			ef.section
			(
				{ class : "fcol" },

				ef.h1 ( "Object Keys 1" ) ,
				pl.switch ( osel , k => ef.div ( { class : "card" } , k.title ) ) ,

				ef.h1 ( "Object Keys 2" ) ,
				pl.switch ( osel , items.map ( k => [ k , ef.div ( { class : "card" } , k?.title ) ] ) ) ,

				ef.h1 ( "Object Keys 3" ) ,
				pl.switch ( osel , k => ef.div ( { class : "card" } , k?.title ) , items ) ,
	
				ef.h1 ( "Boolean keys 1" ) ,
				pl.switch < boolean >
				(
					bsel ,
					[
						[ true, ef.span ( "はい" ) ] ,
						[ false, ef.span ( "いいえ" ) ] ,
					] ,
					[ false ]
				) ,
	
				ef.h1 ( "Boolean Keys 2" ) ,
				pl.switch
				(
					bsel ,
					k => ef.span ( k ? "はい" : "いいえ" ) ,
					[ false , true ]
				)
			)
		);
	};
	
	const sel_bu = ( sel : leaf.types < t_item | undefined > , item : t_item ) =>
	{
		return ef.button
		(
			{ acts : { click() { sel.value = item ; } } } ,
			item ? item.title : "解除"
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
