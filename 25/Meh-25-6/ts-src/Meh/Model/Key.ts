import { Live } from "./LiveState.js" ;

const log = console.log ;

export class Key < K >
{
	constructor
	(
		public readonly current : Live < K >
	)
	{
		this.#_curr = this.current.$ ;
		this.current.add_ref ( { vChan : () => this.update () } ) ;
	}

	public get_item ( key : K ) : Key.Match < K >
	{
		let match = this.#_items.get ( key ) ;

		if ( ! match )
		{
			match = new Key.Match < K > ( this , key ) ;
			this.#_items.set ( key , match ) ;	
		}
		
		return match ;
	}

	/* */

	protected update () : void
	{
		const old_key = this.#_curr ;
		const new_key = this.#_curr = this.current.$ ;

		this.update_item ( old_key ) ;
		this.update_item ( new_key ) ;
	}

	protected update_item ( key : K ) : void
	{
		const item = this.#_items.get ( key ) ;
		if ( item ) item.$ = key === this.current.$ ;
	}

	#_items = new Map < K , Key.Match < K > > ;
	#_curr : K ;
}

export namespace Key
{
	export class Match < K >  extends Live.Leaf < boolean >
	{
		constructor
		(
			protected srv : Key < K > ,
			public readonly key : K ,
		)
		{
			super ( srv.current.$ === key ) ;
		}

		public select () : void
		{
			this.srv.current.$ = this.key ;
		}
	}
}
