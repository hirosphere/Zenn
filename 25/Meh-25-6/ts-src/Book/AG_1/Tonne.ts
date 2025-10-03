import { Live , ef , pl , DD as dd , DOM as dom } from "../../Meh/Meh.js" ;

const log = console.log ;



namespace DM
{}




namespace VM
{
	export class App
	{
		public play () : void
		{
			;
		}
	}
}




export namespace VC
{
	const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	.FR { display : flex ;  flex-direction : row ; }
	.FC { display : flex ;  flex-direction : column ; }
	.OA { overflow : auto ; }
	.AC { align-items : center ; }
	.PGMM { padding : 1em ;  gap : 1em ; }
	.PGMX { padding : 1em ;  gap : 1ex ; }
	.PGXX { padding : 1ex ;  gap : 1ex ; }
	.TC { text-align : center ; }

	button { padding : 1ex 1em ; }
	
	` ;

	export function App () : dd.Node
	{
		const app = new VM.App () ;

		return ef.div
		(
			{ shadow : css } ,

			ef.main
			(
				{ class : "FC PGXX TC" } ,
				ef.h1 ( "Tonne" ) ,
				Pane ( app ) ,
			)
		) ;
	}

	function Pane ( app : VM.App ) : dd.Node
	{
		return ef.section
		(
			ef.button ( {  } , "鳴れ" ) ,
		) ;
	}

	/* */

	export function main () : void
	{
		dom.add ( App () , "body" ) ;
	}
}

