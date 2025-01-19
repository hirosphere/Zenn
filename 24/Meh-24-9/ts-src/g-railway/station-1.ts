import { leaf , spa , ef , sw , forms , dom , log } from "../meh/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace DM
{
	export class App
	{
	}
}

namespace VM
{
	export class App
	{
		navi = spa ( navi_def ) ;

		constructor ( public readonly dm = new DM.App )
		{
			this.navi.set_current ( this.navi.root ) ;
		}
	}

	const navi_def : spa =
	{
		title : "Station-1" ,
		make_url_path ( index )
		{
			return `?p=${ index.name.value }` ;
		},
		root :
		{
			name : "" ,
			title : "駅名表示" ,
			parts :
			[
				"国分寺" , "三鷹" , "吉祥寺" , "荻窪" , "中野" , "新宿" , "四ツ谷" , "御茶ノ水" ,  "神田" , "東京" ,
				"東葉勝田台" , "葛西臨海公園" , "高輪ゲートウェイ" , "津" ,
				"空港第２ビル" , "見沼代親水公園" , "八千代緑が丘" , "千葉ニュータウン中央" , "羽田空港第1・第2ターミナル" ,
				"富山トヨペット本社前（五福末広町)"
			]
			.map ( name => ( { type : "station" , name , title : name } ) ) ,
		} ,
	}	
}

namespace VC
{
	export const App = () =>
	{
		const vm = new VM.App ;

		return ef.main
		(
			sw
			(
				vm.navi.current_index ,
				index => index && content ( index )
			) ,
			ef.article
			(
				ef.h2 ( "Station-1" ) ,
				page_list ( vm ) ,
			),
			ClockA () ,
		) ;	
	}

	const content = ( index : spa.Index ) =>
	{
		if ( index.type == "station" )  return station ( index ) ;
		return top_page ( index ) ;
	}

	const top_page = ( index : spa.Index ) =>
	{
		return ef.article
		(
			ef.h1 ( index.title ) ,
		)
	}

	const station = ( index : spa.Index ) =>
	{
		const { shrink , gap, letters } = calc_spc( index.title.value ) ;

		log ( index.title.value , shrink , gap )

		return ef.section
		(
			{ class : "station" } ,
			ef.section
			(
				{ class : "_main" , style : { gap , transform : shrink } } ,
				... letters.map ( l => ef.span ( l ) ) ,
			) ,
		) ;
	}

	const calc_spc = ( s : string ) =>
	{
		const len = s.length ;

		const letters = Array.from ( s );
		const gap = ( [ 0 , 0 , 1.2 , 0.45 , 0.08 , 0.04 ] [ len ] ?? 0 ) + "em" ;
		const shrink = `scale( ${  len >= 7  ? 7 / len : 1  } , 1 )` ;
		
		return { gap , shrink , letters } ;
	}
		
	const page_list = ( m : VM.App ) =>
	{
		return ef.ul
		(
			{ class : "fl-row" } ,
			dom.each ( m.navi.root.parts , o => navi_link ( o.target ) )
		) ;
	}

	const navi_link = ( index : spa.Index ) =>
	{
		return ef.li ( { class : { selected : index.selector_item } } , spa.link( index ) ) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , "body" ) ;
}
