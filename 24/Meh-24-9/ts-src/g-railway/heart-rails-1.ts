import { leaf , ksel , navi , ef , each , sw , dom , log } from "../meh/index.js" ;
import { vm } from "../q1/q-hsl.js";
import { ClockA } from "../widjet/widjet.js" ;



/* View Models */

namespace VM
{
	const navi_def : navi =
	{
		title : "Heart Rails - 1" ,
		root : ( app ) => new HeartRails.RootIndex ( app ) ,

		make_url_from_index ( index )
		{
			return `?page=${ index.url_path .splice ( 1 ) .join ( "/" ) }` ;	
		},

		make_path_from_url ( { root , params } )
		{
			const page_path = params.get ( "page" ) ?.split ( "/" ) ?? [] ;
			log ( "page_path" , page_path ) ;
			return page_path ;
		},

		containers :
		{
			index : ( current ) => ef.div ( sw ( current , index => VC.Root ( index ) ) ) ,
		}
	}

	export class App
	{
		public readonly navi = new navi.Application ( navi_def ) ;
		public readonly station_cs = new Map < HeartRails.LineIndex , ksel < HeartRails.StationIndex > > ;

		constructor ()
		{
			this.navi.init () ;
		}
	}

	type space_shrink =
	{
		letterSpacing : string ;
		transform : string ;
		marginRight : string ;
	}

	export const calc_space_shrink = ( letter : string ) : space_shrink =>
	{
		const max = 6.5 ;
		const len = letter.length ;

		const [ space , shrink ] =
		{
			1 : [ 0 , 1.15 ] ,
			2 : [ 0.75 , 1.05 ] ,
			3 : [ 0.185 , 1.03 ] ,
			4 : [ 0.06 , 1.02 ] ,
			5 : [ 0.04 , 0.96 ],
			6 : [ 0.00 , 0.93 ]
		}
		[ len ]
		?? [ 0.0 , Math.min ( 1 , max / ( len || 1 ) ) ];

		return null ||
		{
			letterSpacing : space + "em" ,
			transform : `scale( ${ shrink } , 1 )` ,
			marginRight : - space + "em"
		} ;
	}
}

namespace HeartRails
{
	//   areas      https://express.heartrails.com/api/json?method=getAreas
	//   prefs      https://express.heartrails.com/api/json?method=getPrefectures&area=関東
	//   lines      https://express.heartrails.com/api/json?method=getLines&prefecture=埼玉県
	//   stations   https://express.heartrails.com/api/json?method=getStations&line=東武伊勢崎線

	abstract class RailIndex < res_t > extends navi.Index
	{
		public fetch_query : string = "" ;
		protected part_fetched = false ;

		public override async fetch_parts ()
		{
			if ( this.part_fetched )  return ;
			this.part_fetched = true ;

			const url = "https://express.heartrails.com/api/json?" + this.fetch_query ;
			const res = await fetch ( url ) ;
			if ( res.ok )
			{
				this.parts.new
				(
					this.create_parts ( await res.json () as res_t )
				);
			}
		}

		protected abstract create_parts ( data : res_t ) : navi.Index [] ;
	}

	export abstract class ListIndex < res_t > extends RailIndex < res_t > {}

	export class RootIndex extends ListIndex < res_types.areas >
	{
		constructor ( nav : navi.Application )
		{
			super ( nav , null , { type : "index" , name : "" , title : "Heart Rails" } ) ;
			this.fetch_query = "method=getAreas" ;
		}

		create_parts ( data : res_types.areas )
		{
			return data.response.area.map ( area => new AreaIndex ( this.app , this , area ) );
		}
	}

	export class AreaIndex extends ListIndex < res_types.prefs >
	{
		override fetch_query : string ;

		constructor ( nav : navi.Application , com : navi.Index , name : string )
		{
			super ( nav , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getPrefectures&area=${ name }` ;
		}

		create_parts ( data : res_types.prefs )
		{
			return data.response.prefecture.map ( pref => new PrefIndex ( this.app , this , pref ) )
		}
	}

	export class PrefIndex extends ListIndex < res_types.lines >
	{
		constructor ( nav : navi.Application , com : navi.Index , name : string )
		{
			super ( nav , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getLines&prefecture=${ name }` ;
		}

		create_parts ( data : res_types.lines )
		{
			return data.response.line.map ( line => new LineIndex ( this.app , this , line ) )
		}
	}

