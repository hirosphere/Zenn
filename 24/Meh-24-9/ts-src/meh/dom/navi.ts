import { log } from "../common.js";
import { leaf , set_value , Renn , ksel } from "../model/index.js";
import { ef } from "../dom/index.js" ;



export type navi =
{
	title : string ;
	root : navi.t.index ;
	make_title ? : ( index : navi.Index ) => string ;
	make_url_path ? : ( index : navi.Index ) => string ;
}

export function navi ( i : navi )
{
	return new navi.Navi ( i ) ;
}

export namespace navi
{
	export namespace t
	{
		export type application =
		{
			title : string ;
		}
	
		export type index < p extends Index = any > =
		{
			name : string ;
			title ? : string ;
			parts ? : index < p > [];
		};
	}
	
	
	export class Navi
	{
		public readonly title ;
		public readonly root : Index ;
		public readonly currentIndex ;
		public readonly selector ;
	
		constructor ( protected i : navi )
		{
			this.title = leaf.str ( i.title ) ;
			this.root = new navi.Index ( this , i.root ) ;
			this.currentIndex = leaf < Index | undefined > ( undefined ) ;
			this.selector = ksel < Index | undefined > ( this.currentIndex ) ;
		}
	
		public set_current( index : Index | undefined )
		{
			this.currentIndex [ set_value ] ( index );
			history.replaceState ( "" , "" , index?.url_path ) ;
			document.title = this.make_title ( index ) ;
		}
	
		public make_title( index ? : Index ) : string
		{

			return index ?
			(
				this.i.make_title ?.( index ) ??
				index.title.value + " - " + this.title.value
			)
			: this.title.value ;
		}
	
		public make_url_path ( index : Index ) : string
		{
			return this.i.make_url_path ?. ( index ) ?? "" ;
		}
	}
	

	export class Index
	{
		public readonly name ;
		public readonly title ;
		public readonly parts : Renn < Index >;
	
		constructor( public readonly navi : Navi , v : t.index )
		{
			this.name = leaf.str ( v.name );
			this.title = leaf.str ( v.title ?? "" );	
			const parts = v.parts?.map( v => new Index ( navi , v ) );
			this.parts = new Renn ( parts );
		}

		public get url_path ()
		{
			return this.navi.make_url_path ( this ) ;
		}

		public make_selector ()
		{
			return new Selector ( this ) ;
		}
	}

	export class Selector
	{
		public readonly selected ;

		constructor ( public readonly index : Index , navi ? : Navi )
		{
			this.selected = ( navi ?? index.navi ).selector .make_item ( index ) ;
		}

		public select ()
		{
			this.index.navi.set_current ( this.index ) ;
		}
	}
	
	export function link ( selector : Selector )
	{
		const click = ( ev : MouseEvent ) =>
		{
			selector.select () ;
			ev.preventDefault () ;
		}

		return ef.a
		(
			{
				attrs : { href : selector.index.url_path } ,
				active_acts : { click }
			} ,
			selector.index.name ,
		) ;
	}
}
