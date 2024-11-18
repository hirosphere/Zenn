
/* */

export const log = console.log;


/* */

export function df ( format : string , date : Date = new Date ) : string
{
	return format.replace ( /u?(YY|Y|MM|M|DD|D|hh|h|mm|m|ss|s)|B/g , s => df.cv ( s , date ) ) ;
}

export namespace df
{
	export const cv = ( s : string , d : Date ) : string =>
	{
		return table [ s ] ?. ( d ) ?? s ;
	}

	const table : { [ s :string ] : ( d : Date ) => string } =
	{
		Y : ( d : Date ) => d.getFullYear ().toString () ,
		M : ( d : Date ) => ( d.getMonth () + 1 ).toString () ,
		D : ( d : Date ) => d.getDate ().toString () ,
		h : ( d : Date ) => d.getHours ().toString () ,
		m : ( d : Date ) => d.getMinutes ().toString () ,
		s : ( d : Date ) => d.getSeconds ().toString () ,

		YY : ( d : Date ) => r2 ( d.getFullYear () ) ,
		MM : ( d : Date ) => p2 ( d.getMonth () + 1 ) ,
		DD : ( d : Date ) => p2 ( d.getDate () ) ,
		hh : ( d : Date ) => p2 ( d.getHours () ) ,
		mm : ( d : Date ) => p2 ( d.getMinutes () ) ,
		ss : ( d : Date ) => p2 ( d.getSeconds () ) ,

		B : ( d : Date ) => 曜日 [ d.getDay() ] ,
	}

	const p2 = ( v : number ) => v.toString () .padStart ( 2 , "0" ) ;

	const r2 = ( v : number ) =>
	{
		const s = v.toString ();
		return s.substring ( s.length - 2 , s.length ) ;
	}

	const 曜日 = [ "日" , "月" , "火" , "水" , "木" , "金" , "土"  ] ;
}

