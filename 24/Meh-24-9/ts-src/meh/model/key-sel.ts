import { log } from "../common.js" ;
import { leaf } from "./leaf.js" ;

export type ksel < K > = ksel.Selector < K > ;

export function ksel < K > ( init : leaf.ll < K > )
{
	return new ksel.Selector < K > ( init ) ;
}

export namespace ksel
{

	export class Selector < K >
	{
		public readonly current : leaf < K > ;
		protected items = new Map < K , Item < K > > ;
		protected stat_src = { false : leaf ( false ) , true : leaf ( true ) } ;

		constructor
		(
			init : leaf.ll < K > ,
		)
		{
			this.current = leaf.ll.make ( init ) ;

			const key_change : leaf.update < K > = ( new_k , old_k ) =>
			{
				const old_i = old_k !== undefined && this.items.get ( old_k );
				const new_i = this.items.get ( new_k );

				if( old_i ) old_i.src = this.stat_src.false ;
				if( new_i ) new_i.src = this.stat_src.true ;
			};

			leaf.ref < K > ( this.current , key_change ) ;
		}

		public make_item ( key : K ) : Item < K >
		{
			let item = this.items.get ( key ) ;
			if( ! item )
			{
				item = new Item ( this , key , this.get_stat_src ( key ) ) ;
				this.items.set ( key , item ) ;
			}
			return item ;
		}

		protected get_stat_src ( key : K ) : leaf.bool
		{
			return ( key == this.current.value ) ? this.stat_src.true : this.stat_src.false ;
		}
	}

	/* */

	export type item < K > = Item < K > ;
	export const item = < K > ( selector : Selector < K > , key : K , init_state : leaf.bool ) =>
	(
		new Item ( selector , key , init_state )
	) ;

	export class Item < K > extends leaf.Conv < boolean >
	{
		constructor
		(
			protected selector : Selector < K > ,
			public readonly key : K ,
			init_state : leaf.bool
		)
		{
			super ( init_state , cv ) ;
		}

		public override get value () : boolean { return super.value ; }

		public select ()
		{
			this.selector.current.value = this.key ;
		}
	}

	const cv = ( v : boolean ) => v ;
}
