const log = console.log ;

/*
	名称引きリスト
	コード引きレコード
		会社コード
		路線コード
		駅コード
	インデックス
		ルート
			エリア (北海道・東北,関東・甲信越..)
				エリア会社 (JR東日本,..)
					路線
						駅

*/

export type Eki = Eki.RecordSet ;

export async function Eki ( dataPath : string = "../../../" ) : Promise < Eki.RecordSet >
{
	return await Eki.make ( dataPath ) ;
}

export namespace Eki
{
	let records : RecordSet | undefined = undefined ;
	const initiate = Symbol () ;

	export const make = async ( dataPath : string ) : Promise < RecordSet > =>
	{
		if ( ! records )
		{
			records = new RecordSet () ;
			await records [ initiate ] ( dataPath ) ;	

			log ( "Eki make" ) ;
		}
		return records ;
	}

	/* Index */

	export type Index = { name : string ; parts ? : Index [] } ;


	class RootIndex
	{
		constructor ( private rc : RecordSet )
		{}

		public get name () { return "駅データ.jp" ; }
		
		public get parts () : Index []
		{
			return Object.keys( AreaName_PrefList ).map ( label => new AreaIndex ( label , this.rc ) ) ;
		}
	}

	class AreaIndex
	{
		public readonly parts : PrefIndex [] ;

		constructor ( public readonly name : string , rc : RecordSet )
		{
			this.parts = AreaName_PrefList [ name ] ?.map
			(
				pref => new PrefIndex ( pref , rc )
			
			) ?? [] ;
		}
	}

	class PrefIndex
	{
		public readonly name : string ;
		public readonly parts : Index [] ;

		constructor ( name : string , private rc : RecordSet )
		{
			this.name = name ;

			const cd = pref_cd [ name ] ;

			this.parts = rc.pref_line.items ( cd ) ?.map
			(
				line => new LineIndex ( line )
			
			) ?? [] ;
		}
	}

	class LineIndex
	{
		public readonly name : string ;
		public readonly parts : Index [] ;

		constructor ( line : Line )
		{
			this.name = line.line_name ;
			this.parts = line.Stations.map ( stat => new StationIndex ( stat ) ) ;
		}
	}

	class StationIndex
	{
		public readonly name : string ;

		constructor ( stat : Station )
		{
			this.name = stat.StationName ;
		}
	}




	/* Records */


	export class RecordSet
	{
		/* インデックス */		

		public readonly rootIndex = new RootIndex ( this ) ;


		/* 二次構築データ */

		public readonly pref_station = new Maple < pref_cd , Station > ;
		public readonly pref_company = new Maple < pref_cd , Company >
		public readonly pref_line = new Setmap < pref_cd , Line >


		/* レコード */

		public readonly company = new Map < company_cd , Company > ;
		public readonly line = new Map < line_cd , Line > ;
		public readonly station = new Map < station_cd , Station > ;

		public readonly join = new Maple < line_cd , [ station_cd , station_cd ] > ;

		/* 処理 */

		public async [ initiate ] ( dataPath : string )
		{
			const dataRoot = dataPath + "DataSource/Eki/" ;

			/* 読み込みは二次構築を兼ねる */
			
			/* 会社データを読み込み */
			( await fetchCSV ( dataRoot + "company.csv" ) )
			.forEach ( records => new Company ( this , records ) ) ;
			
			/* 路線データを読み込み */
			( await fetchCSV ( dataRoot + "line.csv" ) )
			.forEach ( records => new Line ( this , records ) ) ;
			
			/* 駅データを読み込み */
			( await fetchCSV ( dataRoot + "station.csv" ) )
			.forEach ( records => new Station ( this , records ) ) ;

			/* 駅順序データを読み込み */
			( await fetchCSV ( dataRoot + "join.csv" ) )
			.forEach ( i => this.set_station_rel ( i ) ) ;


			/* 路線レコードの駅リストと都道府県リストを初期化 */
			this.line.forEach ( rc => rc [ initiate ] ( this ) ) ;
		}

		protected set_station_rel ( [ line_cd , stat_cd , next_cd ] : string [] )
		{
			const stat = this.station.get ( stat_cd ) ;
			const next = this.station.get ( next_cd ) ;
			if ( ! stat || ! next )  return ;
			stat.next.push ( next ) ;
			next.prev.push ( stat ) ;
		}

		/* クエスト */

		qst ()
		{
			const sn = ( scd : string ) => this.station.get ( scd )?.StationName ?? ".."

			const line_cd = "11308" ;
			const l = this.line.get ( line_cd ) ;
			const rt =
			{
				name : l?.line_name ,
				list : this.join.get ( line_cd ) ?.map ( i => sn( i[0] ) + " -> " + sn( i[1] ) )
			}
			return rt ;
		}
	}

	
	/* テキストデータをフェッチして、行アレイとして得る */

	const fetchCSV = async ( filePath : string ) : Promise < string [][] > =>
	{
		const r = await fetch ( filePath ) ;
		if ( ! r.ok ) return [] ;
		const csv = await r.text () ;
		const lines = csv.split ( "\n" ) ;
		lines.shift () ;
		lines.pop () ;
		return lines .map ( line => line.split ( "," ) );
	}




	/* Record */

	export const line = new Map < line_cd , Line > ;
	export const station = new Map < station_cd , Station > ;

