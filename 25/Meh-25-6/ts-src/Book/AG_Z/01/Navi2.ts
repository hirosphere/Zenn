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
		public readonly curr_page = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly curr_peer = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly path = new Path ;
		
		public readonly root : Index ;

		constructor ( i : index )
		{
			this.root = new Index ( i , "" , this , undefined ) ;

			Live.add_ref ( this.curr_peer.key , { vChan : () => { this.path.index = this.curr_peer.key.$ ?.com } } ) ;

			this.curr_peer.key.$ = this.root ;
			this.curr_page.key.$ = this.root ;
		}

		public peerSelect ( index ? : Index ) : void
		{
			this.curr_peer.key.$ = index ;
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

		public readonly page_match : Key.Match < Index | undefined > ;
		public readonly navi_match : Key.Match < Index | undefined > ;

		protected parts_maked = false ;

		constructor
		(
			protected i : index ,
			public readonly name : string ,
			protected navi : Navi ,
			public readonly com : Index | undefined
		)
		{
			this.title = Live ( i.title ) ;

			this.page_match = navi.curr_page.match ( this ) ;
			this.navi_match = navi.curr_peer.match ( this ) ;

			if ( i.parts && typeof i.parts != "function" )
			{
				const parts = Object.entries ( i.parts ).map
				(
					( [ name , i ] ) => new Index ( i , name , navi , this )
				) ;

				this.parts.insert ( parts ) ;
			}
		}

		public select () : void
		{
			this.page_match.select () ;
		}

		public exit () : void
		{
			this.page_match.select () ;
			this.com ?.navi_match.select () ;
		}

		public move () : void
		{
			this.page_match.select () ;
			this.navi_match.select () ;
		}

		public async make_dyn_parts () : Promise < void >
		{
			if ( this.parts_maked )  return ;

			if ( typeof this.i.parts != "function" ) return ;

			const parts = Object.entries ( await this.i.parts () ) .map
			(
				( [ name , i ] ) => new Index ( i , name , this.navi , this )
			) ;

			this.parts.insert ( parts ) ;
			this.parts_maked = true ;
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
					navi.curr_page.key ,
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
					display : Live.trans_r ( index.page_match , s => s ? "" : "none" )
				}
			} ,
			ef.p ( { class : "TC" , style : { fontSize : "24px" , } } , index.title ) ,
		) ;
	}

	const Navi = ( vm : VM.Navi ) =>
	{
		return ef.nav
		(
			{ class : "NAVI" } ,
			Path ( vm.path ) ,
			PeerFrame ( vm ) ,
		) ;
	}

	const Path = ( vm : VM.Path ) : DD.Mel =>
	{
		return ef.ul
		(
			{ class : "PATH" } ,
			pl.each ( vm , vm => PathIndex ( vm ) ) ,
		) ;
	}

	const PathIndex = ( vm : VM.Index ) : DD.Mel => ef.li
	(
		{
			class : [ "INDEX" , { _SELECTED : vm.page_match ?? false } ] ,
			passive : { click : () => vm.move () }
		} ,
		ef.span ( { class : "_TITLE" } , vm.title ) ,
	) ;

	const PeerFrame = ( vm : VM.Navi ) : DD.Part =>
	{
		return ef.div
		(
			{ class : "PEER_FRAME" } ,
			pl.key ( vm.curr_peer.key , index => index && Peer ( index ) )
		) ;
	}

	const Peer = ( vm : VM.Index ) : DD.Mel =>
	{
		const display = Live.trans_r ( vm.navi_match , s => s ? "" : "none" ) ;

		vm.make_dyn_parts () ;

		return ef.section
		(
			{ class : "PEER" , style : { display } } ,
			ef.div
			(
				{ class : [ "INDEX" , { _SELECTED : vm.page_match } ] } ,
				ef.h3 ( { class : "_TITLE" , passive : { click : () => vm.select () } } , vm.title ) ,
				vm.com && ef.span
				(
					{ class : "_THUMB" , passive : { click : () => vm.exit () }} ,
					ef.span ( { class : "_MK" } , "^" )
				) ,
			) ,
			ef.ul
			(
				pl.each ( vm.parts , vm => PeerIndex ( vm ) , )
			)
		) ;
	}
	
	const PeerIndex = ( vm : VM.Index ) : DD.Mel =>
	{
		const hook :DD.Hook < HTMLSpanElement > =
		{
			init ( el )
			{
				log ( "init" , el.clientHeight )
			}
		}

		return ef.li
		(
			{ class : [ "INDEX" , { _SELECTED : vm.page_match } ] } ,
			ef.span ( { class : "_TITLE" , passive : { click : () => vm.select () } , hook } , vm.title , ) ,
			ef.span
			(
				{ class : "_THUMB" , passive : { click : () => vm.move () }} ,
				ef.span ( { class : "_MK" } , "v" ) ,
			)
		) ;
	}



	/* Style */

	const css = /* CSS */ `

	:host
	{
		height : 100% ;
		color : hsl( 0  0%  10% ) ;

		font-family : Noto Sans JP ;
	}

	.ROOT
	{
		height : 100% ;
		display : grid ;
		grid-template-columns : auto  1fr ;

		overflow : hidden ;
		padding : 0ex ;
	}

	.SIDE
	{
		overflow : hidden ;

		height : 100% ;
		width : 250px ;
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

		display : grid ;
		grid-template-rows : auto  auto  1fr ;
		gap : 1ex ;
	}

	.PEER > hr { margin-block : 0.6ex ; }
	.PEER > h3 { overflow : hidden ; }
	.PEER > ul
	{
		overflow : auto ;
		scrollbar-width : none ;

		padding : 0 ;
		list-style : none ;
	}

	.INDEX._SELECTED
	{
		background : hsl( 0  0%  12% ) ;
		color : hsl( 0  0%  90% ) ;
	}

	.INDEX > ._TITLE
	{
		flex-grow : 1 ;

		white-space : nowrap ;
		overflow : hidden ;
	}

	.INDEX > ._THUMB
	{
		display : flex ;
		padding : 0.3ex  0.3ex ;
		align-items : stretch ;
	}

	.INDEX > ._THUMB > ._MK
	{
		background : hsl( 55  5%  95% / 80% ) ;
		padding-inline : 1.2ex ;

		display : flex ;
		align-items : center ;
		font-family : 'Consolas' , monospace ;
		color : hsl( 0  0%  40% ) ;

	}

	.PATH .INDEX
	{
		padding-block : 0.8ex ;
		text-align : center ;
	}

	.PATH ._TITLE
	{
		border-bottom : 1px  dotted  hsl( 0  0%  50% ) ;

		padding-block : 0.1ex ;
		padding-inline : 0.7ex ;
		text-align : center ;
	}

	.PATH ._TITLE > span
	{
	}

	.PEER .INDEX
	{
		border-bottom : 1px  dotted  hsl( 0  0%  50% ) ;

		display : flex ;
		gap : 0.1ex ;
	}

	.PEER ._TITLE
	{
		width : 6em ;

		padding-block : 1.10ex ;
		padding-inline : 1ex  0.7ex ;
		overflow : hidden ;
		
		white-space : nowrap ;
		text-overflow : ellipse ;
		text-align : center ;
	}

	.CONTENT
	{
		padding : 1ex ;
	}
	
	
	` ;
}

