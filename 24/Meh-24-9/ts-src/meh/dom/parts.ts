import { log } from "../common.js";

import { leaf , Renn, Order } from "../model/index.js";
import { defs } from "./defs.js";
import { MehNode , MehText , MehElement } from "./meh-node.js";

type El = defs.El ;

/* export */

export const create_parts_place =
(
	ce : El | undefined ,
	def : defs.parts ,
	rel_n ? : Node ,
)
: Place | undefined =>
(
	next_place( { ce , def , pos : 0 } )
);



/* def に応じたタイプの PFP オブジェクトを作成 */

type work =
{
	ce : El | undefined ;
	def : defs.parts ;
	pos : number ;
} ;

const next_place =
(
	w : work ,
)
: Place | undefined =>
{
	const cur = w.def[ w.pos ];

	if( cur instanceof defs.Place )
	{
		w.pos ++ ;

		if( cur instanceof defs.Each )
		{
			return new EachPlace( w , cur );
		}

		if( cur instanceof defs.Switch )
		{
			return new SwitchPlace( w , cur ) ;
		}

		return ;
	}

	if( cur !== undefined )
	{
		return new StaticPlace( w );
	}
};


/* PFP : 「パートDOMノードフラグメント」の「プレース」 */
/* DOM エレメントの chidNodes の柔軟な管理・運用を実現。 */

/* * PFP 基底クラス */

export abstract class Place
{
	public abstract get first_dom_node () : Node | undefined ;
	protected next_place ? : Place ;
	protected get next_dom_node () : Node | null
	{
		return this.next_place ?.first_dom_node ||
			this.next_place?.next_dom_node ||
			null
		;
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


/* 固定 PFP */

class StaticPlace extends Place
{
	constructor
	(
		w : work ,
	)

	{
		super();

		const df = new DocumentFragment ;

		while( w.pos < w.def.length )
		{
			const pdef = w.def[ w.pos ] ;
			const part = this.add_part( df, pdef );
			if( ! part )  break ;
			this._first_node_ ??= part.node ;
			w.pos ++ ;
		}

		w.ce?.appendChild( df ) ;

		this.next_place = next_place( w );
	}

	public override get first_dom_node ()
	{
		return this._first_node_ ;
	}

	protected _first_node_ ? : Node ;
}


/* ページスイッチ PFP */
/* 可視・不可視制御のため、パートは MehElement 限定で、MehText は使えません。 */

class SwitchPlace extends Place
{
	protected src_ref ;
	protected mels = new Map < any , MehElement > ;
	protected create_element ? : ( key : any ) => defs.element | undefined ;

	constructor
	(
		protected w : work ,
		protected def : defs.Switch < any > ,

	)
	{
		super() ;

		/* 初期アイテムの生成と登録 */

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

		df.childElementCount && this.w.ce?.insertBefore
		(
			df ,
			this.next_dom_node
		) ;

		/* セレクタを動的参照に結び付ける。 */

		if( def.selector instanceof leaf.Source )
		{
			this.src_ref = leaf.ref < any >
			(
				def.selector ,
				( new_key , old_key ) => this.on_cur_change ( new_key , old_key ) ,
			)
		}
		else
		{
			this.make_part ( def.selector , this.w.ce ) ;
		}

		/* next */

		this.next_place = next_place ( w ) ;
	}

	protected on_cur_change ( new_key : any , old_key ? : any ) : void
	{
		this.make_part ( old_key , this.w.ce ) ;
		this.make_part ( new_key , this.w.ce ) ;
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
			new_mel && this.add_part_mel ( key , ce , new_mel ) ;
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

		// log ( state , typeof leaf.get ( this.def.selector ) , typeof key )

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
		this.src_ref ?.term ?.() ;
		this.src_ref = undefined ;
		super.destruct () ;
	}
}


/* Renn 配列をソースとした、動的生去 PFP */

class EachPlace extends Place implements Renn.Ref < any >
{
	protected src : Renn < any > ;
	protected create_node : ( order : Order < any > ) => defs.node ;
	protected nodes = new Map < Order < any > , Node > ;

	constructor
	(
		protected w : work ,
		def : defs.Each,
	)
	{
		super();

		this.src = def.source ;
		this.create_node = def.create_node ;

		def.source.add_ref ( this ) ;
		this.next_place = next_place( w );
	}

	public src_add_orders ( { src , start , next } : Renn.note ) : void
	{
		const df = new DocumentFragment ;

		for
		(
			let pos = start ;
			pos < next ;
			pos ++
		)
		{
			const order = src.orders [ pos ] ;
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

		const next_ord = this.src.orders [ next ];

		this.w.ce?.insertBefore
		(
			df,
			(
				this.nodes.get( next_ord ) ??
				this.next_place ?.first_dom_node ??
				null
			)
		);
	}

	public src_remove_orders ( { items: orders } : Renn.note ) : void
	{
		orders.forEach
		(
			order => this.remove_node ( order )
		);
	}

	protected remove_node ( order : Order < any > )
	{
		const node = this.nodes.get ( order ) ;
		if( ! node )  return ;
		this.w.ce ?.removeChild( node ) ;
	}

	public override get first_dom_node (): Node | undefined
	{
		const pos = this.src.orders [ 0 ] ;
		return this.nodes.get ( pos ) ;
	}
}
