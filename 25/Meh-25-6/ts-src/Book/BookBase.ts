import { Live , Renn , Key , ef , pl , DD } from "../Meh/Meh.js" ;

const log = console.log ;


export interface app_constants
{
	readonly dataPath : string ;
	readonly commonCSS : css ;
} ;

type css = string | CSSStyleDeclaration ;

export namespace VM
{
	/* Navi */

	export class Navi
	{
		public readonly page = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly root : Index ;

		constructor ( iv : index , private client : NaviClient )
		{
			this.root = new Index ( this , iv ) ;
			this.page.key.add_ref
			(
				{ vChan : ( { changer } ) => changer != this && this.on_page_changed () }
			) ;
		}

		public async initiate ( defaultIndex : Index  = this.root ) : Promise < void >
		{
			const path = location.pathname ;
			const query = Object.fromEntries ( new URLSearchParams ( location.search ) ) ;

			const index = await this.client.index_url ( path , query ) ;
			index ?.open_macro_index () ;
			index ?.ScrollTo ?.() ;

			this.page.key.set ( index ?? defaultIndex , this ) ;
		}

		public make_url ( index : Index ) : string
		{
			return this.client.url_index ( index ) ;
		}

		/*  */

		private on_page_changed () : void
		{
			const index = this.page.key.$ ;
			const url = index ? this.client.url_index ( index ) : "" ;
			this.client.browser_update ?.( url ) ;
		}
	}

	export interface NaviClient
	{
		index_url ( path : string , query : Record < string , string > ) : Promise < Index | undefined > ;
		url_index ( index : Index ) : string ;
		browser_update ? ( url : string ) : void ;
	}	


	/* Index */

	export type index =
	{
		type ? : string ;
		title : string ;
		cont ? : any ;
		page ? : page ;
		open ? : boolean ;
		parts ? : u_parts ;
	}

	export type page = string | DD.Node | ( ( index : index ) => DD.Mel < any > ) ;
	export type parts = { [ name : string ] : index } ;
	export type u_parts = parts | ( ( index : index ) => Promise < parts > ) ;


	export class Index
	{
		public readonly type : string ;
		public readonly name : Live.str ;
		public readonly title : Live.str ;
		public readonly parts : Renn < Index > ;

		public readonly url : Live.R.str ;
		public readonly selected : Key.Match < Index | undefined > ;
		public readonly has_parts : Live.R.bool ;
		public readonly open : Live.bool ;
		public readonly thumb : Live.R.str ;

		public get cont () : any { return this.i.cont ; }

		public ScrollTo ? ( option ? : ScrollIntoViewOptions ) : void ;

		constructor
		(
			public readonly navi : Navi ,
			public readonly i : index ,
			public readonly com ? : Index ,
			name ? : string
		)
		{
			this.type = i.type ?? "" ;
			this.title = Live ( i.title ) ;
			this.name = Live ( name ?? "" ) ;
			this.url = Live ( navi.make_url ( this ) ) ;

			this.selected = navi.page.match ( this ) ;
			this.open = Live ( i.open ?? false ) ;

			const parts = typeof i.parts == "function" ? undefined : i.parts ;
			this.parts = new Renn ( this.make_parts ( parts ) ) ;

			this.has_parts = this.parts.length.trans_r
			(
				length => length > 0 ||
				typeof i.parts == "function"
			) ;

			this.open.add_ref ( { vChan : () => this.open.$ && this.make_dyn_parts () } ) ;
			
			this.thumb = this.open.trans_r ( state => this.has_parts.$ ? ( state ? "*" : ">"  ) : "" ) ;
		}

		public toggle_open () : void
		{
			this.open.$ = this.has_parts.$ && ! this.open.$
		}

		public open_macro_index () : void
		{
			this.com ?.open.set ( true ) ;
			this.com ?.open_macro_index () ;
		}

