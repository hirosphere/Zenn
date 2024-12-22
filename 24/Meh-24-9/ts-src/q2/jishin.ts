import { leaf , dom , ef , log } from "../meh/index.js"

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
				if ( ! diff || diff && ( s.ser ) > diff.ser ) list.set ( s.eid , s ) ;
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
	export class App
	{
		list = leaf ( "" ) ;
		json = leaf ( "" ) ;

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
	
			const list = new Map < string , string > ;

			data.forEach
			(
				( s : any, n : number ) =>
				{
					const d =
					[
						// String( n + 1 ),
						s.eid ,
						s.ser - 0 ,
						s.at.slice( 0, 19 ).replace( "T", " " ),
						s.anm || s.ttl,
						s.mag,
						s.maxi,
						s.cod
					]
					.join( "\t" ) ;
					
					list.set ( s.eid , d ) ;
				}
			) ;

			log ( new Date () .toISOString () )

			this.list.value = Array.from ( list.values () ).join ( "\n" ) ;
			this.json.value = JSON.stringify ( data , null , "\t" )
		}
	}
}

namespace VC
{
	export const App = ( vm : VM.App ) =>
	{
		return ef.article
		(
			ef.h1 ( "地震リスト" ),
			ef.section
			(
				ef.button ( { acts : { click () { vm.load () ; } } } , "更新" )
			),
			ef.section
			(
				ef.textarea ( { props : { value : vm.list } } ) ,
				ef.textarea ( { props : { value : vm.json } } ) ,
			)
		);
	}
}


export const main = async () =>
{
	const vm = new VM.App ;
	dom.add ( VC.App ( await vm.init () ) , "body" ) ;
}
