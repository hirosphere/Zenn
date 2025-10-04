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

		const eki = await Eki.create ( data_path ) ;
		onload ( eki ) ;
	} 
}


/* View Model */

namespace VM
{
	type Sel = Index | uned ;

	export class Index extends Key < Sel >
	{
		public parts : Index [] ;
		public readonly selected ? : Key.Match < Sel > ;

		constructor
		(
			public readonly dm : Eki.Index ,
			agg ? : Index
		)
		{
			super ( Live < Sel > ( uned ) ) ;
			this.parts = dm.parts ?.map
			(
				part => new Index ( part , this )
			
			) ?? [] ;
			
			this.selected = agg?.get_item ( this ) ;
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
		color : hsl( 0  0%  7% ) ;
	}

	main { padding : 1em ; gap : 5em ; }


	.Index
	{
		width : 100% ;
		border : 0.1ex  solid  hsl( 45  5%  60% ) ;
		border-radius : 1.2em ;

		display : none ;

		padding : 0.6em ;
		gap : 1em ;
	}

	.Index.Selected { display : flex ; }

	.Index.Root { font-size: 1.1em ; }
	.Index > .Index { font-size : 0.90em ; }


	ul.Tabs
	{
		cursor : default ;

		max-height : 14em ;
		overflow : auto ;

		display : flex ;
		list-style : none ;
		gap: 0.4ex  0.1ex ;
		flex-wrap : wrap ;
		justify-content : center ;
	}

	li.Tab
	{
		background-color : hsl( 45  3%  96% ) ;
		border-bottom : 0.3ex  solid  hsl( 45  3%  80% ) ;
		padding : 1.2ex 1.36em ;
		white-space : nowrap ;
	}

	li.Tab:hover
	{
		background-color : hsl( 45  3%  92% ) ;
		border-color : hsl( 45  3%  70% ) ;
	}

	li.Selected , li.Selected:hover
	{
		border-color : hsl( 96  50%  50% ) ;
		/* background-color : hsl( 45  3%  14% ) ;

		color : hsl( 0  0  100% ) ; */
	
		border-bottom-width : 0.5ex ;
		padding-bottom : 0.8ex ;
	}

	footer { height : 20em ; }
	
	` ;

	export const App = ( dapapath : string ) :  DD.Node =>
	{
		const index = Live < VM.Index | uned > ( uned ) ;
		const index2 = Live < VM.Index | uned > ( uned ) ;
		const index3 = Live < VM.Index | uned > ( uned ) ;

		DM.load
		(
			dapapath ,
			( eki ) =>
			{
				index3.$ = new VM.Index ( eki.rootIndex ) ;
				index2.$ = new VM.Index ( eki.rootIndex ) ;
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
				ef.footer () ,
			)
		) ;
	}

	const Index = ( vm : VM.Index , isroot : boolean = false ) : DD.Node => ef.section
	(
		{ class : [ "Index FC AC" , { Selected : vm.selected ?? true , Root : isroot } ] } ,

		ef.h2 ( vm.dm.name ) ,
		Tabs ( vm ) ,
		pl.key
		(
			vm.current ,
			index => ( index ? Index( index ) : uned ) ,
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

	export const TabsSwitch = ( index : VM.Index ) => ef.section
	(
		{ class : "TabsSwitch" } ,
		pl.key
		(
			index.current ,
			part => part?.dm.name ?? "-.."
		) ,
	) ;
}

export const EkiApp = VC.App ;
