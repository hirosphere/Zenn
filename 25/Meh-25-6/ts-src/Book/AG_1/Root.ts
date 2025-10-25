import { Live , Ease , Renn , DD , ef , pl , IDB , } from "../../Meh/Meh.js" ;

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

			log ( "links" , i , this )
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

		protected async init ()
		{
			const filet = ( await DM.db.KV_STORE.get ( this.store_name ) ) ;
			const data = new DM.app ( filet ?.value ) ;

			log ( data ) ;

			const st = this.dm.$ = Ease ( data as DM.app ) ;
			st.add_ref ( { vChan : () => this.save () } ) ;
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
	
	main
	{
		padding : 1em ;
	}
	
	main , input , textarea , button  { color : hsl( 0  0%  16% ) ; }

	input
	{
		padding : 0.44ex  1ex ;
		font-family : Consolas ;
	}

	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }
	.PX { padding : 1ex ; }
	.GX { gap : 1ex ; }
	.GP { gap : 1px ; }

	.LINKS a
	{
		padding : 0.1ex 0.6ex ;
		text-decoration : none ;
		color : hsl( 0  0%  14% ) ;
	}

	.LINKS a:hover
	{
		background : hsl( 0  0%  30% / 10% ) ;
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
				ef.h1 ( "Root" ) ,
				pl.key ( app.dm , e => e && Links ( e.links ) )
			)
		) ;
	}

	export const Links = ( dm : DM.Links ) : DD.Node =>
	{
		return ef.section
		(
			{ class : "LINKS" } ,

			ef.section
			(
				ef.h3 ( Link ( dm ) ) ,
				ef.section
				(
					{  } ,
					Button ( "E" , () => {} ) ,
					Button ( "+P" , () => VM.add_part ( dm ) ) ,
				)
			) ,

			ef.section
			(
				{ class : "FC PX GP" } ,
				Input ( dm.title ) ,
				Input ( dm.url ) ,
			) ,

			ef.section
			(
				{ class : "PX" } ,
				pl.each ( dm.parts.renn , dm => Links ( dm ) ) ,
			) ,
		) ;
	}

	const Button = ( title : string , click : () => void ) =>
	{
		return ef.button ( { passive : { click } } , title ) ;
	}

	const Link = ( dm : DM.Links ) =>
	{
		const href = dm.url ;

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
}
