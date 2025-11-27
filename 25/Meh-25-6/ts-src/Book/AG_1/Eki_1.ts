import { DD , ef , pl , log } from "../../Meh/Meh.js" ;
import * as BB from "../BookBase.js" ;
import { Eki } from "../../API/Eki.js" ;
import { Tone } from "../Lib/Tone.js" ;
import { Range } from "../Lib/UI.Range.js" ;

const tone = new Tone () ;

export namespace DM
{
}


export namespace VM
{
	document.addEventListener
	(
		"visibilitychange" ,
		ev =>
		{
			const st = document.visibilityState ;
			log ( "visibilitychange" , st ) ;
			tone.voice.sch
			(
				st == "visible" ? [ [ 32 , 12 ] , [ 32 , 17 ] , [ 32 , 21 ] ] :
				st == "hidden" ? [ [ 32 , 12 ] , [ 32 , 16 ] , [ 32 , 19 ] ] :
				[ [ 32 , 24 ] , [ 32 , 12 ] ]
			) ;
		}
	) ;

	window.addEventListener
	(
		"pagehide" ,
		ev =>
		{
			log ( "pagehide" , ev.persisted ) ;
		}
	) ;
}

export namespace VM.index
{
	type index = BB.VM.index ;
	type parts = BB.VM.parts ;

	export class root implements index
	{
		type = "eki.1" ;
		title = "駅データ.jp" ;
		parts : parts ;

		constructor ( datapath : string )
		{
			const ents = Object.keys ( Eki.AreaName_PrefList )  .map < [ string , BB.VM.index ] >
			(
				title => [ title , new area ( title , datapath ) ]
			) ;

			this.parts = Object.fromEntries ( ents ) ;
		}
	}

	class area implements index
	{
		type = "eki.1" ;

		constructor ( public title : string , private datapath : string )
		{}

		parts = async () : Promise < parts > =>
		{
			const ents : [ string , BB.VM.index ] [] = [] ;

			for ( const name of Eki.AreaName_PrefList [ this.title ] )
			{
				ents.push ( [ name , new pref ( name , this.datapath ) ] ) ;
			}

			return Object.fromEntries ( ents ) ;
		}
	}

	class pref implements index
	{
		type = "eki.1" ;
		constructor ( public title : string , private datapath : string )
		{}

		parts = async () : Promise < parts > =>
		{
			const eki = await Eki.make ( this.datapath ) ;
			const lines = eki.pref_line.items
			(
				Eki.pref_cd [ this.title ]
			) ;
	
			const ents : [ string , index ] [] = [] ;
			for ( const rc of lines )
			{
				ents.push ( [ rc.line_name , new line ( rc ) ] ) ;
			}

			return Object.fromEntries ( ents ) ;
		}
	}

	class line implements index
	{
		type = "eki.1" ;
		title : string ;
		cont : any ;

		constructor ( private line : Eki.Line )
		{
			this.title = line.line_name ;
			this.cont = line ;
		}

		parts = async () : Promise < parts > =>
		{
			const ents : [ string , BB.VM.index ] [] = [] ;

			for ( const rec of this.line.Stations )
			{
				ents.push ( [ rec.StationName , new station ( rec ) ] ) ;
			}

			return Object.fromEntries ( ents ) ;
		}
	}

	class station implements index
	{
		type = "eki.1" ;
		title : string ;
		cont : any ;

		constructor ( rec : Eki.Station )
		{
			this.title = rec.StationName ;
			this.cont = rec ;
		}
	}
}


export namespace VC
{
	/* CSS */

	const css = /* css */ `
	
	* {  box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ;  }

	:host
	{
		height : 100% ;
		background : white ;
		overflow : auto ;
	}
	
	
	h1 { padding :  0.5ex  1ex ;  text-align : center ; }

	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }
	
	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }

	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }
	
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	main { height : 100% ; }
	h1 { line-height : 1.5 ; }
	p { line-height : 1.3 ; }

	ul { list-style : none ;  text-align : center ; }
	li { line-height : 1.2 ; }

	.LINE footer { height : 50em ; }

	.LINE table
	{
		border-collapse : collapse ;
		cursor : default ;
		border : none ;
	}

	.LINE td
	{
		border-bottom : 1px solid hsl( 90  10%  88% ) ;
		padding : 0.9ex 1.2ex ;
		white-space : nowrap ;
	}
	.LINE tr:hover td { border-bottom : 1px  solid  hsl( 90  60%  30% ) ; }

	.STATION
	{
		font-size : min( 1.2em , 0.3rem + 1vw ) ;
	}

	.STATION ._LINE_NAME
	{
		font-size : calc( 1.2vw + 1em ) ;
		font-weight : 200 ;
		font-weight : 350 ;
	}

	.STATION ._NAME
	{
		padding-block : 0.8em ;
		font-size : calc( 10vw ) ;
		white-space : nowrap ;
		font-weight : 760 ;
	}

	.STATION li
	{
		line-height : 1.25 ;
		font-weight : 201 ;
	}

	.RANGE
	{
		display : flex ;
		padding-block : 1ex ;
		gap : 1ex ;
	}

	.RANGE input { width : 350px }
	
	` ;


