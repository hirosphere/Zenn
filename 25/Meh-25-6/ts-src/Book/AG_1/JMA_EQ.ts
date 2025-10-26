import { Live , Renn , ef , pl , DD as dd , log } from "../../Meh/Meh.js" ;
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
				;
				
				const diff = list.get ( src.eid ) ;
				if
				(
					! diff ||
					diff && ( src.ser > diff.ser )
				)
				{
					log ( src.ser , diff ?.ser )
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
}


namespace VM
{
	export class App
	{
		public readonly records = Live < DM.src_record [] | undefined > ( undefined ) ;

		constructor ()
		{
			DM.load ( r => this.records.$ = r ) ;
		}
	}
}

export namespace VC
{
	export function App () : dd.Node
	{
		const vm = new VM.App ;

		return ef.div
		(
			{ shadow : css , } ,

			ef.main
			(
				{  } ,

				ef.h1 ( "JMA 地震リスト" ) ,
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

	/* */

	const css = /* css */ `
	
	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ; }

	:host
	{
		height : 100% ;
		overflow : auto ;
		background : white ;
	}

	main
	{
		display : flex ;
		flex-direction : column ;
		padding : 1em ;
		align-items : center ;
		gap : 1ex ;
	}

	h1  { text-align : center ; }

	table.EQ_LIST
	{
		cursor : default ;
	}

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
}

