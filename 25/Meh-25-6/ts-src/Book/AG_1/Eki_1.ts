
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
				{ title : area , parts : () => prefs ( areas [ area ] , datapath ) }
			]
		) ;

		const rt =		
		{
			title : "Eki.jp" ,
			parts : Object.fromEntries ( area_ents )
		}
		return rt ;
	}

	async function prefs ( list : string [] , datapath : string ) : Promise < BB.VM.parts >
	{
		const ents : [ string , BB.VM.index ] [] = [] ;
		for ( const name of list )
		{
			ents.push ( [ name , pref ( name , datapath ) ] ) ;
		}
		return Object.fromEntries ( ents )
	}

	function pref ( title : string , datapath : string )
	{
		return { type : "pref" , title , parts : () => lines ( title , datapath ) } ;
	}

	async function lines ( pref : string , datapath : string ) : Promise < BB.VM.parts >
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
		return { title : line.line_name } ;
	}

	async function stations ( r : Eki.Station [] )
	{
		const ents : [ string , BB.VM.index ] [] = [] ;
		for ( const st of r )
		{
			ents.push ( [ st.station_name , station ( st ) ] ) ;
		}
		return Object.fromEntries ( ents ) ;
	}

	function station ( r : Eki.Station )
	{
		return { title : r.station_name } ;
	}
}




export namespace VC
{
	;
}
