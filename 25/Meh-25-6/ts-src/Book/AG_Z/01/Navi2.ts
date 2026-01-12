import { Live , Renn , Key , DD , ef , pl , times , log } from "../../../Meh/Meh.js" ;
import * as common from "../../Common.js" ;
import * as eki from "../../../API/EkiIndex.js" ;

namespace VM
{
	export const create_qst = () : Navi =>
	{
		return new Navi ( qst ) ;
	}

	const qst_parts = () : static_parts => Object.fromEntries
	(
		times ( 10 , n => [ `${ n + 1 }` , { title : `Item ${ n + 1 }` } ] )
	) ;

	const qst_dyn_parts : dynamic_parts = async () => qst_parts () ;

	const qst : index =
	{
		title : "Root" ,
		parts : qst_parts () ,
	}

	/* Eki */

	export const eki_navi = ( datapath : string ) : Navi =>
	{
		return new Navi ( new eki.root ( datapath ) ) ;
	}

	/* */

	export class Navi
	{
		public readonly page = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly navi = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly path = new Path ;
		
		public readonly root : Index ;

		constructor ( i : index )
		{
			this.root = new Index ( i , "" , this , undefined ) ;

			Live.add_ref ( this.navi.key , { vChan : () => { this.path.index = this.navi.key.$ } } ) ;

			this.navi.key.$ = this.root ;
			this.page.key.$ = this.root ;
		}

		public peerSelect ( index ? : Index ) : void
		{
			this.navi.key.$ = index ;
		}
	}

	export class Path extends Renn < Index >
	{
		set index ( index : Index | undefined )
		{
			this.clear () ;
			index && this.insert ( index.path ) ;
		}
	}

	/* */

	export class Index
	{
		public readonly title : Live < string > ;
		public readonly parts = new Renn < Index > ;

		public readonly pagesel : Key.Match < Index | undefined > ;
		public readonly navisel : Key.Match < Index | undefined > ;

		protected partsmaked = false ;

		constructor
		(
			protected i : index ,
			public readonly name : string ,
			protected navi : Navi ,
			protected com : Index | undefined
		)
		{
			this.title = Live ( i.title ) ;

			this.pagesel = navi.page.match ( this ) ;
			this.navisel = navi.navi.match ( this ) ;

			if ( i.parts && typeof i.parts != "function" )
			{
				const parts = Object.entries ( i.parts ).map
				(
					( [ name , i ] ) => new Index ( i , name , navi , this )
				) ;

				this.parts.insert ( parts ) ;
			}
		}

		public exit () : void		/*    */
		{
			this.pagesel.select () ;

			log ( "path_select" , this.com ?.title.$ ) ;

			if ( this.com )  this.com.navisel.select () ;
			else             this.navisel.select () ;
		}

		public select () : void
		{
			this.pagesel.select () ;
		}

		public enter () : void		/*    */
		{
			this.pagesel.select () ;
			this.navisel.select () ;
		}

		public async make_dyn_parts () : Promise < void >
		{
			if ( this.partsmaked )  return ;

			if ( typeof this.i.parts != "function" ) return ;

			const parts = Object.entries ( await this.i.parts () ) .map
			(
				( [ name , i ] ) => new Index ( i , name , this.navi , this )
			) ;

			this.parts.insert ( parts ) ;
			this.partsmaked = true ;
		}

		/* */

		public get path () : Index []
		{
			const rt : Index [] = [] ;
			for ( let i : Index | undefined = this ;  i ;  i = i.com ) rt.unshift ( i ) ;
			return rt ;
		}
	}

	export type index =
	{
		title : string ;
		parts ? : parts ;
	}

	type parts = static_parts | dynamic_parts ;

	type dynamic_parts = () => Promise < static_parts > ;
	type static_parts = { [ name : string ] : index } ;
}

export namespace VC
{
	export const App = ( datapath : string ) : DD.Mel =>
	{
	//	const navi = VM.create_qst () ;
		const navi = VM.eki_navi ( datapath ) ;

		return ef.div
		(
			{ shadow : [ common.css , css ] } ,
			ef.div
			(
				{ class : [ "ROOT" ] } ,
				ef.aside
				(
					{ class : "SIDE" } ,
					Navi ( navi ) ,
				) ,
				pl.key
				(
					navi.page.key ,
					index => index && Content ( index )
				)
			) ,
		) ;
	}

