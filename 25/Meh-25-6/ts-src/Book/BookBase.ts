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
			this.page.key.add_ref ( { vChan : ch => ch != this && this.on_page_changed () } ) ;
		}

		public initiate ( defaultIndex : Index  = this.root ) : void
		{
			const path = location.pathname ;
			const query = Object.fromEntries ( new URLSearchParams ( location.search ) ) ;

			const index = this.client.urlToIndex ( path , query )

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

	export type NaviClient =
	{
		urlToIndex ( path : string , query : Record < string , string > ) : Index | undefined ;
		indexToURL ( index : Index ) : string ;
		updateBrowserURL ? ( url : string ) : void ;
	}


	/* Index */

	export type index =
	{
		type ? : string ;
		title : string ;
		open ? : boolean ;
		parts ? : { [ name : string ] : index }
	}

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
			navi : Navi ,
			i : index ,
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

			const parts = Object.entries
			(
				i.parts ?? {} ) .map ( ( [ name , i ] ) =>
				{
					const index = new Index ( navi , i , this , name ) ;
					this.parts_by_name.set ( name , index ) ;
					return index ;
				}
			) ;
			this.parts = new Renn ( parts ) ;

			this.has_parts = this.parts.length.trans_r ( length => length > 0 ) ;
			this.thumb = this.open.trans_r ( state => this.has_parts.$ ? ( state ? ">" : "*"  ) : "" ) ;
		}

		public toggle_open () : void
		{
			this.open.$ = this.has_parts.$ && ! this.open.$
		}

		public from_path ( path : string [] ) : Index | undefined
		{
			if ( path.length == 0 )  return ;
			const name = path [ 0 ] ;
			const part = this.parts_by_name.get ( name ) ;
			return part ?.from_path ( path.slice ( 1 ) ) ?? part ;
		}

		public get path () : Index []
		{
			return this.com ? [ ... this.com.path , this ] : [ this ] ;
		}

		/* */

		private parts_by_name = new Map < string , Index > ;
	}

}


export namespace VC
{
	export const Index = ( vm : VM.Index ) : DD.Node =>
	{
		return ef.section
		(
			{ class : [ "INDEX" ] } ,
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

		return ef.a
		(
			{
				class : [ "INDEX_HEAD  _LINK" , { _SELECTED : vm.selected } ] ,
				attrs : { href : vm.url } ,
				active : { click }
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

		return ef.span
		(
			{
				class : [ "INDEX_THUMB" , { _HAS_PARTS : vm.has_parts } ] ,
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

