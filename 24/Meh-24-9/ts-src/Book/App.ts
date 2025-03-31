import { leaf , navi , ef , pl , dom , log } from "../meh/index.js" ;
import { EvalPage } from "./EvalPage.js" ;

namespace VM
{
	const make_part_tree = ( level : number , com_title : string = "" , ) =>
	{
		// log ( com_title ) ;

		const rt : navi.t.index [] = [] ;
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

	const book_def : navi.t.index =
	{
		name : "" , title : "Meh Root" ,
		parts :
		[
			{ type : "links" , name : "Links" ,  } ,
			{ type : "eval" , name : "Eval" , title : "Eval" } ,
			{ type : "ui-g" , name : "UI" , title : "UI ギャラリー" ,
				parts :
				[
					{ name : "Slide" } ,
					{ name : "HSL" } ,
					{ name : "OKLCH" } ,
					{ name : "Tabs" } ,
				]
			} ,
			{ type : "rail" , name : "Rail" , title : "列車運転" } ,
			{ name : "Tree" , title : "ツリーテスト" , parts : make_part_tree ( 3 ) } ,
			{ type : "h-rails" , name : "H-Rail" , title : "Heart Rails",
				parts :
				[
					{ name : "北海道・東北" , title : "北海道・東北" } ,
					{ name : "関東" , title : "関東" } ,
					{ name : "東海" , title : "東海" } ,
				]
			} ,
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
				{ class : "APP_NAVI" } ,
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
				ListSwitch ( vm.navi.current_com_index , "APP_NAVI_ISOS" ) ,
				// ListSwitch ( vm.navi.current_index , "APP_NAVI_PARTS" ) ,
			) ,
		) ;
	}

	// navi 

	const ListSwitch = ( key : leaf.r < navi.t.index_key > , class_name : string ) =>
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
		"eval" : EvalPage ,
	}

	const Content = ( index : navi.Index | undefined ) =>
	{
		if ( ! index )  return  undefined ;

		const c = content_classes [ index.type ] ;

		return c && c ( index ) ||
		(
			ef.main
			(
				{ class : "APP_CONTENT" } ,
				ef.h1 ( index.title ) ,
				ef.p ( index.path.map ( i => i.name.value ) .join ( "/" ) ),
				PartList ( index , "APP_NAVI_PARTS" ) ,
			)
		) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , document.documentElement ) ;
}
