import { leaf , Renn , log } from "../../meh/index.js" ;

export class List
{
	datatext = leaf ( "" ) ;
	items =  new Items ;
	map = new Map < string , item > ;

	async update ()
	{
		const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		if( res.status != 200 ) return ;

		const src_data = await res.json() as srcitem [] ;

		const basetime = ( new Date().getTime() / daytick ) - 30 ;

		const map = new Map < string , srcitem > ;

		for ( const src of src_data )
		{
			const eid = src.eid ;
			const iso = map.get ( eid ) ;
			if ( ! iso )  map.set ( src.eid , src ) ;
			else  if ( src.ser > iso.ser ) map.set ( eid , src )
		}

		this.items.replace ( Array.from ( map , ( [ key , src ] ) => item ( src , basetime ) ) ) ;

		// this.update_monitor ( data ) ;
	}

	protected update_monitor ( data : item [] )
	{
		this.datatext.value = "" ;

		// this.datatext.value = JSON.stringify ( data , null , "\t" ) ;
	}
}

const daytick = ( 24 * 60 * 60 * 1000 ) ;

export class Items extends Renn < item > {}

export type srcitem =
{
	ctt ? : string ,
	eid : string ,
	rdt ? : string ,
	ttl ? : string ,
	ift ? : string ,
	ser : string ,
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

export function item ( s : srcitem , basetime : number ) : item
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
		時刻 : s.eid ? s.eid.replace ( date_regex , data_cv ) : "" ,
		規模 : s.mag ?? "" ,
		地域 : s.anm ?? "" ,
		地点 : cod && { y : cod[ 0 ] , x : cod[ 1 ] , h : cod[ 2 ] } ,
		相対時刻 : ( s.rdt ? new Date ( s.rdt ) : new Date ) .getTime () / daytick - basetime ,
		s
	}
}

const date_regex = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ ;
const data_cv : ( ... args : string [] ) => string = ( all , Y , M , D , h , m , s ) => `${ Y }-${ M }-${ D }T${ h }:${ m }:${ s }+09:00`

export type item =
{
	id : string ;
	時刻 : string ;
	規模: string ;
	地域 : string ;
	地点 ? : cod ;
	相対時刻 : number ;
	s : srcitem ;
}

export type cod = { x : number ; y : number ; h : number } ;
