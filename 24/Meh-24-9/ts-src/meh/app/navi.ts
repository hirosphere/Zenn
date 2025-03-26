import { log } from "../common.js";
import { leaf , set_value , Renn , ksel } from "../model/index.js";
import { MehElement , ef , defs } from "../dom/index.js" ;



export type navi =
{
	title : string ;
	create_root_index : navi.t.index | ( ( app : navi.Application ) => navi.Index ) ;
	
	index_to_url ? : ( index : navi.Index ) => string ;
	index_to_title ? : ( index : navi.Index ) => string ;

	url_to_index ? ( args : make_index_from_url_args ) : navi.Index | undefined ;
	url_to_path_array ? ( args : make_index_from_url_args ) : string [] ;
	
	containers ? : Record < string , navi.t.create_containner > ;
}

type make_index_from_url_args =
{
	path : string ,
	params : URLSearchParams ,
	root : navi.Index ,
	location : Location
}

export function navi ( i : navi )
{
	return new navi.Application ( i ) ;
}

export namespace navi
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
		export type create_containner = ( current : leaf.r < navi.t.index_key > ) => defs.element ;

		export type link = defs.ec < HTMLAnchorElement > &
		{
			index : Index ;
		};
	}
	
	
	export class Application
	{
		public readonly title ;
		public readonly root : Index ;
		public readonly current_index ;
		public readonly selector ;

		public readonly current_container = leaf < Container | undefined > ( undefined ) ;
		public readonly containers = new Map < t.container_key , Container > ;
	
		constructor ( protected i : navi )
		{
			this.title = leaf.str ( i.title ) ;
			this.root = ( typeof i.create_root_index == "function" && i.create_root_index ( this ) ) || new navi.Index ( this , null , i.create_root_index ) ;
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
				( this.i ?.url_to_path_array ?.( search_args ) ) ?? []
			)
				?? this.i ?.url_to_index ?. ( search_args )
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
				this.i.index_to_title ?.( index ) ??
				index.title.value + " - " + this.title.value
			)
			: this.title.value ;
		}
	
		public make_url_path ( index : Index ) : string
		{
			return this.i.index_to_url ?. ( index ) ?? "" ;
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
		public readonly path : Renn < Index > = new Renn ;

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
				},

				src_remove_orders : ( range ) =>
				{
					range.items.forEach ( o => this.p_part_list.delete ( o.target.name.value ) ) ;
				},
			} ;
			this.parts.add_ref ( ref ) ;

			this.container_type = i.container_type ?? "" ;
			this.update_path () ;
		}

		public part ( name : string ) : Index | undefined
		{
			return this.p_part_list.get ( name ) ;
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

			log ( "Fetch" , part_path .join ( "/" ) ) ;

			const part = this.p_part_list.get ( part_path [ 0 ] ) ;
			
			return part_path.length > 1 ?
				part ?.fetch_path_index ( part_path.slice ( 1 ) )
				: part ;
		}

		public async fetch_parts () {}

		/* */

		protected update_path ()
		{
			const path : Index [] = [ this ] ;
			for ( let i = this.com ; i ; i = i.com ) i && path.unshift ( i ) ;
			
			// log ( path.map ( i => i.title.value ) .join ( "/" ) ) ;

			this.path.new ( path ) ;
		}
	}



	/* */

	export function link ( arg : Index | t.link , ... content : defs.parts )
	{
		const index = ( arg instanceof navi.Index ? arg : arg.index ) ;
		const ec : defs.ec < HTMLAnchorElement > = ( arg instanceof navi.Index ? {} : arg )

		const click = ( ev : MouseEvent ) =>
		{
			index.sel_item.select () ;
			ev.preventDefault () ;
		}

		return ef.a
		(
			{
				... ec ,
				attrs : { href : index.link , ... ec.attrs } ,
				active_acts : { click , ... ec.active_acts }
			} ,
			... ( content.length ? content : [ index.title ] )
		) ;
	}
}
