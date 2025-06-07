import { leaf , navi , ef , pl , dom , log } from "../../meh/index.js" ;

import { Clock } from "./Clock.js" ;
import { PartList } from "./PartList.js" ;


import { EvalPage } from "../AG0/EvalPage.js" ;
import { Links } from "../AG0/Links.js" ;
import * as AG1 from "../AG1/AG1_Index.js" ;
import * as AG2 from "../AG2/AG2_Index.js" ;

export const global =
{
	res_root : "" ,
	quest : () => log ( "" ),
	css : 
/* css */ `
.Fv
{
	display : flex ;
	flex-direction : vertical ;
	background-color : oklch( 100%  0%  ${ 0 } ) ;
}

.Fh
{
	display : flex ;
	flex-direction : horizontal ;
}
`
}

namespace VM
{
	const make_part_tree = ( level : number , com_title : string = "" , ) =>
	{
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

	const create_book_def = () : navi.types.index =>
	(
		{
			name : "" , title : "Meh Root" ,
			parts :
			[
				{ type : "eval" , name : "Eval" , title : "Eval" } ,
				{ type : "LINKS" , name : "Links" ,  } ,
				AG1.index_def ,
				AG2.index_def ,
				{ name : "Tree" , title : "ツリーテスト" , parts : make_part_tree ( 3 ) } ,
			] ,
		}
	) ;

	const navi_def : navi =
	{
		title : "Book" ,
		create_root_index : ( app ) => new navi.Index ( app , undefined , create_book_def () ) ,
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
			log ( "VM.App" )
			// log ( AG1.index_def .name ) ;

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
				{ class : "APP_NAVI_PATH  BSS" } ,
				ef.ul
				(
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
			Clock () ,
			ef.nav
			(
				{ class : "APP_NAVI_ISOS FH WRAP" , style : { columnGap : "1em" } } ,
				NaviListSw ( vm.navi.current_com_index , "BSS" ) ,
			) ,
		) ;
	}

	// navi 

	const NaviListSw = ( key : leaf.r < navi.types.index_key > , class_name : string ) =>
	{
		return pl.switch
		(
			key ,
			index => index  &&  PartList ( index , class_name )  ||  ef.p ( "???" )
		) ;
	}

	const PartList_ = ( index : navi.Index , classname : string ) =>
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
	}

	const Content = ( index : navi.Index | undefined ) =>
	{
		if ( ! index )  return  undefined ;

		const c = content_classes [ index.type ] ;

		return index.page
			|| c && c ( index )
			||
			(
				ef.main
				(
					{ class : "FV AC PXX BS" } ,
					ef.h1 ( index.title ) ,
					PartList ( index , "APP_NAVI_PARTS  BSS" ) ,
				)
			) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , document.documentElement ) ;
}
