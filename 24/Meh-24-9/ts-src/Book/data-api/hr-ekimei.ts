import { navi } from "../../meh/index.js" ;

export namespace HeartRails
{
	//   areas      https://express.heartrails.com/api/json?method=getAreas
	//   prefs      https://express.heartrails.com/api/json?method=getPrefectures&area=関東
	//   lines      https://express.heartrails.com/api/json?method=getLines&prefecture=埼玉県
	//   stations   https://express.heartrails.com/api/json?method=getStations&line=東武伊勢崎線

	const url = "https://express.heartrails.com/api/json?" ;

	export const get_stations = async ( name : string ) : Promise < station [] > =>
	{
		const res = await fetch_data < res_types.stations > ( "getStations&line=" + encodeURIComponent ( name ) ) ;

		return res ? res.response.station : [] ;
	}

	const fetch_data = async < R > ( query : string ) : Promise < R | undefined > =>
	{
		const url = "https://express.heartrails.com/api/json?method=" + query ;
		const res = await fetch ( url ) ;
		if ( res.ok )
		{
			return await ( await res.json () ) as R
		}
	}


	/* */

	export type station =
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