	const Content = ( index : VM.Index ) : DD.Mel =>
	{
		return ef.main
		(
			{
				class : "CONTENT" ,
				style :
				{
					display : Live.trans_r ( index.pagesel , s => s ? "" : "none" )
				}
			} ,
			ef.h1 ( { class : "TC" } , index.title ) ,
		) ;
	}

	const Navi = ( vm : VM.Navi ) =>
	{
		return ef.nav
		(
			{ class : "NAVI" } ,
			Path ( vm.path ) ,
			ef.hr () ,
			Peers ( vm ) ,
		) ;
	}

	const Path = ( vm : VM.Path ) : DD.Mel =>
	{
		return ef.ul
		(
			{ class : "PATH" } ,
			pl.each
			(
				vm ,
				vm => ef.li ( PathIndex ( vm ) ) ,
			)
		) ;
	}

	const PathIndex = ( vm : VM.Index ) : DD.Mel =>
	{
		return ef.section
		(
			{ class : [ "INDEX" , { _SELECTED : vm.pagesel } ] , } ,
			ef.span ( { class : "_TITLE" , passive : { click : () => vm.exit () } } , vm.title ) ,
			// ef.span ( { class : "_THUMB" , passive : { click : () => vm.exit () } } , "^" ) ,
		) ;
	}

	const Peers = ( vm : VM.Navi ) : DD.Part =>
	{
		return ef.div
		(
			{ class : "PEER_FRAME" } ,
			pl.key ( vm.navi.key , index => index && Peer ( index ) )
		) ;
	}

	const Peer = ( vm : VM.Index ) : DD.Mel =>
	{
		const display = Live.trans_r ( vm.navisel , s => s ? "" : "none" ) ;

		vm.make_dyn_parts () ;

		return ef.div
		(
			{ class : "PEER" , style : { display } } ,
			ef.ul
			(
				pl.each
				(
					vm.parts ,
					vm => ef.li ( PeerIndex ( vm ) ) ,
				)
			)
		) ;
	}
	
	const PeerIndex = ( vm : VM.Index ) : DD.Mel =>
	{
		return ef.section
		(
			{ class : [ "INDEX" , { _SELECTED : vm.pagesel } ] } ,
			ef.div ( { class : "_TITLE" , passive : { click : () => vm.pagesel.select () } } , vm.title , ) ,
			ef.div ( { class : "_THUMB" , passive : { click : () => vm.enter () }} , ">" ) ,
		) ;
	}


	const css = /* CSS */ `

	.Q { border-left : 1ex solid black ; }

	:host
	{
		height : 100% ;
		color : hsl( 0  0%  10% ) ;
	}

	.ROOT
	{
		height : 100% ;
		display : grid ;
		grid-template-columns : auto  1fr ;

		overflow : hidden ;
		padding : 1ex ;
	}

	.SIDE
	{
		overflow : hidden ;

		height : 100% ;
		width : 230px ;
		background-color : hsl( 215  65%  100% ) ;

		display : flex ;
		flex-direction : column ;
	}

	.NAVI
	{
		overflow : hidden ;

		flex-grow : 1 ;
		cursor : default ;

		display : flex ;
		flex-direction : column ;

		padding-block : 1ex ;
		padding-inline : 1.0em  ;
		gap : 1em ;
	}

	.PATH
	{
		display : flex ;
		flex-direction : column ;

		list-style : none ;
		padding-left : 0 ;
	}

	.PEER_FRAME
	{
		overflow : hidden ;
		flex-grow : 1 ;
	}

	.PEER
	{
		height : 100% ;
		overflow : auto ;
		scrollbar-width : none ;
	}

	.PEER > ul
	{
		list-style : none ;
		padding-left : 0 ;
	}

	.INDEX
	{
		display : flex ;
		padding-inline : 0.5ex  0.5ex ;
		gap : 0.8ex ;
	}

	.INDEX._SELECTED
	{
		background : hsl( 0  0%  12% ) ;
		color : hsl( 0  0%  90% ) ;
	}

	.INDEX > ._TITLE
	{
		flex-grow : 1 ;
		padding-block : 1.2ex ;
		padding-inline : 1ex ;

		white-space : nowrap ;
		overflow : hidden ;
		text-align : center ;
	}

	.NAVI  .INDEX > ._THUMB
	{
		font-family : 'Consolas' , monospace ;
		padding : 1.3ex 1.6ex ;
	}

	.INDEX > ._THUMB:hover
	{
		background : hsl( 0  0%  50% / 10% ) ;
	}

	.CONTENT
	{
		padding : 1ex ;
	}
	
	
	` ;
}

