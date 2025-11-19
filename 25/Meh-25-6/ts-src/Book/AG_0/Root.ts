import { Live , Ease , Renn , Order , DD , ef , pl , IDB , } from "../../Meh/Meh.js" ;

const log = console.log ;
const uned = undefined ;
type uned = undefined ;


export namespace DM
{
	export class app
	{
		text : string ;
		links : links ;
		shapes : shape []

		constructor ( i : Partial < app > )
		{
			this.text = i ?.text ?? "class {} 埼京 !!" ;

			this.links = new links ( i ?.links ) ;

			this.shapes = i ?.shapes ?.map ( e => new shape ( e ) )  ?? [] ;
		}
	}


	/* */

	export type Links = Ease < links > ;

	export class links
	{
		title : string ;
		url   : string ;
		parts : links [] ;

		constructor ( i ? : Partial < links > )
		{
			this.title = i ?.title ??  "リンク" ;
			this.url   = i ?.url   ??  "" ;

			this.parts = i ?.parts ?.map ( e => new links ( e ) ) ?? [] ;
		}
	}



	/* */

	export class shape
	{
		pos : xy ;
		size : xy ;
		color : hsl ;

		constructor ( i ? : Partial < shape > )
		{
			this.pos   = new xy  ( i ?.pos ) ;
			this.size  = new xy  ( i ?.size ) ;
			this.color = new hsl ( i ?.color ) ;
		}
	} ;

	export class hsl
	{
		hue : number ;
		sat : number ;
		light : number ;

		constructor ( i ? : Partial < hsl > )
		{
			this.hue   = i ?.hue   ??  90 ;
			this.sat   = i ?.sat   ??  0.65 ;
			this.light = i ?.light ??  0.65 ;
		}
	}

	class xy
	{
		x : number ;
		y : number ;

		constructor ( i ? : Partial < xy > )
		{
			this.x = i ?.x  ?? 0 ;
			this.y = i ?.y  ?? 0 ;
		}
	}


	/* */

	export type kv_store =
	{
		key : string ;
		value : any ;
	} ;

	export const db = new class extends IDB
	{
		public KV_STORE ;
		constructor ()
		{
			super ( { name : "IDB_Q25_1025" , version : 100 } ) ;
			this.KV_STORE = new IDB.Store < kv_store , "key" , string > ( this , "KV_STORE" , { keyPath : "key" } ) ;
			this.init () ;
		}
	}
}

export namespace VM
{
	export class App
	{
		public dm = Live < Ease < DM.app > | uned > ( uned ) ;
		public store_name = "MAIN" as const ;

		public json = Live ( "" ) ;

		constructor ()
		{
			DM.db.inits = () => this.init () ;
		}

		public async save () : Promise < void >
		{
			const s = this.dm.$ ;
			if ( ! s )  return ;

			const filet = { key : this.store_name, value : s.$ } ;
			const res = await DM.db.KV_STORE.set ( filet ) ;

			log ( "App save" , res ) ;
		}

		public make_json () : void
		{
			this.json.$ = JSON.stringify ( this.dm.$ ?.$ , null , "\t" ) ;
		}

		protected async init ()
		{
			const filet = ( await DM.db.KV_STORE.get ( this.store_name ) ) ;
			const data = filet ?.value as Partial < DM.app > ;

			log ( "Root init" , data ) ;

			const st = this.dm.$ = Ease.fromPartial ( data , DM.app ) ;
			st.add_ref ( { vChan : ( { initial } ) => ! initial && this.save () } ) ;
		}
	}

	export function add_part ( dm : DM.Links ) : void
	{
		dm.parts.insert ( [ { title : "リンク" , url : "" , parts : [] } ] ) ;
	}
}

