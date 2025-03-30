import { navi , ef , pl , dom , log } from "../meh/index.js" ;

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
		parts : make_part_tree ( 3 ) ,
	} ;

	const navi_def : navi =
	{
		title : "Book" ,
		create_root_index : ( app ) => new navi.Index ( app , undefined , book_def ) ,
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
				pl.switch
				(
					vm.navi.current_index ,
					index => LinkList ( index , "APP_NAVI_PARTS" )
				) ,
				pl.switch
				(
					vm.navi.current_index ,
					index => LinkList ( index ?.com , "APP_NAVI_ISOS" )
				) ,
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
		) ;
	}

	const LinkList = ( index : navi.Index | undefined , classname : string ) =>
	{
		return ef.ul
		(
			{ class : classname } ,
			index && pl.each
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
}

export const main = () =>
{
	dom.add ( VC.App () , document.documentElement ) ;
}
