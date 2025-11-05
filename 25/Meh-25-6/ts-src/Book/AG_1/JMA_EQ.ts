import { Live , Renn , ef , pl , DD as dd , df , log } from "../../Meh/Meh.js" ;
import { jma } from "./jma_data.js" ;

namespace DM
{
	export const load = async ( onload : ( r : src_record [] ) => void ) =>
	{
		 const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		 if( res.status != 200 ) return ;

		const data = await res.json();

		// const data = jma as src_record [] ;

		const list = new Map < string , src_record > ;

		data.forEach
		(
			( src : src_record, n : number ) =>
			{
				const diff = list.get ( src.eid ) ;
				if
				(
					! diff ||
					diff && ( src.ser > diff.ser )
				)
				{
					src.ctt = ctt ( src.ctt ) ;
					src.eid = ctt ( src.eid ) ;
					list.set ( src.eid , src ) ;
				}
			}
		) ;

		onload ( [ ... list.values () ] ) ;
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

	function ctt ( s : string ) : string
	{
		return s.replace
		(
			/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ ,
			( z , y , m , d , h , mi , s ) => `${ y }-${ m }-${ d }-${ h }:${ mi }:${ s }`
		) ;
	}
}


namespace VM
{
	export class App
	{
		public readonly records = Live < DM.src_record [] | undefined > ( undefined ) ;
		public readonly loadtime = Live ( "" ) ;

		constructor ()
		{
			this.load () ;
		}

		load () : void
		{
			DM.load ( r => this.records.$ = r ) ;
			this.loadtime.$ = df ( "YYYY.MM.DD (B) hh:mm:ss" ) ;
		}
	}
}

export namespace VC
{
	/* */

	const css = /* css */ `
	
	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ; }

	:host
	{
		height : 100% ;
	}

	main
	{
		width : 100em ;
		background : white ;

		display : flex ;
		flex-direction : column ;
		overflow : auto ;
		padding : 1em ;
		align-items : center ;
		gap : 1ex ;
	}

	header
	{
		display : flex ;
		align-items : center ;
		gap : 1em ;
	}

	h1
	{
		text-align : center ;
	}

	button { padding : 1ex 1.2em ; }

	table.EQ_LIST
	{
		cursor : default ;
	}

	td { padding-block : 0.7ex ; }

	.EQ_LIST tr:hover
	{
		background : hsl( 90  40%  90% ) ;
	}

	.EQ_LIST td , .EQ_LIST th
	{
		padding-inline : 0.7ex ;
		white-space : nowrap ;
	}
	
	` ;

	
	/* */

	export function App () : dd.Node
	{
		const vm = new VM.App ;

		function click () { vm.load () ; }

		return ef.div
		(
			{ shadow : css , } ,

			ef.main
			(
				{  } ,

				ef.header
				(
					{ class : "" } ,
					ef.h1 ( "JMA 地震リスト" , ) ,
					ef.button ( { passive : { click } } , "読み込み" ) ,
					ef.span ( vm.loadtime ) ,
				) ,

				pl.key ( vm.records , rs => rs && Table ( rs ) ) ,
			) ,
		) ;
	}

	const cols : { [ col in keyof DM.src_record ] ? : {} } =
	{
		eid : {} ,
		ser : {} ,
	//	ctt : {} ,
	//	at : {} ,
	//	rdt : {} ,
		acd : {} ,
		anm : {} ,
		cod : {} ,
	//	en_anm : {} ,
	//	en_ttl : {} ,
		ift : {} ,
	//	json : {} ,
		mag : {} ,
		maxi : {} ,
		ttl : {} ,
	} ;

	function Table ( r : DM.src_record [] ) : dd.Node
	{
		return ef.table
		(
			{ class : "EQ_LIST" } ,
			Header () ,
			... r.map ( ( r , i ) => Row ( r , i ) ) ,
		) ;
	}

	function Header () : dd.Node
	{
		return ef.tr
		(
			ef.th ( "No" ) ,
			... Object.entries ( cols ) .map
			(
				( [ prop , s ] ) => ef.th ( prop )
			)
		) ;
	}

	function Row ( r : DM.src_record , i : number ) : dd.Node
	{
		return ef.tr
		(
			Col ( ( i + 1 ) + "" ) ,
			... Object.keys ( cols ) .map
			(
				prop => Col ( r [ prop as keyof DM.src_record ] )
			)
		) ;
	}

	function Col ( text : string ) : dd.Node
	{
		return ef.td
		(
			text
		) ;
	}
}

