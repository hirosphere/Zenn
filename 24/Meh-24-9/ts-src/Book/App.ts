import { navi , ef , pl , dom , log } from "../meh/index.js" ;

namespace VM
{
	const book_def_2 : navi.t.index =
	{
		name : "" , title : "Meh Root" ,
		parts :
		[
			{ name : "1" , title : "Item 1" } ,
			{ name : "2" , title : "Item 2" } ,
			{ name : "3" , title : "Item 3" } ,
			{ name : "4" , title : "Item 4" } ,
		]
	} ;

	const make_part_tree = ( com_name : string = "" , level : number = 0 ) =>
	{
		const rt : navi.t.index [] = [] ;

		for ( let i = 1 ; i <= 10 ; i ++ )
		{
			const name = com_name + i ;
			rt.push ( { name , title : `Item ${ name }` } ) ;
		}

		return rt ;
	}

	const book_def : navi.t.index =
	{
		name : "" , title : "Meh Root" ,
		parts : make_part_tree () ,
	} ;

	const navi_def : navi =
	{
		title : "Book" ,
		create_root_index : ( app ) => new navi.Index ( app , null , book_def ) ,
		index_to_url ( index )
		{
			return `?PAGE=${ index.url_path .splice ( 1 ) .join ( "/" ) }` ;
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
			pl.switch
			(
				vm.navi.current_index ,
				index => ef.main
				(
					{ class : "APP_CONTENT" } ,
					ef.h1 ( index?.title ?? "*** ?" )
				) ,
			) ,
			ef.nav
			(
				{ class : "APP_NAVI" } ,
				ef.ul
				(
					pl.each
					(
						vm.navi.root.parts ,
						o => ef.li ( PageLink ( o.target ) )
					) ,
				) ,
				ef.hr () ,
				ef.ul
				(
					PageLink ( vm.navi.root ) ,
				) ,
			) ,
		) ;
	}

	const PageLink = ( index : navi.Index ) =>
	{
		return navi.link
		(
			{
				index ,
				class : [ "NAVI_LINK" , { SELECTED : index.sel_item } ] ,
			}
		) ;
	}
}

export const main = () =>
{
	dom.add ( VC.App () , document.documentElement ) ;
}
