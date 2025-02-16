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
			index : ( current ) => ef.div ( sw ( current , index => VC.root ( index ) ) ) ,
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
		// return { letterSpacing : "" , marginRight : "" , transform : "" } ;

		const max = 6.5 ;
		const len = letter.length ;

		const [ space , shrink ] =
		{
			1 : [ 0 , 1.15 ] ,
			2 : [ 0.75 , 1.05 ] ,
			3 : [ 0.19 , 1.03 ] ,
			4 : [ 0.06 , 1.02 ] ,
			5 : [ 0.04 , 0.96 ],
			6 : [ 0.03 , 0.91 ]
		}
		[ len ]
		?? [ 0 , Math.min ( 1 , max / ( len || 1 ) ) ];

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
		constructor ( app : navi.Application , com : navi.Index , i : station )
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
			ef.div ( sw ( vm.navi.current_index , index => root ( index ) ) ) ,
			ClockA () ,
		)
	}

	export const root = ( index ? : navi.Index ) =>
	{
		if ( index instanceof HeartRails.ListIndex )  return list_page ( index ) ;
		if ( index instanceof HeartRails.StationIndex )  return station ( index ) ;

		return ef.article
		(
			ef.h1 ( index ?.title , " - " , index ?.app.title )
		);
	}

	export const station_container = ( index : navi.Index ) =>
	{
		return ef.article
		(

		) ;
	}

	const list_page = ( index : HeartRails.ListIndex < any > ) =>
	{
		index.fetch_parts () ;

		const com_link =
		(
			index.com && [ navi.link ( index.com , index.com ?.title ) , ">" ] || [ "" ]
		) ;

		return ef.article
		(
			ef.h1
			(
				ef.span ( ... com_link ),
				ef.span ( navi.link ( index , index.title ) ) ,
			) ,
			list ( index ) ,
			ef.p ( "list_page" )
		)
	}

	
	const station = ( index : HeartRails.StationIndex ) =>
	{
		const com = index.com ;
		
		const ss = VM.calc_space_shrink ( index.title.value ) ;

		return ef.article
		(
			{ class : "station" } ,

			ef.h2
			(
				com && navi.link ( com ) || undefined
			) ,
			
			ef.section
			(
				{ class : "_main" , style : ss } ,
				index.name
			) ,

			com && list ( com ) || undefined ,
		)
	}

	const com_link = ( index : navi.Index ) =>
	{
		const com = index.com ;

		return com && ef.h2
		(
			navi.link ( com , index.title )
		)
		|| undefined ;
	}

	const list = ( index : navi.Index ) =>
	(
		ef.ul
		(
			{ class : "part-list fl-row" } ,
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