		public async FromPath ( path : string [] ) : Promise < Index | undefined >
		{
			if ( path.length == 0 )  return ;
			const name = path [ 0 ] ;
			
			await this.make_dyn_parts () ;
			
			const part = this.parts_by_name.get ( name ) ;
			return await part ?.FromPath ( path.slice ( 1 ) ) ?? part ;
		}

		public get path () : Index []
		{
			return this.com ? [ ... this.com.path , this ] : [ this ] ;
		}

		/* */

		private async make_dyn_parts () : Promise < void >
		{
			const fn = this.i.parts ;

			if ( this.dyn_parts_created )  return ;
			if ( ! fn || typeof fn != "function" )  return ;

			const set = ( parts : parts ) : void =>
			{
				this.parts.insert ( this.make_parts ( parts ) ) ;
				this.dyn_parts_created = true ;
				log ( "make_dyn_parts" , this.title.$ , this.parts.length.$ ) ;
			}

			const parts = await fn ( this.i ) ;
			this.parts.insert ( this.make_parts ( parts ) ) ;
			this.dyn_parts_created = true ;

			log ( "make_dyn_parts ***" ) ;
		}

		private make_parts ( i ? : parts ) : Index []
		{
			return  Object.entries ( i ?? {} ) .map
			(
				( [ name , i ] ) =>
				{
					const index = new Index ( this.navi , i , this , name ) ;
					this.parts_by_name.set ( name , index ) ;
					return index ;
				}
			) ;
		}

		/* */

		private parts_by_name = new Map < string , Index > ;
		private dyn_parts_created = false ;
	}

}


export namespace VC
{
	export const Index = ( vm : VM.Index ) : DD.Node =>
	{
		return ef.section
		(
			{ class : [ "NAVI_INDEX" ] } ,
			Head ( vm ) ,
			Parts ( vm ) ,
		) ;
	}

	const Head = ( vm : VM.Index ) : DD.Node =>
	{
		const click = ( ev : MouseEvent ) : void =>
		{
			vm.selected.select () ;
			ev.stopPropagation () ;
			ev.preventDefault () ;
		} ;

		const dblclick = ( ev : MouseEvent ) : void =>
		{
			ev.preventDefault () ;
			ev.stopPropagation () ;
		} 

		const init = ( el : HTMLElement ) : void =>
		{
			vm.ScrollTo = ( option ) => el.scrollIntoView
			(
				{ behavior : "instant" , block : "center" , inline : "center" , ... option }
			) ;
		}

		return ef.div
		(
			{
				class : [ "INDEX_HEAD" , { _SELECTED : vm.selected } ] ,
				// attrs : { href : vm.url } ,
				active : { click , dblclick } ,
				hook : { init } ,
			} ,
			ef.span ( { class : "INDEX_TITLE" } , vm.title ) ,
			Thumb ( vm ) ,
		) ;
	}

	const Thumb = ( vm : VM.Index ) : DD.Node =>
	{
		const click = ( ev : MouseEvent ) : void =>
		{
			vm.toggle_open () ;
			ev.preventDefault () ;
			ev.stopPropagation () ;
		} ;
		
		const _HAS_PARTS = vm.has_parts ;

		return ef.span
		(
			{
				class : [ "INDEX_THUMB" , { _HAS_PARTS  } ] ,
				active : { click } ,
			} ,
			vm.thumb ,
		)
	} ;

	const Parts = ( vm : VM.Index ) : DD.Node =>
	{
		function dblclick ( ev : MouseEvent ) : void
		{
			vm.ScrollTo ?. (  ) ;
			cancel ( ev ) ;
		}
		
		function cancel ( ev : MouseEvent ) : void
		{
			ev.stopPropagation () ;
			ev.preventDefault () ;
		}
		
		return ef.section
		(
			{
				class : [ "INDEX_PARTS" , { _OPEN : vm.open } ] ,
				active : { dblclick , mousedown : cancel , mouseup : cancel } ,
			} ,
			pl.key
			(
				vm.open ,
				state => state && ef.ul
				(
					pl.each ( vm.parts , pvm => ef.li ( Index ( pvm ) ) ) ,
				) ,
			) ,
		)
	}
}