	export class LineIndex extends ListIndex < res_types.stations >
	{
		constructor ( app : navi.Application , com : navi.Index , name : string )
		{
			super ( app , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getStations&line=${ name }` ;
		}

		create_parts ( data : res_types.stations )
		{
			return data.response.station.map ( station => new StationIndex ( this.app , this , station ) )
		}
	}

	export class StationIndex extends navi.Index
	{
		constructor ( app : navi.Application , com : navi.Index , public readonly i : station )
		{
			super ( app , com , { name : i.name , title : i.name } ) ;
		}
	}

	/* */

	type station =
	{
		name : string ;
		x : number ;
		y : number ;
		postal : string ;
		next : string | null ;
		prev : string | null ;
	}

	namespace res_types
	{
		export type areas = { response : { area : string [] } } ;
		export type prefs = { response : { prefecture : string [] } } ;
		export type lines = { response : { line : string [] } } ;
		export type stations = { response : { station : station [] } } ;
	}
}


/* View Components */

namespace VC
{
	export const App = ( vm : VM.App = new VM.App ) =>
	{
		return ef.div
		(
			ef.div
			(
				{ class : "APP" } ,
				sw ( vm.navi.current_index , index => Root ( index ) )
			) ,
			ClockA () ,
		)
	}

	export const Root = ( index ? : navi.Index ) =>
	{
		if ( index instanceof HeartRails.ListIndex )  return ListPage ( index ) ;
		if ( index instanceof HeartRails.StationIndex )  return StationPage ( index ) ;

		return ef.article
		(
			ef.h1 ( index ?.title , " - " , index ?.app.title )
		);
	}

	const ListPage = ( index : HeartRails.ListIndex < any > ) =>
	{
		index.fetch_parts () ;

		return ef.article
		(
			PathNavi ( index ) ,
			ef.h1
			(
				ef.span ( navi.link ( index , index.title ) ) ,
			) ,
			ItemNavi ( index ) ,
		)
	}

	
	const StationPage = ( index : HeartRails.StationIndex ) =>
	{
		const com = index.com ;
		const i = index.i ;

		const next = com?.part ( i.next ?? "" ) ;
		const prev = com?.part ( i.prev ?? "" ) ;
		
		const ss = VM.calc_space_shrink ( index.title.value ) ;
		const postal = i.postal.slice ( 0 , 3 ) + "-" + i.postal.slice ( 3 , 7 ) ;

		return ef.article
		(
			{ class : "STATION" } ,

			PathNavi ( index ) ,
			
			ef.section
			(
				{ class : "_MAIN" , style : ss } ,
				index.name
			) ,

			// ef.h2 ( com?.title ) ,

			ef.section
			(
				{ class : "_INFO" } ,
				ef.span ( prev && navi.link ( prev ) || "--" ) , " | " ,
				ef.span ( next && navi.link ( next ) || "--" )
			) ,

			ef.section
			(
				{ class : "_INFO" } ,
				ef.span ( "北緯" , index.i.y , "度" ) ,
				ef.span ( "東経" , index.i.x , "度" ) ,
				ef.span ( "〒" , postal ) ,
			) ,

			com && ItemNavi ( com ) || undefined ,
		)
	}

	const PathNavi = ( index : navi.Index ) =>
	{
		if ( ! index.com ) return ;

		return ef.nav
		(
			{ class : "PATH_NAVI" } ,
			ef.ul
			(
				each ( index.com.path , o => ef.li ( navi.link ( o.target ) ) )
			) ,
		) ;
	}

	const ItemNavi = ( index : navi.Index ) =>
	(
		ef.ul
		(
			{ class : "ITEM_LIST" } ,
			each
			(
				index.parts ,
				o => ef.li ( { class : { selected : o.target.sel_item } } , navi.link ( o.target ) )
			)
		)
	) ;
}

export const main = () =>
{
	dom.add ( VC.App () , "body" ) ;
}
