import { leaf , navi , ef , sw , forms , dom , log } from "../meh/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace DM
{
	export class App
	{
		public exp = leaf ( 0 ) ;
	}
}

namespace VM
{
	export class App
	{
		navi = navi ( navi_def ) ;

		constructor ( public readonly dm = new DM.App )
		{
			this.navi.set_current ( this.navi.root ) ;
		}
	}

	const navi_def : navi =
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
			]
			.map ( name => ( { name , title : name } ) ) ,
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
				vm.navi.currentIndex ,
				index => index && station ( index )
			) ,
			ef.article
			(
				ef.h2 ( "Station-1" ) ,
				page_list ( vm ) ,
			),
			ClockA () ,
		) ;	
	}

	const top_page = ( vm : VM.App ) =>
	{

	}

	const station = ( index : navi.Index ) =>
	{
		const [ shrink , gap ] = calc_spc( index.title.value.length ) ;

		log ( shrink , gap )

		return ef.section
		(
			{ class : "station" } ,
			ef.section
			(
				{ class : "_main" , style : { gap , transform : shrink } } ,
				index.title ,
			) ,
		) ;
	}

	const calc_spc = ( len : number ) =>
	{
		const space = [ 0 , 0 , 1.1 , 0.5 , 0.1 , 0.06 , -0.04 ] [ len ] ?? 0 ;
		const shrink = ( len > 7 ? 7 / len : 1 ) ;
		
		return [ `scale(${ shrink },1)` , space + "em" , - space + "em" ] ;
	}
		
	const page_list = ( m : VM.App ) =>
	{
		return ef.ul ( { class : "fl-row" } ,

			dom.each ( m.navi.root.parts , o => navi_link ( o.target ) )
		) ;
	}

	const navi_link = ( index : navi.Index ) =>
	{
		const sel = index.make_selector () ;
		return ef.li ( { class : { selected : sel.selected } } , navi.link( sel ) ) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , "body" ) ;
}
