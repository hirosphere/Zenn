import { leaf , Renn , log } from "../../meh/index.js" ;

export class List
{
	datatext = leaf ( "" ) ;
	items =  new Items ;

	async update ()
	{
		const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		if( res.status != 200 ) return ;

		const src_data = await res.json() as srcitem [] ;

		const items = src_data .map ( s => item ( s ) ) ;
		const min_time = items.at ( -1 ) ?.相対時刻 ;
		min_time && items.forEach ( i => i.相対時刻 -= min_time ) ;
		this.items.replace ( items ) ;

		// this.update_monitor ( data ) ;
	}

	protected update_monitor ( data : item [] )
	{
		this.datatext.value = "" ;

		// this.datatext.value = JSON.stringify ( data , null , "\t" ) ;
	}
}

export class Items extends Renn < item > {}

export type srcitem =
{
	ctt ? : string ,
	eid ? : string ,
	rdt ? : string ,
	ttl ? : string ,
	ift ? : string ,
	ser ? : string ,
	at ? : string ,
	anm ? : string ,
	acd ? : string ,
	cod ? : string ,
	mag ? : string ,
	maxi ? : string ,
	int ? : object ,
	json ? : string ,
	en_ttl ? : string ,
	en_anm ? : string ,
}

export function item ( s : srcitem ) : item
{
	const cod = s.cod ?.match
	(
		/[-+]\d+\.?\d+?/g
	) ?.map
	(
		i => Number ( i )
	) ;

	return null ||
	{
		id : s.eid ?? "" ,
		時刻 : s.rdt ?? "" ,
		規模 : s.mag ?? "" ,
		地域 : s.anm ?? "" ,
		地点 : cod && { y : cod[ 0 ] , x : cod[ 1 ] , h : cod[ 2 ] } ,
		相対時刻 : ( s.rdt ? new Date ( s.rdt ) : new Date ) .getTime () / ( 24 * 60 * 60 * 1000 ) ,
	}
}

export type item =
{
	id : string ;
	時刻 : string ;
	規模: string ;
	地域 : string ;
	地点 ? : cod ;
	相対時刻 : number ;
}

export type cod = { x : number ; y : number ; h : number } ;
