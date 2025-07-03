const log = console.log ;


export async function Eki ( dataPath : string = "../../../" ) : Promise < Eki.Records >
{
	return await Eki.create ( dataPath ) ;
}

export namespace Eki
{
	const initiate = Symbol () ;

	export const create = async ( dataPath : string ) : Promise < Records > =>
	{
		const records = new Records () ;
		await records [ initiate ] ( dataPath ) ;
		return records ;
	}

	export class Records
	{
		public readonly pref_stations = new Maple < pref_cd , StationRecord > ;

		public readonly line = new Map < line_cd , LineRecord > ;
		public readonly station = new Map < station_cd , StationRecord > ;

		public async [ initiate ] ( dataPath : string )
		{
			const dataRoot = dataPath + "DataSource/Eki/" ;
			
			( await fetchLines ( dataRoot + "line.csv" ) )
			.forEach ( l => new LineRecord ( this , l.split ( "," ) ) ) ;
			
			( await fetchLines ( dataRoot + "station.csv" ) )
			.forEach ( l => new StationRecord ( this , l.split ( "," ) ) ) ;
		}

		protected async initiate_lines ( dataRoot : string ) : Promise < void >
		{
		}

		protected async initiate_stations ( dataRoot : string ) : Promise < void >
		{
		}
	}

	const fetchLines = async ( filePath : string ) : Promise < string [] > =>
	{
		const r = await fetch ( filePath ) ;
		if ( ! r.ok ) return [] ;
		const csv = await r.text () ;
		const lines = csv.split ( "\n" ) ;
		lines.shift () ;
		return lines ;
	}

	/**  */

	export const line = new Map < line_cd , LineRecord > ;
	export const station = new Map < station_cd , StationRecord > ;

	export const pref_station = new Map < pref_cd , StationRecord [] > ;
	export const line_station = new Map < string , StationRecord [] > ;

	type line_cd = string ;
	type company_cd = string ;
	type pref_cd = string ;
	type station_g_cd = string ;
	type station_cd = string ;

	interface Index
	{
		get name () : string ;
		get parts () : Index [] ;
	}

	class AreaIndex
	{
	}

	class PrefIndex
	{
	}

	class CompanyIndex
	{
		;
	}

	class LineRecord
	{
		constructor ( records : Records , public iv : string [] )
		{
			records.line.set ( this.line_cd , this ) ;
		}

		get line_cd () {  return this.iv [ 0 ] ; }
		get company_cd () {  return this.iv [ 1 ] ; }
		get line_name () {  return this.iv [ 2 ] ; }
		get line_name_k () {  return this.iv [ 3 ] ; }
		get line_name_h () {  return this.iv [ 4 ] ; }
		get line_color_c () {  return this.iv [ 5 ] ; }
		get line_color_t () {  return this.iv [ 6 ] ; }
		get line_type () {  return this.iv [ 7 ] ; }
		get lon () {  return this.iv [ 8 ] ; }
		get lat () {  return this.iv [ 9 ] ; }
		get zoom () {  return this.iv [ 10 ] ; }
		get e_status () {  return this.iv [ 11 ] ; }
		get e_sort () {  return this.iv [ 12 ] ; }

		readonly prefs : string [] = [] ;
	}

	class StationRecord
	{
		constructor ( protected records : Records , public iv : string [] )
		{
			records.station.set ( this.station_cd , this ) ;
			records.pref_stations.pushItem ( this.pref_cd , this ) ;
		}

		get pref ()  {  return pref [ this.pref_cd ] ;  }
		get line ()  {  return this.records.line.get ( this.line_cd ) ?.line_name ?? ".."  }

		get station_cd () {  return this.iv [ 0 ] ; }
		get station_g_cd () {  return this.iv [ 1 ] ; }
		get station_name () {  return this.iv [ 2 ] ; }
		get station_name_k () {  return this.iv [ 3 ] ; }
		get station_name_r () {  return this.iv [ 4 ] ; }
		get line_cd () {  return this.iv [ 5 ] ; }
		get pref_cd () {  return this.iv [ 6 ] ; }
		get post () {  return this.iv [ 7 ] ; }
		get address () {  return this.iv [ 8 ] ; }
		get lon () {  return this.iv [ 9 ] ; }
		get lat () {  return this.iv [ 10 ] ; }
		get open_ymd () {  return this.iv [ 11 ] ; }
		get close_ymd () {  return this.iv [ 12 ] ; }
		get e_status () {  return this.iv [ 13 ] ; }
		get e_sort () {  return this.iv [ 14 ] ; }
	}

	const pref : { [ cd : pref_cd ] : string } =
	{
		"1":"北海道","2":"青森県","3":"岩手県","4":"宮城県","5":"秋田県","6":"山形県","7":"福島県","8":"茨城県","9":"栃木県","10":"群馬県","11":"埼玉県","12":"千葉県","13":"東京都","14":"神奈川県","15":"新潟県","16":"富山県","17":"石川県","18":"福井県","19":"山梨県","20":"長野県","21":"岐阜県","22":"静岡県","23":"愛知県","24":"三重県","25":"滋賀県","26":"京都府","27":"大阪府","28":"兵庫県","29":"奈良県","30":"和歌山県","31":"鳥取県","32":"島根県","33":"岡山県","34":"広島県","35":"山口県","36":"徳島県","37":"香川県","38":"愛媛県","39":"高知県","40":"福岡県","41":"佐賀県","42":"長崎県","43":"熊本県","44":"大分県","45":"宮崎県","46":"鹿児島県","47":"沖縄県","99":"その他"
	} ;
	
	const area_pref : { [ name : string ] : string [] } =
	{
		"北海道・東北" : [ "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県", ] ,
		"関東・甲信越" : [ "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","山梨県","長野県","新潟県", ] ,
		"東海・北陸" : [ "富山県","石川県","福井県","岐阜県","静岡県","愛知県","三重県", ] ,
		"近畿" : [ "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県", ] ,
		"中国・四国" : [ "鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県", ] ,
		"九州・沖縄" : [ "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県", ]
	} ;
	
}

class Maple < Key , Item > extends Map < Key , Item [] >
{
	public pushItem ( key : Key , item : Item )
	{
		this.makeList ( key ) .push ( item ) ;
	}

	protected makeList ( key : Key ) : Array < Item >
	{
		let list = this.get ( key ) ?? [] ;
		if ( ! this.has ( key) ) this.set ( key , list ) ;
		return list ;
	}
}
