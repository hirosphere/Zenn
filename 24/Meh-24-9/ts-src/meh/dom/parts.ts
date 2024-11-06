import { log } from "../common.js";

import { Leafr , leaf , Renn, Position } from "../model/index.js";
import { defs } from "./defs.js";
import { MehNode , MehText , MehElement } from "./node.js";

type El = defs.El ;

export const create_parts_place =
(
	ce : El | undefined ,
	def : defs.parts ,
	rel_n ? : Node ,
)
: Place | undefined =>
(
	next_place( ce, def, 0 )
);

const next_place =
(
	ce : El | undefined ,
	def : defs.parts,
	pos : number,
)
: Place | undefined =>
{
	const cur = def[ pos ];

	if( cur instanceof defs.Place )
	{
		pos ++ ;

		if( cur instanceof defs.Each )
		{
			return new EachPlace( ce, cur, def, pos );
		}

		if( cur instanceof defs.Switch )
		{
			return new SwitchPlace( ce , cur , def , pos ) ;
		}

		return ;
	}

	if( cur !== undefined )
	{
		return new StaticPlace( ce, def, pos );
	}
};

/* */


export abstract class Place
{
	public abstract get first_dom_node () : Node | undefined ;
	protected next_place ? : Place ;
	protected get next_dom_node () : Node | null
	{
		return this.next_place ?.first_dom_node || null ;
	}

	protected add_part
	(
		df : DocumentFragment ,
		pdef : defs.part ,
	)
	 : MehNode | undefined
	{
		if( pdef instanceof MehNode )
		{
			pdef.node && df.appendChild( pdef.node );
			return pdef ;
		}

		else if( ! ( pdef instanceof defs.Place ) )
		{
			const text = new MehText( pdef ) ;
			text.node && df.appendChild( text.node ) ;
			return text ;
		}
	}

	public destruct()
	{
		this.next_place?.destruct() ;
	}
}



class StaticPlace extends Place
{
	constructor
	(
		ce : El | undefined ,
		def : defs.parts ,
		pos : number ,
	)

	{
		super();

		const df = new DocumentFragment ;

		while( pos < def.length )
		{
			const pdef = def[ pos ] ;
			const part = this.add_part( df, pdef );
			if( ! part )  break ;
			this._first_node_ ??= part.node ;
			pos ++ ;
		}

		ce?.appendChild( df ) ;

		this.next_place = next_place( ce, def, pos );
	}

	public override get first_dom_node ()
	{
		return this._first_node_ ;
	}

	protected _first_node_ ? : Node ;
}

class SwitchPlace extends Place
{
	protected src ;
	protected mels = new Map < any , MehElement > ;
	protected create_element ? : ( key : any ) => defs.element ;

	constructor
	(
		protected ce : El | undefined ,
		protected def : defs.Switch < any > ,
		next_def : defs.parts ,
		pos : number ,

	)
	{
		super() ;

		/* アイテムの生成と登録 */

		const df = new DocumentFragment ;

		if( def.items instanceof Array )
		{
			def.items.forEach
			(
				( [ key , mel ] ) => this.add_part_mel ( key , df , mel )
			) ;
		}
		else
		{
			this.create_element = def.items ;

			def.pre ?.forEach
			(
				key => this.make_part ( key , df )
			) ;
		}

		df.childElementCount && this.ce?.insertBefore
		(
			df ,
			this.next_dom_node
		) ;
		

		/* selector */

		if( def.selector instanceof Leafr )
		{
			this.src = new Leafr.Ref
			(
				def.selector ,
				( new_key , old_key ) => this.on_cur_change ( new_key , old_key )
			) ;
			def.selector.add_ref( this.src ) ;
		}
		else
		{
			this.make_part ( def.selector , this.ce ) ;
		}

		/* next */

		this.next_place = next_place ( ce , next_def , pos ) ;
	}

	protected on_cur_change ( new_key : any , old_key ? : any ) : void
	{
		this.make_part ( old_key , this.ce ) ;
		this.make_part ( new_key , this.ce ) ;
	}

	protected make_part
	(
		key : any ,
		ce : Element | DocumentFragment | undefined
	)
	 : void
	{
		if( key === undefined )  return ;

		if( ! this.mels.has ( key ) && this.create_element )
		{
			const new_mel = this.create_element ( key ) ;
			this.add_part_mel ( key , ce , new_mel ) ;
		}

		this.update_mel ( key ) ;
	}

	protected add_part_mel
	(
		key : any ,
		ce : Element | DocumentFragment | undefined ,
		new_mel : MehElement
	)
	 : void
	{
		if( key === undefined )  return ;

		if( ! this.mels.has ( key ) )
		{
			this.mels.set ( key , new_mel );

			new_mel.node && ce?.insertBefore
			(
				new_mel.node ,
				this.next_dom_node
			);
		}

		this.update_mel ( key ) ;
	}

	protected update_mel ( key : any ) : MehElement | undefined
	{
		const mel = this.mels.get ( key ) ;
		const state = leaf.get ( this.def.selector ) == key ;
		mel?.el && this.update_state ( mel.el , state ) ;

		return mel ;
	}

	protected update_state ( el : El , state : boolean )
	{
		el.style.display = state ? "" : "none" ;
	}

	protected nodes : Node [] = [] ;

	public override get first_dom_node(): Node | undefined
	{
		return this.nodes [ 0 ] ;
	}

	public override destruct () : void
	{
		this.src?.terminate () ;
		this.src = undefined ;
		super.destruct () ;
	}
}

class EachPlace extends Place
{
	protected src : Renn < any > ;
	protected create_node : ( order : Position < any > ) => defs.node ;
	protected nodes = new Map < Position < any > , Node > ;

	constructor
	(
		protected ce : El | undefined ,
		def : defs.Each,
		next_def : defs.parts ,
		pos : number ,
	)
	{
		super();

		this.src = def.source ;
		this.create_node = def.create_node ;

		def.source.add_ref ( this ) ;
		this.next_place = next_place( ce, next_def, pos );
	}

	public add ( { src , start , next } : Renn.note )
	{
		const df = new DocumentFragment ;

		for
		(
			let pos = start ;
			pos < next ;
			pos ++
		)
		{
			const order = src.items [ pos ] ;
			if( this.nodes.has( order ) )  return ;

			const node = this.add_part
			(
				df ,
				this.create_node( order )
			);

			node?.node && this.nodes.set
			(
				order , node.node
			) ;
		}

		const next_ord = this.src.items [ next ];

		this.ce?.insertBefore
		(
			df,
			(
				this.nodes.get( next_ord ) ??
				this.next_place ?.first_dom_node ??
				null
			)
		);
	}

	public remove ( { items: orders } : Renn.note )
	{
		orders.forEach
		(
			order => this.remove_node ( order )
		);
	}

	protected remove_node ( order : Position < any > )
	{
		const node = this.nodes.get ( order ) ;
		if( ! node )  return ;
		this.ce ?.removeChild( node ) ;
	}

	public override get first_dom_node (): Node | undefined
	{
		const pos = this.src.items [ 0 ] ;
		return this.nodes.get ( pos ) ;
	}
}