	export const pref_company = new Map < pref_cd , Company [] > ;
	export const pref_line = new Map < pref_cd , Line [] > ;
	export const pref_station = new Map < pref_cd , Station [] > ;
	export const line_station = new Map < string , Station [] > ;

	type line_cd = string ;
	type company_cd = string ;
	type pref_cd = string ;
	type station_g_cd = string ;
	type station_cd = string ;




	/* Data Classes */

	export class Company
	{
		public readonly type = "Company" ;

		constructor ( records : RecordSet , public iv : string [] )
		{
			records.company.set ( this.company_cd , this ) ;
		}

		public get name () { return this.company_name ; }

		public get company_cd () : string { return this.iv [ 0 ] ; }
		public get rr_cd () : string { return this.iv [ 1 ] ; }
		public get company_name () : string { return this.iv [ 2 ] ; }
		public get company_name_k () : string { return this.iv [ 3 ] ; }
		public get company_name_h () : string { return this.iv [ 4 ] ; }
		public get company_name_r () : string { return this.iv [ 5 ] ; }
		public get company_url () : string { return this.iv [ 6 ] ; }
		public get company_type () : string { return this.iv [ 7 ] ; }
		public get e_status () : string { return this.iv [ 8 ] ; }
		public get e_sort () : string { return this.iv [ 9 ] ; }
	}

	export class Line
	{
		public readonly type = "Line" ;

		constructor ( records : RecordSet , public iv : string [] )
		{
			records.line.set ( this.line_cd , this ) ;
		}

		readonly prefset = new Set < pref_cd > ;
		readonly Stations : Station [] = [] ;

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

		/* 駅リストと都道府県リストを初期化 */

		[ initiate ] ( records : RecordSet )
		{
		}
	}

	export class Station
	{
		public readonly type = "Station" ;

		constructor ( protected records : RecordSet , public iv : string [] )
		{
			/* 駅・路線・都道府県データの関連付け */

			records.station.set ( this.station_cd , this ) ;
			const line = records.line.get ( this.line_cd ) ;
			line ?.Stations.push ( this ) ;
			line ?.prefset.add ( this.pref_cd ) ;

			records.pref_station.pushItem ( this.pref_cd , this ) ;
			if ( line )  records.pref_line.setItem ( this.pref_cd , line ) ;


			/* address の重複都道府県名を除去 */
			iv [ 8 ] = iv [ 8 ].replace ( this.PrefName , "" ) ;
		}

		get PrefName ()  {  return cd_pref [ this.pref_cd ] ;  }
		get LineName ()  {  return this.records.line.get ( this.line_cd ) ?.line_name ?? ".."  }

		readonly next : Station [] = [] ;
		readonly prev : Station [] = [] ;

		get station_cd () {  return this.iv [ 0 ] ; }
		get station_g_cd () {  return this.iv [ 1 ] ; }
		get StationName () {  return this.iv [ 2 ] ; }
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



	/*  */

	export const AreaName_PrefList : { [ name : string ] : string [] } =
	{
		"北海道・東北" : [ "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県", ] ,
		"関東・甲信越" : [ "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","山梨県","長野県","新潟県", ] ,
		"東海・北陸" : [ "富山県","石川県","福井県","岐阜県","静岡県","愛知県","三重県", ] ,
		"近畿" : [ "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県", ] ,
		"中国・四国" : [ "鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県", ] ,
		"九州・沖縄" : [ "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県", ]
	} ;




	const cd_pref : { [ cd : pref_cd ] : string } =
	{
		"1":"北海道","2":"青森県","3":"岩手県","4":"宮城県","5":"秋田県","6":"山形県","7":"福島県","8":"茨城県","9":"栃木県","10":"群馬県","11":"埼玉県","12":"千葉県","13":"東京都","14":"神奈川県","15":"新潟県","16":"富山県","17":"石川県","18":"福井県","19":"山梨県","20":"長野県","21":"岐阜県","22":"静岡県","23":"愛知県","24":"三重県","25":"滋賀県","26":"京都府","27":"大阪府","28":"兵庫県","29":"奈良県","30":"和歌山県","31":"鳥取県","32":"島根県","33":"岡山県","34":"広島県","35":"山口県","36":"徳島県","37":"香川県","38":"愛媛県","39":"高知県","40":"福岡県","41":"佐賀県","42":"長崎県","43":"熊本県","44":"大分県","45":"宮崎県","46":"鹿児島県","47":"沖縄県","99":"その他"
	} ;


	export const pref_cd = Object.fromEntries( Object.entries( cd_pref ).map( ([ cd , title ]) => [ title , cd ] ) ) ;
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
		if ( ! this.has ( key ) ) this.set ( key , list ) ;
		return list ;
	}
}

class Setmap < Key , Item > extends Map < Key , Set < Item > >
{
	public setItem ( key : Key , item : Item ) : void
	{
		this.makeSet ( key ) .add ( item ) ;
	}

	public items ( key : Key ) : Item []
	{
		const set = this.get ( key ) ;
		return set ? [ ... set ] : [] ;
	}

	protected makeSet ( key : Key ) : Set < Item >
	{
		let set = this.get ( key ) ?? new Set < Item > ;
		if ( ! this.has ( key ) ) this.set ( key , set ) ;
		return set ;
	}
}
