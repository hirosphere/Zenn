import { DD , ef , pl , log } from "../../Meh/Meh.js" ;
import * as BB from "../BookBase.js" ;
import { Eki } from "../../API/Eki.js" ;

export namespace DM
{
}




export namespace VM
{
	export function root_index ( datapath : string ) : BB.VM.index
	{
		const areas = Eki.area_prefs ;
		
		const area_ents =  Object.keys ( areas ) .map < [ string , BB.VM.index ] >
		(
			area =>
			[
				area ,
				{ title : area , parts : () => prefs ( areas [ area ] ) }
			]
		) ;

		const rt =		
		{
			type : "EKI_1" ,
			title : "Eki.jp" ,
			cont : "Root" ,
			parts : Object.fromEntries ( area_ents )
		}
		return rt ;

		/* */

		async function prefs ( list : string [] ) : Promise < BB.VM.parts >
		{
			const ents : [ string , BB.VM.index ] [] = [] ;
			for ( const name of list )
			{
				ents.push ( [ name , pref ( name ) ] ) ;
			}
			return Object.fromEntries ( ents )
		}

		function pref ( title : string )
		{
			return {
				type : "EKI_1" ,
				title ,
				parts : () => lines ( title )
			} ;
		}

		async function lines ( pref : string ) : Promise < BB.VM.parts >
		{
			const r = await Eki.make ( datapath ) ;
			const pref_cd = Eki.pref_cd [ pref ] ;
			const lines = r.pref_line.items ( pref_cd ) ;
	
			const ents : [ string , BB.VM.index ] [] = [] ;
			for ( const r of lines )
			{
				ents.push ( [ r.line_name , line ( r ) ] ) ;
			}
			return Object.fromEntries ( ents ) ;
		}
	
		function line ( line : Eki.Line ) : BB.VM.index
		{
			return {

				type : "EKI_1" ,
				title : line.line_name ,
				parts : () => stations ( line.stations )
			} ;
		}
	
		async function stations ( list : Eki.Station [] )
		{
			const ents : [ string , BB.VM.index ] [] = [] ;
			for ( const rec of list )
			{
				ents.push ( [ rec.station_name , station ( rec ) ] ) ;
			}
			return Object.fromEntries ( ents ) ;
		}
	
		function station ( r : Eki.Station )
		{
			return {
				type : "EKI_1" ,
				title : r.station_name ,
				cont : r.station_cd
			} ;
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

	.GX { padding : 1ex ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	main { height : 100% ; }
	p { line-height : 1.3 ; }
	
	` ;


	/* Conponents */

	export function App ( index : BB.VM.Index ) : DD.Node
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC  PM GX JC AC" } ,
				ef.h1 ( index.title ) ,
				ef.p ( index.type ) ,
				ef.p ( index.cont ) ,
			)
		) ;
	}
}
