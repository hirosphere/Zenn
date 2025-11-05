import { DD , ef , pl , log } from "../../Meh/Meh.js" ;
import * as BB from "../BookBase.js" ;
import { Eki } from "../../API/Eki.js" ;

export namespace DM
{
}



export namespace VM.index
{
	type index = BB.VM.index ;
	type parts = BB.VM.parts ;

	export class root implements index
	{
		type = "Eki1" ;
		title = "Eki.js {}" ;
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

	.GX { padding : 1ex ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	main { height : 100% ; }
	h1 { line-height : 1.5 ; }
	p { line-height : 1.3 ; }

	ul { list-style : none ;  text-align : center ; }
	li { line-height : 1.14 ; }
	
	` ;


	/* Conponents */

	export function App ( index : BB.VM.Index ) : DD.Node
	{
		log ( "App index type" , index.cont ?.type )

		return ef.div
		(
			{ shadow : css } ,

			( index.cont ?.type == "Line" ) ?  Line ( index.cont ) :
			( index.cont ?.type == "Station" ) ?  Station ( index.cont ) :
			
			ef.main
			(
				{ class : "FC  PM GX JC AC" } ,
				ef.h1 ( index.title ) ,
				"...." ,
			)
		) ;
	}
	
	function Line ( rc : Eki.Line ) : DD.Node
	{
		const ps : ( keyof Eki.Line ) [] = [ "company_cd" , "line_type" , "lat" , "lon" ] ;

		return ef.main
		(
			{ class : "FC  PM GX JC AC" } ,
			ef.h1 ( rc.line_name ) ,
			ef.ul
			(
				... ps.map ( prop => ef.li ( `${ String ( prop ) } : ${ rc [ prop ] }` ) )
			)
		) ;
	}
	
	function Station ( rc : Eki.Station ) : DD.Node
	{
		const ps : ( keyof Eki.Station ) [] = [ "post" , "PrefName" , "address" , "LineName" , "lat" , "lon" ] ;

		return ef.main
		(
			{ class : "FC  PM GX JC AC" } ,
			ef.h1 ( rc.StationName ) ,
			ef.ul
			(
				... ps.map ( e => ef.li ( "" + rc [ e ] ) )
			)
		) ;
	}

	function flist ( v : any ) : string []
	{
		const rt : string [] = [] ;
		if ( typeof v != "object" )  return rt ;
		Object.keys ( v ).map ( name => rt.push ( `${ name }` ) ) ;
		return rt ;
	}
}
