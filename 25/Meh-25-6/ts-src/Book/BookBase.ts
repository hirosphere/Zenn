import { Live , Renn , Key , ef , pl , DD } from "../Meh/Meh.js" ;

const log = console.log ;

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

			const index = await this.client.urlToIndex ( path , query ) ;
			index ?.open_macro_index () ;

			this.page.key.set ( index ?? defaultIndex , this ) ;
		}

		public make_url ( index : Index ) : string
		{
			return this.client.indexToURL ( index ) ;
		}

		/*  */

		private on_page_changed () : void
		{
			const index = this.page.key.$ ;
			const url = index ? this.client.indexToURL ( index ) : "" ;
			this.client.updateBrowserURL ?.( url ) ;
		}
	}

	export interface NaviClient
	{
		urlToIndex ( path : string , query : Record < string , string > ) : Promise < Index | undefined > ;
		indexToURL ( index : Index ) : string ;
		updateBrowserURL ? ( url : string ) : void ;
	}	


	/* Index */

	export type index =
	{
		type ? : string ;
		title : string ;
		open ? : boolean ;
		parts ? : parts ;
		dyn_parts ? : ( index : index ) => parts ;
	}

	export type parts = { [ name : string ] : index } ;

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

		constructor
		(
			public readonly navi : Navi ,
			private i : index ,
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

			this.parts = new Renn ( this.make_parts ( i.parts ) ) ;

			this.has_parts = this.parts.length.trans_r
			(
				length => length > 0 ||
				i.dyn_parts != undefined
			) ;

			this.open.add_ref ( { vChan : () => this.open.$ && this.make_dyn_parts () } ) ;
			
			this.thumb = this.open.trans_r ( state => this.has_parts.$ ? ( state ? ">" : "*"  ) : "" ) ;
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

		public async from_path ( path : string [] ) : Promise < Index | undefined >
		{
			if ( path.length == 0 )  return ;
			const name = path [ 0 ] ;
			
			await this.make_dyn_parts () ;
			log ( this.title.$ , this.parts.length.$ )
			
			const part = this.parts_by_name.get ( name ) ;
			return await part ?.from_path ( path.slice ( 1 ) ) ?? part ;
		}

		public get path () : Index []
		{
			return this.com ? [ ... this.com.path , this ] : [ this ] ;
		}

		/* */

		private async make_dyn_parts () : Promise < void >
		{
			const dyn_parts = this.i.dyn_parts ;

			if ( ! dyn_parts )  return ;
			if ( this.dyn_parts_created )  return ;

			log ( "make_dyn_parts" ) ;

			this.parts.insert ( this.make_parts ( dyn_parts ( this.i ) ) ) ;
			this.dyn_parts_created = true ;

			log ( this.parts.length.$ ) ;
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
		const click = ( ev : MouseEvent ) =>
		{
			vm.selected.select () ;
			ev.preventDefault () ;
		} ;

		const init = ( el : HTMLElement ) : void =>
		{
			const vChan = () =>
			{
				vm.selected.$ && el.scrollIntoView ( { behavior : "auto" , block : "center" } ) ;
			}
			vm.selected.add_ref ( { vChan } ) ;
		}

		return ef.a
		(
			{
				class : [ "INDEX_HEAD  _LINK" , { _SELECTED : vm.selected } ] ,
				attrs : { href : vm.url } ,
				active : { click } ,
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

	const Parts = ( vm : VM.Index ) : DD.Node => ef.section
	(
		{ class : [ "INDEX_PARTS" , { _OPEN : vm.open } ] } ,
		ef.ul
		(
			pl.each ( vm.parts , pvm => ef.li ( Index ( pvm ) ) ) ,
		) ,
	) ;
}