	/* Conponents */

	export function App ( index : BB.VM.Index ) : DD.Node
	{
		return ef.div
		(
			{ shadow : css } ,

			( index.cont ?.type == "Line" ) ?  Line ( index.cont ) :
			( index.cont ?.type == "Station" ) ?  Station ( index.cont ) :
			
			ef.main
			(
				{ class : "FC PM GX JC" } ,
				ef.h1 ( index.title ) ,
				"...." ,
			)
		) ;
	}


	/* Line */
	
	function Line ( rc : Eki.Line ) : DD.Node
	{	
		const ps : ( keyof Eki.Line ) [] = [ "company_cd" , "line_type" , "lat" , "lon" ] ;

		const vol : Range.vm =
		{
			title : "Volume" ,
			value : tone.volume ,
			max : 1 ,
			step : 0.001 ,
			lv : v => ( v * 100 ).toFixed ( 0 ) ,
		} ;

		return ef.main
		(
			{ class : "LINE  FC PM GM" , passive : { mousedown : () => tone.start () } } ,
			ef.h1 ( rc.line_name ) ,
			ef.section
			(
				{ class : "TONE" } ,
				Range ( vol ) ,
				Range ( { title : "Tempo" , value : tone.tempo , max : 300 , min : 20 } ) , 
				Range ( { title : "Trans" , value : tone.transpose , max : 36 , min : -36 } ) , 
			) ,
			ef.ul
			(
				... ps.map ( prop => ef.li ( `${ String ( prop ) } : ${ rc [ prop ] }` ) )
			) ,
			ef.table
			(
				... rc.Stations.map ( ( st , i ) => StationListItem ( i , st ) )
			) ,
			ef.footer ( "---" )
		) ;
	}

	function StationListItem ( i : number , st : Eki.Station ) : DD.Mel
	{
		const lat = ( + st.lat ) .toFixed ( 6 ) ;
		const lon = ( + st.lon ) .toFixed ( 6 ) ;

		return ef.tr
		(
			{ style : { fontWeight : "300" } } ,
			ef.td ( { style : { fontWeight : "500" } } , i + 1 ) ,
			ef.td ( { style : { fontWeight : "900" } } , st.StationName ) ,
			ef.td ( { passive : { mousedown : () => notes ( st.post ) } } , "〒" , st.post ) ,
			ef.td ( st.address ) ,
			ef.td ( { passive : { mousedown : () => notes ( lat ) } } , lat ) ,
			ef.td ( { passive : { mousedown : () => notes ( lon ) } } , lon ) ,
			ef.td ( "( " , st.PrefName , " )" ) ,
		) ;
	}

	function notes ( s : string ) : void
	{
		const n : [ number , number ] [] = s.match ( /\d/g ) ?.map
		(
			( m , n ) => [ 16 , note_t [ Number ( m ) ] ]
		) ?? [] ;

		tone.voice.sch ( n ) ;
	}

	const note_t = [ 60 , 72 , 74 , 76 , 77 , 79 , 81 , 83 , 84 , 86 ] ;


	/* Station */
	
	function Station ( rc : Eki.Station ) : DD.Node
	{
		return ef.main
		(
			{ class : "STATION  FC PM GX JC AC" } ,
			ef.p ( { class : "_LINE_NAME" } , rc.LineName ) ,
			ef.p ( { class : "_NAME" , style : { ... trim ( rc.StationName ) } } , rc.StationName ) ,
			ef.ul
			(
				ef.li ( "〒" + rc.post ) ,
				ef.li ( rc.PrefName + rc.address ) ,
				ef.li ( "北緯 " + rc.lat ) ,
				ef.li ( "東経 " + rc.lon ) ,
			)
		) ;
	}

	function trim ( letter : string ) : Partial < CSSStyleDeclaration >
	{
		const len = letter.length ;
		const [ space = 0 , sc_x = 1 , sc_y = 1 ] = trim_table [ len ] ?? scale ( len ) ;

		return {
			letterSpacing : space + "em" ,
			marginRight : - space + "em" ,
			transform : `scale( ${ sc_x } , ${ sc_y } )` ,
		} ;
	}

	function scale ( len : number ) : number []
	{
		const spc = ( len - 7 )
		const x = ( 7 / len ) * 1.1 ;
		const y = ( len - 7 )  * 0.015  + 1 ;
		return [ 0 , x , y ] ;
	}

	const trim_table : { [ len : number ] : number [] } =
	{
		0 : [] ,
		1 : [ 0 , 1.24 ] ,
		2 : [ 1.0 , 1.14 ] ,
		3 : [ 0.5 , 1.1 ] ,
		4 : [ 0.20 , 1.05 ] ,
		5 : [ 0.07 , 1.05 ] ,
		6 : [ 0.04 , 1.05 ] ,
	} ;
}
