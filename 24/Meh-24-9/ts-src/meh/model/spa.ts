import { log } from "../common.js";
import { leaf , set_value , Renn , ksel } from "./index.js";
import { MehElement , ef , defs } from "../dom/index.js" ;



export type spa =
{
	title : string ;
	root : spa.t.index | ( ( app : spa.Application ) => spa.Index ) ;
	make_title ? : ( index : spa.Index ) => string ;
	make_url_path ? : ( index : spa.Index ) => string ;
	containers ? : Record < string , spa.t.create_containner > ;
}

export function spa ( i : spa )
{
	return new spa.Application ( i ) ;
}

export namespace spa
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
			type ? : index_type ;
			title ? : string ;
			parts ? : index < p > [];
			container_type ? : string ;
		};
		export type index_key = Index | undefined ;
		export type index_type = string ;

		export type container_key = string | undefined ;
		export type create_containner = ( current : leaf.r < spa.t.index_key > ) => defs.element ;
	}
	
	
	export class Application
	{
		public readonly title ;
		public readonly root : Index ;
		public readonly current_index ;
		public readonly selector ;

		public readonly current_container = leaf < Container | undefined > ( undefined ) ;
		public readonly containers = new Map < t.container_key , Container > ;
	
		constructor ( protected i : spa )
		{
			this.title = leaf.str ( i.title ) ;
			this.root = ( typeof i.root == "function" && i.root ( this ) ) || new spa.Index ( this , null , i.root ) ;
			this.current_index = leaf < t.index_key> ( undefined ) ;
			this.current_index.add_ref ( { src_value_change : new_index => this.set_current ( new_index ) } ) ;
			this.selector = ksel < t.index_key > ( this.current_index ) ;
		}

		public set_current( index : Index | undefined )
		{
			this.current_index [ set_value ] ( index );
			history.replaceState ( "" , "" , index?.link ) ;
			document.title = this.make_title ( index ) ;

			const container = this.make_container ( index ?.type ) ;
			container.current_index [ set_value ] ( index ) ;
			this.current_container.value = container ;
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
		public readonly parts : Renn < Index >;
	
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
			const parts = i.parts?.map( v => new Index ( app , this , v ) );
			this.parts = new Renn ( parts );
			this.container_type = i.container_type ?? "" ;
		}

		public get link () : string
		{
			return this.app.make_url_path ( this ) ;
		}

		public get selector_item () : ksel.Item < Index | undefined >
		{
			return this.app.selector.make_item ( this ) ;
		}
	}

	export function link ( index : Index , ... content : defs.parts )
	{
		const click = ( ev : MouseEvent ) =>
		{
			index.selector_item.select () ;
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
