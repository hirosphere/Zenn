import { Live , Renn , Key , ef , pl , DD as dd , df , log } from "../../Meh/Meh.js" ;
import { jma } from "./jma_data.js" ;

namespace DM
{
	export const load = async ( onload : ( r : record [] ) => void ) =>
	{
		 const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		 if( res.status != 200 ) return ;

		const data = await res.json() as record [];

		// const data = jma as src_record [] ;

		const list = new Map < string , record > ;
		const start = new Date () .getTime () / day_ms - 30

		data.sort ( ( a , b ) => + b.eid - + a.eid ) ;

		data.forEach
		(
			( src : record, n : number ) =>
			{
				const diff = list.get ( src.eid ) ;

				if ( diff == undefined || src.ser > diff.ser )
				{
					src.day_phase = new Date ( ctt ( src.eid ) ).getTime () / day_ms - start ;
					src.date = ctt ( src.eid , "/" , " " , ":" , "" ) ;
					src.pos = pos ( src.cod ) ;
					src.q = "" + src.pos.x ;
					list.set ( src.eid , src ) ;
				}
			}
		) ;

		onload ( [ ... list.values () ] ) ;
	}

	const day_ms = 24 * 3600 * 1000 ;

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
		"en_anm": string ,

		day_phase : number ,
		date : string ,
		pos : pos ,
		q : string ,
	}

	type pos = { x : number ; y : number ; z : number ; } ;

	function pos ( cod : string ) : pos
	{
		const [ x = 0 , y = 0 , z = 0 ] = cod.match ( /([-+][\d\.]+)/g ) ?? [] ;
		return { x : + x , y : + y , z : + z } ;
	}

	function ctt ( s : string , s1 = "-" , s2 = "T" , s3 = ":" , s4 = ".000+09:00" ) : string
	{
		return s.replace
		(
			/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ ,
			( z , y , m , d , h , mi , s ) => y + s1 + m + s1 + d + s2 + h + s3 + mi + s3 + s + s4
		) ;
	}
}


namespace VM
{
	export class App
	{
		public readonly records = new Renn < DM.record > ;
		public readonly loadtime = Live ( "" ) ;

		public  itemHover = new Key ( Live < DM.record | undefined > ( undefined ) ) ;
		public  graph = new Graph ( this.records , this.itemHover ) ;

		listVisible = Live ( true ) ;

		constructor ()
		{
			this.load () ;
		}

		public load () : void
		{
			DM.load ( r => this.records.replace ( r ) ) ;
			this.loadtime.$ = df ( "YYYY.MM.DD (B) hh:mm:ss" ) ;
		}
	}

	export class Graph
	{
		public visible = Live ( true ) ;

		constructor
		(
			public records : DM.Records ,
			public hover : Key < DM.record | undefined >
		)
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
		gap : 1ex ;
	}

	header
	{
		display : flex ;
		padding : 1ex ;
		gap : 1em ;

		white-space : nowrap ;
		overflow : auto ;
	}

	h1
	{
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
		cursor : default ;

		flex-grow : 4.5 ;
		overflow : auto ;
		background : hsl( 235  50%  25% ) ;
		color : hsl( 0  0%  100% / 80% ) ;
		position : relative ;
	}

	.PLOT
	{
	}

	.PLOT._HOVER
	{
		color : hsl( 225  20%  20% ) ;
		background : hsl( 225  40%  70% ) ;
	}
	
	._SHOW { display : block ; }

	` ;

	
	/* */

	export function App () : dd.Node
	{
		const vm = new VM.App ;

		function click () { vm.load () ; }

		const json = Live ( "JSON" ) ;
		const json_update = () =>
		{
			const r = vm.records.orders.map ( o => o.target ) ;
			json.$ = JSON.stringify ( r , null , "\t" ) ;
		} ;
		vm.records.add_ref ( { insert : json_update } ) ;

		return ef.div
		(
			{ shadow : css , } ,

			ef.main
			(
				{ class : "FC" } ,

				ef.header
				(
					{ class : "FR AC" } ,
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
					List ( vm ) ,
				) ,
				// ef.section ( ef.textarea ( { style : { width : "800px" , height : "100px" } , props : { value : json } } ) , ) ,
			) ,
		) ;
	}

	function List ( app : VM.App ) : dd.Node
	{
		const table = ef.table
		(
			Header () ,
			pl.each ( app.records , ( r , o ) => Row ( r , o.$ , app.itemHover.match ( r ) ) ) ,
		) ;

		return ef.section ( { class : [ "EQ_LIST" , { _SHOW : app.listVisible } ] } , table ) ;
	}

	function Header () : dd.Node
	{
		return ef.tr
		(
			ef.th ( "No" ) ,
			... [ "date" , "ser" , "acd" , "anm" , "cod" , "ift" , "mag" , "maxi" , "ttl" , "day" , "pos" ] .map ( title => ef.th ( title ) )
		) ;
	}

	function Row ( r : DM.record , i : number , hover : Key.Match < DM.record | undefined > ) : dd.Node
	{
		return ef.tr
		(
			{ passive : { mouseover : () => hover.select () } } ,
			Col ( ( i + 1 ) + "" ) ,
			Col ( r.date ) ,
			Col ( r.ser ) ,
			Col ( r.acd ) ,
			Col ( r.anm ) ,
			Col ( r.cod ) ,
			Col ( r.ift ) ,
			Col ( r.mag ) ,
			Col ( r.maxi ) ,
			Col ( r.ttl ) ,
			Col ( r.day_phase ) ,
			Col ( r.pos.x ) ,
		) ;
	}

	function Col ( text : string | number ) : dd.Node
	{
		return ef.td
		(
			text
		) ;
	}

	function Graph ( vm : VM.Graph ) : dd.Node
	{
		const style : dd.Style =
		{}

		return ef.section
		(
			{
				class : "GRAPH FC JC AC " ,
				style : { display : vm.visible.trans_r ( s => s ? "" : "none" ) } ,
			} ,
			pl.each ( vm.records , r => Plot ( r , vm.hover ) ) ,
		) ;
	}

	function Plot ( r : DM.record , hoverkey : Key <DM.record | undefined  > ) : dd.Mel
	{
		const day = r.day_phase ;
		const lat = (  35 - r.pos.x ) ;

		const scale = 0.4 * Math.sqrt ( Math.pow ( 32 , ( + r.mag || 0 ) * 0.4 ) ) ;

		const style : dd.Style =
		{
			display : "block" ,
			position : "absolute" ,
			width : "0.4em" ,
			height : "0.4em" ,
			transform : `translate( ${ ( day ) * 30 }em , ${ 20 + lat * 2.0 }em )  scale( ${ scale } )` ,
		}

		const title = `${ r.anm } M${ r.mag } ${ r.date }` ;

		return ef.div
		(
			{
				class : [ "PLOT" , { _HOVER : hoverkey.match ( r ) } ] ,
				attrs : { title } ,
				passive :
				{
					mouseover () { hoverkey.curr.$ = r } ,
					mouseleave () { hoverkey.curr.$ = undefined ; } ,
				} ,
				style
			} ,
			ef.div ( { style : { marginLeft : "-0.035em" , marginTop : "-0.157ex" } } , "*" )
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

