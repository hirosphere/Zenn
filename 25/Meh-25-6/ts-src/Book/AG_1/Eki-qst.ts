import { Live , Renn , Key , ef , pl , DD , DOM , log } from "../../Meh/Meh.js" ;
import { Eki } from "../../API/Eki.js" ;

const uned = undefined ;
type uned = undefined ;



/* Doc Model */

namespace DM
{
	export async function load ( data_path : string , onload : ( eki : Eki ) => void )
	{
		log ( data_path ) ;

		const eki = await Eki.make ( data_path ) ;
		onload ( eki ) ;
	} 
}


/* View Model */

namespace VM
{
	type Sel = Index | uned ;

	export class Index
	{
		public curr_part = new Key ( Live < Sel > ( uned ) ) ;

		public parts : Index [] ;
		public readonly selected ? : Key.Match < Sel > ;

		constructor
		(
			public readonly dm : Eki.Index ,
			agg ? : Index
		)
		{
			this.parts = dm.parts ?.map
			(
				part => new Index ( part , this )
			
			) ?? [] ;
			
			this.selected = agg?.curr_part.match ( this ) ;
		}
	}
}



/* View Component */

namespace VC
{
	const css = /* css */ `
	
	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }
	
	.FC { display : flex ; flex-direction : column ; }
	.FR { display : flex ; flex-direction : row ; }
	.PGMM { padding : 1em ; gap : 1em ; }
	.PGMX { padding : 1em ; gap : 1ex ; }
	.PGXX { padding : 1ex ; gap : 1ex ; }
	.OA { overflow : auto ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	:host
	{
		color : hsl( 0  0%  10% ) ;
	}

	main
	{
		height : 100% ;
		background-color : hsl( 176  55%  65% ) ;
		padding : 1em ; gap : 5em ;
	}


	.Index
	{
		width : 100% ;
		border : 0.05ex  solid  hsl( 45  5%  90% ) ;
		border-radius : 1.0em ;

		display : none ;

		padding : 0.4em ;
		gap : 1ex ;

		background : hsl( 176  0%  100% / 25% ) ;
	}

	.Index.Selected { display : flex ; }

	.Index.Root { font-size: 1.00em ; }
	.Index > .Index { font-size : 1.00em ; }


	ul.Tabs
	{
		cursor : default ;

		max-height : 55vh ;
		overflow : auto ;

		border : 1px solid hsl( 0  0%  75% ) ;
		border-radius : 1ex ;

		display : flex ;
		list-style : none ;
		gap: 0.4ex  0.1ex ;
		flex-wrap : wrap ;

		padding : 1em ;
		justify-content : center ;
	}

	li.Tab
	{
		background-color : hsl( 45  3%  96% ) ;
		border-bottom : 0.3ex  solid  hsl( 45  3%  80% ) ;
		padding : 1.2ex 1.36em ;
		white-space : nowrap ;
		color : hsl( 45  0%  13% ) ;
	}

	li.Tab:hover
	{
		background-color : hsl( 45  3%  94% ) ;
		border-color : hsl( 45  3%  70% ) ;
	}

	li.Selected ,
	li.Selected:hover
	{
		border-color : hsl( 96  50%  50% ) ;
		background-color : hsl( 45  3%  92% ) ;

		border-bottom-width : 0.5ex ;
		padding-bottom : 0.8ex ;
	}

	li.Selected:hover
	{
		background-color : hsl( 45  3%  90% ) ;
	}

	footer { padding-block : 30vh ; color: #fff ; }
	
	` ;

	export const App = ( dapapath : string ) :  DD.Node =>
	{
		const index = Live < VM.Index | uned > ( uned ) ;

		DM.load
		(
			dapapath ,
			eki =>
			{
				index.$ = new VM.Index ( eki.rootIndex ) ;
			}
		) ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC OA AC" } ,
				ef.h1 ( "Eki API" ) ,
				pl.key ( index , vm => vm ? Index ( vm , true ) : uned ) ,
				// pl.key ( index2 , vm => vm ? Index ( vm ) : uned ) ,
				// pl.key ( index3 , vm => vm ? Index ( vm ) : uned ) ,
				ef.footer ( "foot" ) ,
			)
		) ;
	}

	const Index = ( vm : VM.Index , isroot : boolean = false ) : DD.Node => ef.section
	(
		{ class : [ "Index FC AC" , { Selected : vm.selected ?? true , Root : isroot } ] } ,

		ef.h2 ( vm.dm.name ) ,
		vm.parts.length ? Tabs ( vm ) : uned ,
		pl.key
		(
			vm.curr_part.curr ,
			pvm => ( pvm ? Index( pvm ) : uned ) ,
		) ,
	) ;

	const Tabs = ( index : VM.Index ) => ef.ul
	(
		{ class : "Tabs" } ,
		... index.parts.map ( part => Tab ( part ) ) ,
	) ;

	const Tab = ( index : VM.Index ) => ef.li
	(
		{
			class : [ "Tab" , { Selected : index.selected ?? false } ] ,
			active :
			{
				click ( ev ) { index.selected ?.select () ; }
			}
		} ,
		index.dm.name
	) ;
}

export const EkiApp = VC.App ;