export namespace VC
{
	const css = /* css */ `

	* { box-sizing : bourder-box ; margin : 0 ; padding : 0 ; }

	:host
	{
		height : 100% ;
		background : white ;
		overflow : auto ;
	}
	
	main
	{
		padding : 2em 1em ;
	}
	
	main , input , textarea , button  { color : hsl( 0  0%  16% ) ; }

	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }

	.PX { padding : 1ex ; }
	
	.AC { align-items : center ; }
	.AS { align-items : stretch ; }
	
	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }
	.GP { gap : 1px ; }

	.LINKS_FRAME
	{
		width : min( 95% , 60em ) ;
	}

	.LINKS
	{
	}

	.LINKS > ._HEAD
	{
		background : hsl( 210  10%  50% / 0% ) ;
		border-bottom : 0.1ex  dotted  hsl( 0  0%  80% ) ;
		padding : 0 ;
	}

	.LINKS > ._HEAD > ._THUMB
	{
		padding-block : 0.4em ;
		gap : 0.33ex ;
	}

	.LINKS a
	{
		display : block ;
		padding : 0.5ex 0.8ex ;
		text-decoration : none ;
		color : hsl( 0  0%  14% ) ;
	}

	.LINKS a[href]:hover
	{
		background : hsl( 0  0%  30% / 10% ) ;
	}

	.LINKS button
	{
		border-radius : 0.4ex ;
		border : 1px solid hsl( 0  0%  50% ) ;
		min-width : 2em ;
		padding-inline : 1ex ;
		font-family : Consolas  monospace ;
	}

	.LINKS > ._EDIT
	{
		margin : 1ex ;
		display : none ;
		max-width : 50em ;
		border-radius : 0.66ex ;
		border : 0.1ex  solid  hsl( 0  0%  70% ) ;
		background-color : hsl( 49  5%  97% ) ;
		padding : 2ex 1.7ex ;
		gap : 0.3ex  ;
	}

	.LINKS > ._EDIT._SHOW
	{
		display : flex ;
	}

	.LINKS > ._EDIT  input
	{
		border-radius : 0.7ex ;
		border : 0.1ex  solid  hsl( 0  0%  70% ) ;
		font-size : 1.0em ;
		padding : 0.44ex  1ex ;
		font-family : Consolas ;
	}

	.LINKS > ._PARTS:not(:empty)
	{
		margin-left : 0.1ex ;
		border-left : 0.2ex  solid  hsl( 0  0%  70% ) ;
		border-right : 0.1ex  solid  hsl( 0  0%  95% ) ;
		padding-block : 0.0ex ;
		padding-inline : 3%  2% ;
	}

	textarea
	{
		line-height : 1.3 ;
		font-size : 0.96rem ;
		font-family : "Consolas" ;
		tab-size : 4ex ;
		color : hsl( 0  0%  20% ) ;
	}

	button { padding : 1ex  1.2em ; }
	.LINKS button { padding : 0ex  0.5ex ; }

	footer
	{
		height : 60vh ;
	}

	`;

	export const App = () : DD.Node =>
	{
		const app = new VM.App ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "FC GM AS" } ,
				ef.section
				(
					{ class : "LINKS_FRAME  FC" } ,
					pl.key ( app.dm , e => e && Links ( e.links ) ) ,
				) ,
				ef.footer
				(
					JSONPane ( app ) ,
				) ,
			)
		) ;
	}

	export const Links = ( dm : DM.Links , o ? : Order < any > ) : DD.Node =>
	{
		const edit_show = Live ( false ) ;

		return ef.section
		(
			{ class : "LINKS  FC" } ,

			ef.section
			(
				{ class : " _HEAD   FR AC GX" } ,
				ef.p ( { style : { flexGrow : "1" } } , Link ( dm ) ) ,

				ef.section
				(
					{ class : "_THUMB  FR AS" } ,
					Button ( "Edit" , () => edit_show.$ = ! edit_show.$ ) ,
					Button ( "+P" , () => VM.add_part ( dm ) ) ,
					o && Button ( "X" , () => { if ( confirm ( dm.title.$ + " を消去します。" ) ) o?.delete () ; } ) ,
				)
			) ,

			ef.section
			(
				{ class : [ "_EDIT  PX GP" , { FC : edit_show , _SHOW : edit_show } ] } ,
				Input ( dm.title ) ,
				Input ( dm.url ) ,
			) ,

			ef.section
			(
				{ class : "_PARTS" } ,
				pl.each ( dm.parts.renn , ( dm , o ) => Links ( dm , o ) ) ,
			) ,
		) ;
	}

	const Button = ( title : string , click : () => void ) =>
	{
		return ef.button ( { passive : { click } } , title ) ;
	}

	const Link = ( dm : DM.Links ) =>
	{
		const href = dm.url.trans_r ( url => url.length ? url : undefined ) ;

		return ef.a
		(
			{ attrs : { href , target : "_blank" } } ,
			dm.title ,
		) ;
	}

	const Input = ( s : Live.str ) => ef.input
	(
		{ class : "" , biBind : { vChan : s } }
	) ;

	const JSONPane = ( vm : VM.App ) : DD.Mel => ef.section
	(
		{ class : "FC PX GX" } ,
		ef.section
		(
			ef.button ( { passive : { click : () => vm.make_json () } } , "JSON" ) ,
		) ,
		ef.textarea
		(
			{ style : { display : "block" , height : "30em" } , biBind : { vChan : vm.json } }
		) ,
	) ;
}
