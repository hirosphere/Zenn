import { log } from "../common.js";
import { leaf , set_value , Renn , ksel } from "./index.js";
import { MehElement , ef , defs } from "../dom/index.js" ;



export type app =
{
	title : string ;
	root : app.t.index | ( ( app : app.Application ) => app.Index ) ;
	
	make_title ? : ( index : app.Index ) => string ;
	make_index_from_url ? ( args : make_index_from_url_args ) : app.Index | undefined ;
	make_path_from_url ? ( args : make_index_from_url_args ) : string [] ;
	make_url_from_index ? : ( index : app.Index ) => string ;
	
	containers ? : Record < string , app.t.create_containner > ;
}

type make_index_from_url_args =
{
	path : string ,
	params : URLSearchParams ,
	root : app.Index ,
	location : Location
}

export function app ( i : app )
{
	return new app.Application ( i ) ;
}

export namespace app
{
	export namespace t
	{
		export type index < p extends Index = any > =
		{
			name : string ;
			type ? : index_type ;
			title ? : string ;
			parts ? : index < p > [];
			container_type ? : string ;
		};
		export type index_key = Index | undefined ;
		export type index_type = string ;

		export type container_key = string | undefined ;
		export type create_containner = ( current : leaf.r < app.t.index_key > ) => defs.element ;
	}
	
	
	export class Application
	{
		public readonly title ;
		public readonly root : Index ;
		public readonly current_index ;
		public readonly selector ;

		public readonly current_container = leaf < Container | undefined > ( undefined ) ;
		public readonly containers = new Map < t.container_key , Container > ;
	
		constructor ( protected i : app )
		{
			this.title = leaf.str ( i.title ) ;
			this.root = ( typeof i.root == "function" && i.root ( this ) ) || new app.Index ( this , null , i.root ) ;
			this.current_index = leaf < t.index_key> ( undefined ) ;
			this.current_index.add_ref ( { src_value_change : new_index => this.set_current ( new_index ) } ) ;
			this.selector = ksel < t.index_key > ( this.current_index ) ;
		}

		public async init ( default_index : Index = this.root )
		{
			const search_args : make_index_from_url_args =
			{
				root : this.root ,
				path : location.pathname ,
				params : new URLSearchParams ( location.search ) ,
				location ,
			} ;

			const index = await this.root.fetch_path_index
			(
				( this.i ?.make_path_from_url ?.( search_args ) ) ?? []
			)
				?? this.i ?.make_index_from_url ?. ( search_args )
			;

			this.set_current ( index ?? default_index ) ;
		}

		public set_current( index : Index | undefined )
		{
			this.current_index [ set_value ] ( index );

			const container = this.make_container ( index ?.type ) ;
			container.current_index [ set_value ] ( index ) ;
			this.current_container.value = container ;
			
			this.update_browser ( index ) ;
		}

		protected update_browser ( index : Index | undefined )
		{
			history.replaceState ( "" , "" , index?.link ) ;
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
			return this.i.make_url_from_index ?. ( index ) ?? "" ;
		}

		protected make_container ( key : t.container_key ) : Container
		{
			const container = this.containers.get ( key ) ;
			if ( container ) return container ;

			const def = this.i.containers ?. [ key ?? "" ] ;
			const new_container = new Container ( def ) ;
			this.containers.set ( key , new_container ) ;


			return new_container ;
		}
	}

	class Container
	{
		public readonly current_index = leaf.r < t.index_key > ( undefined ) ;

		constructor
		(
			public readonly def ? : t.create_containner
		)
		{
		}
	}
	

	export class Index
	{
		public readonly container_type : string ;
		public readonly type : t.index_type ; 
		public readonly name ;
		public readonly title ;
		public readonly parts : Renn < Index > ;

		protected p_part_list = new Map < string , Index > ;
	
		constructor
		(
			public readonly app : Application ,
			public readonly com : Index | null ,
			i : t.index
		)
		{
			this.type = i.type ?? "" ;
			this.name = leaf.str ( i.name );
			this.title = leaf.str ( i.title ?? "" );
			const parts = i.parts ?.map( pi => new Index ( app , this , pi ) );
			this.parts = new Renn ( parts );

			const ref : Renn.Ref < Index > =
			{
				src_add_orders : ( range ) =>
				{
					range.items.forEach ( o => this.p_part_list.set ( o.target.name.value , o.target ) ) ;

					this.p_part_list.size && log ( this.p_part_list.keys () ) ;
				},

				src_remove_orders : ( range ) =>
				{
					range.items.forEach ( o => this.p_part_list.delete ( o.target.name.value ) ) ;
				},
			} ;
			this.parts.add_ref ( ref ) ;

			this.container_type = i.container_type ?? "" ;
		}

		public get link () : string
		{
			return this.app.make_url_path ( this ) ;
		}

		public get sel_item () : ksel.Item < Index | undefined >
		{
			return this.app.selector.make_item ( this ) ;
		}

		public get url_path () : string []
		{
			return [ ... this.com ?.url_path ?? [] , encodeURIComponent ( this.name.value ) ]
		}

		public async fetch_path_index ( part_path : string [] ) : Promise < Index | undefined >
		{
			await this.fetch_parts () ;

			log ( "FETCH PATH INDEX" , part_path .join ( "/" ) ) ;

			const part = this.p_part_list.get ( part_path [ 0 ] ) ;
			
			return part_path.length > 1 ?
				part ?.fetch_path_index ( part_path.slice ( 1 ) )
				: part ;
		}

		public async fetch_parts () {}
	}

	export function link ( index : Index , ... content : defs.parts )
	{
		const click = ( ev : MouseEvent ) =>
		{
			index.sel_item.select () ;
			ev.preventDefault () ;
		}

		return ef.a
		(
			{
				attrs : { href : index.link } ,
				active_acts : { click }
			} ,
			... ( content.length ? content : [ index.title ] )
		) ;
	}
}
