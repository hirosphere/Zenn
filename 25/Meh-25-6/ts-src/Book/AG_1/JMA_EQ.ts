import { Live , Renn , ef , pl , DD as dd , df , log } from "../../Meh/Meh.js" ;
import { jma } from "./jma_data.js" ;

namespace DM
{
	export const load = async ( onload : ( r : record [] ) => void ) =>
	{
		 const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		 if( res.status != 200 ) return ;

		const data = await res.json();

		// const data = jma as src_record [] ;

		const list = new Map < string , record > ;

		data.forEach
		(
			( src : record, n : number ) =>
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

	export type Records = Renn < record > ;

	export type record =
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
		public readonly records = new Renn < DM.record > ;
		public readonly loadtime = Live ( "" ) ;

		graph = new Graph ( this.records ) ;

		listVisible = Live ( true ) ;

		constructor ()
		{
			this.load () ;
		}

		load () : void
		{
			DM.load ( r => this.records.replace ( r ) ) ;
			this.loadtime.$ = df ( "YYYY.MM.DD (B) hh:mm:ss" ) ;
		}
	}

	export class Graph
	{
		public visible = Live ( false ) ;

		constructor ( public records : DM.Records )
		{}
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
		background : white ;
	}

	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }
	.AS { align-items : stretch ; }
	.PX { padding : 1ex ; }
	.GX { gap : 1ex ; }

	main
	{
		height : 100% ;

		overflow : hidden ;
		padding : 1px ;
		align-items : stretch ;
		gap : 1ex ;
	}

	header
	{
		display : flex ;
		padding : 1ex ;
		align-items : center ;
		gap : 1em ;
	}

	h1
	{
		text-align : center ;
	}

	button { padding : 1ex 1.2em ; }

	label
	{
		display : flex ;
		gap : 0.36ex ;
		align-items : center ;
	}

	.BODY
	{
		flex-grow : 10 ;
	}

	.EQ_LIST
	{
		flex-grow : 4.5 ;
		height : 0 ;
		cursor : default ;
		overflow : auto ;
		display : none ;
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

	.GRAPH
	{
		flex-grow : 5.5 ;
		overflow : auto ;
		background : hsl( 235  60%  60% ) ;
		display : none ;
	}
	
	._SHOW { display : block ; }

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
				{ class : "FC AS" } ,

				ef.header
				(
					{ class : "FR JC AC" } ,
					ef.h1 ( "JMA 地震リスト" , ) ,
					ef.button ( { passive : { click } } , "読み込み" ) ,
					ef.span ( vm.loadtime ) ,
					ef.section
					(
						{ class : "FR GX" } ,
						Check ( "グラフ" , vm.graph.visible ) ,
						Check ( "リスト" , vm.listVisible ) ,
					) ,
				) ,

				ef.section
				(
					{ class : "BODY  FC " } ,
					Graph ( vm.graph ) ,
					List ( vm.records , vm.listVisible ) ,
				) ,
			) ,
		) ;
	}

	const cols : { [ col in keyof DM.record ] ? : {} } =
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

	function List ( rc : DM.Records , vis : Live.bool ) : dd.Node
	{
		const table = ef.table
		(
			Header () ,
			pl.each ( rc , ( r , o ) => Row ( r , o.$ ) ) ,
		) ;

		return ef.section ( { class : [ "EQ_LIST" , { _SHOW : vis } ] } , table ) ;
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

	function Row ( r : DM.record , i : number ) : dd.Node
	{
		return ef.tr
		(
			Col ( ( i + 1 ) + "" ) ,
			... Object.keys ( cols ) .map
			(
				prop => Col ( r [ prop as keyof DM.record ] )
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

	function Graph ( vm : VM.Graph ) : dd.Node
	{
		return ef.section
		(
			{ class : [ "GRAPH" , { _SHOW : vm.visible } ] } ,
			"Graph"
		) ;
	}

	const Check = ( label : string , state : Live.bool ) : dd.Node => ef.label
	(
		label ,
		ef.input
		(
			{
				attrs : { type : "checkbox" } ,
				biBind : { chChan : state } ,
			} ,
		)
	) ;
}

