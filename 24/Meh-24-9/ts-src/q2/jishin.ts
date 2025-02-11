import { leaf , Renn , dom , ef , each , log } from "../meh/index.js"

namespace DM
{
	export const load = async () =>
	{
		const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		if( res.status != 200 ) return ;

		const data = await res.json();

		const list = new Map < string , src_record > ;

		data.forEach
		(
			( s : src_record, n : number ) =>
			{
				;
				
				const diff = list.get ( s.eid ) ;
				if
				(
					! diff ||
					diff && ( s.ser > diff.ser )
				)
				{
					log ( s.ser , diff ?.ser )
					list.set ( s.eid , s ) ;
				}
				else
				{
					log ( diff.ser ) ;
				}
			}
		) ;

		log ( new Date () .toISOString () ) ;

		;
	}

	export type src_record =
	{
		"ctt": string ,
		"eid": string ,
		"rdt": string ,
		"ttl": string ,
		"ift": string ,
		"ser": string ,
		"at": string ,
		"anm": string ,
		"acd": string ,
		"cod": string ,
		"mag": string ,
		"maxi": string ,
		"json": string ,
		"en_ttl": string ,
		"en_anm": string 

	}
}

namespace VM
{
	type record =
	{
		eid : string ,
		ser : string , 
		at : string ,
		ttl : string ,
		anm : string ,
		mag : string ,
		maxi : string ,
		cod : string
	}

	export type Records = Renn < record > ;

	export class App
	{
		list = new Renn < record > ;

		loadtime = leaf ( "" ) ;
		text_list = leaf ( "" ) ;
		json = leaf ( "" ) ;
		data ? : object ;

		async init ()
		{
			this.load () ;
			return this ;
		}

		async load ()
		{
			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status != 200 ) return ;

			const data = await res.json();
	
			const list = new Map < string , record > ;

			data.forEach
			(
				( s : record, n : number ) =>
				{
					const { eid , ser , ttl , anm , mag , maxi , cod } = s ;
					const at = s.at.slice( 0, 19 ).replace( "T", " " ) ;
					const eid2 = eid.replace ( /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ , ( all , Y , M , D , h , m , s  ) => `${ Y }/${ M }/${ D } ${ h }:${ m }:${ s }` );
					
					log ( eid2.length )

					const d : record = { eid : eid2 , ser , at , ttl , anm , mag , maxi , cod } ;
					
					const i = list.get ( s.eid ) as any ;
					if( i )
					{
						if ( s.ser > i.ser )  list.set ( s.eid , d ) ;
					}
					
					else  list.set ( s.eid , d ) ;
				}
			) ;

			this.loadtime.value = ( new Date () .toLocaleString () ) ;

			this.text_list.value =
			(
				Array.from ( list.values () ).map ( i => Object.values ( i ).join ( "\t" ) ).join ( "\n" )
			) ;
			this.data = data ;

			this.list.clear () ;
			this.list.new
			(
				Array.from ( list.values () )
			) ;
		}

		json_update ()
		{
			this.json.value = JSON.stringify ( this.data , null , "\t" )	;
		}
	}
}

namespace VC
{
	export const App = ( vm : VM.App ) =>
	{
		return ef.article
		(
			{ class : "地震アプリ" } ,
			ef.h1 ( "地震リスト" ),

			ef.section
			(
				{ class : "fl-row" } ,
				ef.button ( { acts : { click () { vm.load () ; } } } , "更新" )
			),

			List ( vm.list ) ,
			
			ef.section
			(
				ef.textarea ( { style : { height : "100%" } , props : { value : vm.text_list } } ) ,
			) ,
			ef.section
			(
				{ class : "fl-row" } ,
				ef.button ( { acts : { click () { vm.json_update () } } } , "JSON" ) ,
				ef.button ( { acts : { click () { vm.json.value = "" } } } , "消去" ) ,
			) ,
			ef.section
			(
				{ class : "JSONモニタ" } ,
				ef.p ( { style : { whiteSpace : "pre-wrap" , background : "white" } } , vm.json ) ,
			)
		);
	}

	const List = ( m : VM.Records ) =>
	{
		return ef.ul
		(
			{ class : "地震リスト" } ,
			each
			(
				m ,
				o => ef.li
				(
					col ( 5 , String ( o.count.value ) , true ) ,
					ef.span
					(
						{ class : "cols" } ,
						col ( 18 , o.target.eid ) ,
						col ( 3 , o.target.ser ) ,
						col ( 20 , o.target.anm || o.target.ttl , true ) ,
						col ( 5 , o.target.mag ) ,
						col ( 5 , o.target.maxi ) ,
						col ( 23 , o.target.cod ) ,	
					),
				)
			)
		) ;
	}

	const col = ( span : number , text : string | number , bold : boolean = false ) => ef.span
	(
		{ class : "col" , style : { minWidth : span + "ex" , fontWeight : bold ? "bold" : "normal" } } ,
		text
	)
}


export const main = async () =>
{
	const vm = new VM.App ;
	dom.add ( VC.App ( await vm.init () ) , "body" ) ;
}
