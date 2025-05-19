import { leaf , navi , ef , pl , dom , log } from "../meh/index.js" ;
import { EvalPage } from "./EvalPage.js" ;
import { Clock } from "./AG0/Clock.js" ;
import { Links } from "./AG0/Links.js" ;
import * as AG1 from "./AG1/index.js" ;

namespace VM
{
	const make_part_tree = ( level : number , com_title : string = "" , ) =>
	{
		// log ( com_title ) ;

		const rt : navi.types.index [] = [] ;
		if ( level <= 0 ) return rt ;

		for ( let i = 1 ; i <= 10 ; i ++ )
		{
			const title = com_title + i ;
			rt.push
			(
				{
					name : i.toString () ,
					title : `Item ${ title }` ,
					parts : make_part_tree ( level - 1 , title + "-" )
				}
			) ;
		}

		return rt ;
	}

	const book_def : navi.types.index =
	{
		name : "" , title : "Meh Root" ,
		parts :
		[
			{ type : "LINKS" , name : "Links" ,  } ,
			{ type : "eval" , name : "Eval" , title : "Eval" } ,
			{ type : "clock" , name : "Clock" } ,
			{ name : "Labo" , parts :
				[
					{ name : "Tree" , title : "ツリーテスト" , parts : make_part_tree ( 3 ) } ,
				]
			} ,
			{ name : "AG1" , type : "AG1" ,
				parts :
				[
					{ type : "AG1.Posts" , name : "Posts" } ,
					{ name : "OKLCH" , type : "uig-oklch" } ,
					{ name : "Rectia" , type : "Rectia" } ,
					{ name : "UUID_Clock" , type : "UUID_CLOCK" } ,
					{ name : "EQ_List" , type : "EQ_LIST" } ,
					{ name : "物流" , title : "物流進捗管理" , parts :
						[
							{ name : "全体進捗" } ,
							{ name : "グループ進捗" } ,
							{ name : "製品情報" } ,
							{ name : "店舗情報" } ,
						]
					} ,
					{ name : "製造進捗管理" , parts :
						[
							{ name : "進捗" } ,
							{ name : "実績記録" } ,
							{ name : "プロジェクト情報" } ,
							{ name : "工程情報" } ,
						]
					}
				]
			} ,
			{ type : "rail" , name : "Rail" , title : "列車運転" } ,
			{ type : "HR" , name : "HR" , title : "HR" } ,
		] ,
	} ;

	const navi_def : navi =
	{
		title : "Book" ,
		create_root_index : ( app ) => new navi.Index ( app , undefined , book_def ) ,
		index_to_url ( index )
		{
			return `?PAGE=${ index.url_path .splice ( 1 ) .join ( "/" ) }` ;
		},

		url_to_path_array ( { root , params } )
		{
			const page_path = params.get ( "PAGE" ) ?.split ( "/" ) ?? [] ;
			log ( "PAGE" , page_path ) ;
			return page_path ;
		},
	}

	export class App
	{
		navi ;

		constructor ()
		{
			this.navi = navi ( navi_def ) ;
			this.navi.init () ;
		}
	}
}

namespace VC
{
	export const App = () =>
	{
		const vm = new VM.App ;
	
		return ef.div
		(
			{ class : "APP" } ,
			ef.nav
			(
				{ class : "APP_NAVI  BSS" } ,
				ef.ul
				(
					{ class : "APP_NAVI_PATH" } ,
					pl.each
					(
						vm.navi.path ,
						o => ef.li ( PageLink ( o.target ) ) ,
					) ,
				) ,
			) ,
			pl.switch
			(
				vm.navi.current_index ,
				index => Content ( index ) ,
			) ,
			ef.nav
			(
				{ class : "APP_NAVI" } ,
				ListSwitch ( vm.navi.current_com_index , "APP_NAVI_ISOS  BSS" ) ,
				// ListSwitch ( vm.navi.current_index , "APP_NAVI_PARTS" ) ,
			) ,
		) ;
	}

	// navi 

	const ListSwitch = ( key : leaf.r < navi.types.index_key > , class_name : string ) =>
	{
		return pl.switch
		(
			key ,
			index => index  &&  PartList ( index , class_name )  ||  ef.p ( "???" )
		) ;
	}

	const PartList = ( index : navi.Index , classname : string ) =>
	{
		return ef.ul
		(
			{ class : classname } ,
			pl.each
			(
				index.parts ,
				o => ef.li ( PageLink ( o.target ) ) ,
			)
		) ;
	}

	const PageLink = ( index : navi.Index ) =>
	{
		const link = navi.link
		(
			{
				index ,
				class : [ "APP_NAVI_LINK" , { SELECTED : index.sel_item } ] ,
			}
		) ;

		return link ;
	}

	// content

	const content_classes : { [ name : string ] : ( index : navi.Index ) => dom.defs.element } =
	{
		"LINKS" : Links ,
		"eval" : EvalPage ,
		"clock" : Clock ,

		"AG1" : AG1.Index ,
		"AG1.Posts" : AG1.Posts ,
		"uig-oklch" : AG1.OKLCH ,
		"EQ_LIST" : AG1.EQListApp ,
		"UUID_CLOCK" : AG1.UUID_Clock ,
		"Rectia" : AG1.Rectia ,
	}

	const Content = ( index : navi.Index | undefined ) =>
	{
		if ( ! index )  return  undefined ;

		const c = content_classes [ index.type ] ;

		return c && c ( index ) ||
		(
			ef.main
			(
				{ class : "FV AC PXX BS" } ,
				ef.h1 ( index.title ) ,
				PartList ( index , "APP_NAVI_PARTS  BS" ) ,
			)
		) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , document.documentElement ) ;
}
