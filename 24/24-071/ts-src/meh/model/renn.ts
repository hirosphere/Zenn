import { Exist } from "./exist.js";
import { Leafr } from "./leaf.js";
import { _composition, _setvalue, _addpart, _removepart, _refs } from "./shadow-props.js";
const log = console.log;


/** class Renn */

export class Renn < S extends Exist = any > extends Exist
{
	/* static */

	public static from < S extends Exist >
	(
		composition : Exist,
		sources : S [],
	)
	: Renn < S >
	{
		return new Renn < S > ( composition, sources );
	}



	/* constructor */

	constructor( composition : Exist, sources ? : S [] )
	{
		super( composition );

		sources && this.new_orders( sources );
	}

	/* props */

	public get orders() : Order < S > []
	{
		return this.p_orders;
	}

	protected p_orders = new Array < Order < S > > ;

	/* */

	public for_each( act : ( order : Order < S > ) => void )
	{
		this.p_orders.forEach( order => act( order ) );
	}


	/* */

	public new_orders( sources : S [], start ? : number ) : void
	{
		const old_next = this.p_orders.length;

		const new_start = Math.min
		(
			Math.max
			(
				0,
				start ?? old_next
			),
			old_next
		);

		const new_count = sources.length;
		const new_next = new_start + new_count;

		const start_order = this.p_orders[ new_start ];

		let new_orders = sources.map
		(
			( src, i ) => new Order < S > ( this, new_start + i, src )
		);

		this.p_orders.splice
		(
			new_start,
			0,
			... new_orders
		);

		this.update_orders( new_next );

		this.notify
		(
			ref => ref.on_new_order( start_order, new_orders )
		);

		new_orders.length = 0;
	}
	
	public move( order : Order < S >, dest : number ) : void
	{
		if( order[ _composition ] != this ) return;
	}

	public delete( start : number, count : number = 1 ) : void
	{
		if( start >= this.p_orders.length )  return;

		let dels = this.p_orders.splice( start, count );

		this.update_orders( start );

		this.notify
		(
			ref => ref.on_old_order( dels )
		);

		dels.forEach( order => order.terminate() );

		dels.length = 0;
	}

	public clear() : void
	{
		this.delete( 0, this.orders.length );
	}

	/* */

	protected update_orders( start : number = 0, next : number = this.p_orders.length ) : void
	{
		log( "update", start, next );

		for( let pos = start; pos < next; pos ++ )
		{
			this.p_orders[ pos ]?.[ _setvalue ]( pos );
		}
	}

	protected notify( act : ( ref : Renn.Ref < S > ) => void ) : void
	{
		this[ _refs ].forEach( ref => ( ref instanceof Renn.Ref ) && act( ref ) );
	}
}

type Pos < S extends Exist > = Order < S > | undefined ;

export namespace Renn
{
	export class Ref < S extends Exist > extends Exist.Ref
	{
		constructor( owner : Exist, acts : Acts < S >, source : Renn < S > )
		{
			super( owner, acts, source );

			this.on_new_order( undefined, source.orders );
		}

		public on_new_order( start : Pos < S >, orders : Order < S > [] ) : void
		{
			this.acts?.create?.( start, orders )
		}

		public on_move_order(  ) : void
		{
			;
		}

		public on_old_order( list : Order < S > [] ) : void
		{
			this.acts?.delete?.( list );
		}

		protected get acts() : Renn.Acts < S > | undefined
		{
			return this.p_acts;
		}
	}

	export interface Acts < S extends Exist > extends Exist.Acts
	{
		create ?
		(
			start : Pos < S >,
			list : Order < S > []
		) : void ;

		add ?
		(
			start : number,
			list : Order < S > []
		) : void ;

		remove ?
		(
			list : Order < S > [],
		) : void ;

		delete ?
		(
			list : Order < S > []
		) : void ;
	}
}



/** class Order */

export class Order < S extends Exist > extends Leafr.Number
{
	constructor( p_renn : Renn < S >, pos : number, public readonly source : S )
	{
		super( p_renn, pos );
	}

	public move( pos : number ) : void
	{
		;
	}

	public delete() : void
	{
		this.renn?.delete( this.value );
	}

	public get renn() : Renn < S > | null
	{
		return ( this[ _composition ] instanceof Renn ) && this[ _composition ] || null;
	}

	public override terminate() : void
	{
		super.terminate();
	}
}
