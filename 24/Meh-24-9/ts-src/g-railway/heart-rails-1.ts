import { leaf , spa as SPA , ef , each , sw , dom , log } from "../meh/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace VM
{
	const app_def : SPA =
	{
		title : "Heart Rails - 1" ,
		root : ( navi ) => new Root ( navi ) ,
		make_url_path ( index )
		{
			return `?p=${ encodeURIComponent( index.name.value ) }` ;	
		},

		containers :
		{
			index : ( current ) => ef.div ( sw ( current , index => VC.index_page ( index ) ) ) ,
		}
	}

	export class App extends SPA.Application
	{
		constructor ()
		{
			super ( app_def ) ;
			this.set_current ( this.root ) ;
		}
	}

	//   areas      https://express.heartrails.com/api/json?method=getAreas
	//   prefs      https://express.heartrails.com/api/json?method=getPrefectures&area=関東
	//   lines      https://express.heartrails.com/api/json?method=getLines&prefecture=埼玉県
	//   stations   https://express.heartrails.com/api/json?method=getStations&line=東武伊勢崎線

	abstract class RailIndex < res_t > extends SPA.Index
	{
		public fetch_query : string = "" ;
		protected part_created = false ;

		public async fetch ()
		{
			if ( this.part_created )  return ;
			this.part_created = true ;

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

		protected abstract create_parts ( data : res_t ) : SPA.Index [] ;
	}

	export class Root extends RailIndex < res_types.areas >
	{
		constructor ( nav : SPA.Application )
		{
			super ( nav , null , { type : "index" , name : "" , title : "トップページ" } ) ;
			this.fetch_query = "method=getAreas" ;
			log ( "Root Index" ) ;
		}

		create_parts ( data : res_types.areas )
		{
			return data.response.area.map ( area => new Area ( this.app , this , area ) );
		}
	}

	export class Area extends RailIndex < res_types.prefs >
	{
		override fetch_query : string ;

		constructor ( nav : SPA.Application , com : SPA.Index , name : string )
		{
			super ( nav , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getPrefectures&area=${ name }` ;

			log ( "Area Index" , name , this.fetch_query ) ;
		}

		create_parts ( data : res_types.prefs )
		{
			return data.response.prefecture.map ( pref => new Pref ( this.app , this , pref ) )
		}
	}

	export class Pref extends RailIndex < res_types.lines >
	{
		constructor ( nav : SPA.Application , com : SPA.Index , name : string )
		{
			super ( nav , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getLines&prefecture=${ name }` ;

			log ( "Pref Index" , name , this.fetch_query ) ;
		}

		create_parts ( data : res_types.lines )
		{
			return data.response.line.map ( line => new Line ( this.app , this , line ) )
		}
	}

	export class Line extends RailIndex < res_types.stations >
	{
		constructor ( app : SPA.Application , com : SPA.Index , name : string )
		{
			super ( app , com , { type : "index" , name , title : name } ) ;
			this.fetch_query = `method=getStations&line=${ name }` ;
		}

		create_parts ( data : res_types.stations )
		{
			return data.response.station.map ( station => new Station ( this.app , this , station ) )
		}
	}

	export class Station extends SPA.Index
	{
		constructor ( app : SPA.Application , com : SPA.Index , i : station )
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

namespace VC
{
	export const App = ( vm : VM.App = new VM.App ) =>
	{
		return ef.div
		(
			sw
			(
				vm.current_container ,
				container =>
				(
					container?.def ?. ( container.current_index ) ??
					ef.p ( String ( container?.def ) )
				)
			) ,
			ef.div ( sw ( vm.current_index , index => index_page ( index ) ) ) ,
		)
	}

	export const index_page = ( index ? : SPA.Index ) =>
	{
		if ( index instanceof VM.Root )  return root ( index ) ;
		if ( index instanceof VM.Area )  return area ( index ) ;
		if ( index instanceof VM.Pref )  return pref ( index ) ;
		if ( index instanceof VM.Line )  return line ( index ) ;
		if ( index instanceof VM.Station )  return station ( index ) ;

		return ef.article
		(
			ef.h1 ( index ?.title , " - " , index ?.app.title )
		);
	}

	export const station_container = ( index : SPA.Index ) =>
	{
		return ef.article
		(

		) ;
	}

	const root = ( index : VM.Root ) =>
	{
		index.fetch () ;

		return ef.article
		(
			ef.h1 ( index.app.make_title ( index ) ) ,
			list ( index ) ,
			ef.p ( index.link ) ,
		)
	}

	const area = ( index : VM.Area ) =>
	{
		index.fetch () ;

		return ef.article
		(
			com_link ( index ) ,
			list ( index ) ,
			ef.p ( index.link ) ,
		)
	}

	const pref = ( index : VM.Pref ) =>
	{
		index.fetch () ;

		return ef.article
		(
			com_link ( index ) ,
			list ( index ) ,
			ef.p ( index.link ) ,
		)
	}

	const line = ( index : VM.Line ) =>
	{
		index.fetch () ;

		return ef.article
		(
			com_link ( index ) ,
			list ( index ) ,
			ef.p ( index.link ) ,
		)
	}

	const station = ( index : VM.Station ) =>
	{
		const com = index.com ;

		return ef.article
		(
			{ class : "station" } ,

			ef.section
			(
				{ class : "_main" } ,
				index.name
			) ,

			ef.h2
			(
				com && SPA.link ( com ) || undefined
			) ,
			
			com && list ( com ) || undefined ,
		)
	}

	const com_link = ( index : SPA.Index ) =>
	{
		const com = index.com ;

		return com && ef.h2
		(
			SPA.link ( com , index.title )
		)
		|| undefined ;
	}

	const list = ( index : SPA.Index ) =>
	(
		ef.ul
		(
			{ class : "part-list fl-row" } ,
			each
			(
				index.parts ,
				o => ef.li ( SPA.link ( o.target ) )
			)
		)
	) ;
}

export const main = () =>
{
	dom.add ( VC.App () , "body" ) ;
}
