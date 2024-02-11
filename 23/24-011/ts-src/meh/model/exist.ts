const dbg = true;
const log = dbg ? console.log : ( ... args : any[] ) => void( 0 );

const ltrue = false;
const ls = { life: ltrue, ref: ltrue };

/** class Owner */

const _parts = Symbol();

export class Owner
{
	/** parts */

	public readonly [ _parts ] = new Set < Exist > ;

	public terminate() : void
	{
		this[ _parts ].forEach( part => part.terminate() );
	}
}


/** class Exist */

export const _owner = Symbol();
export const _addref = Symbol();
export const _removeref = Symbol();
export const _refs = Symbol();

let nextru = { exist: 1, ref: 1 };

export class Exist extends Owner
{
	constructor( owner : Owner )
	{
		super();
		this[ _owner ] = owner;
		this[ _owner ][ _parts ].add( this );

		ls.life && log( this.logform( "new" ) );
	}

	public readonly runiq : string = "E" + String( nextru.exist ++ ) ;
	protected [ _owner ] : Owner | null = null ;
	protected [ _refs ] = new Exist.RefCon();

	/** refs */

	public [ _addref ]( ref : Exist.Ref )
	{
		// log( this.logform( "addref", `${ ref.runiq }` ) );
		this[ _refs ].add( ref );
	}

	public [ _removeref ]( ref : Exist.Ref )
	{
		this[ _refs ].remove( ref );
		ls.ref && log( this.logform( "removeref", `${ ref.runiq }` ) );
	}

	/** life */

	public override terminate() : void
	{
		this[ _refs ].refs_term();
		this[ _owner ]?.[ _parts ].delete( this );
		this[ _owner ] = null;

		super.terminate();

		ls.life && log( this.logform( "old" ) );
	}

	/** log */

	protected logform( event : string, msg  : string = "" ) { return `Exist ${ this.runiq } ${ event } ${ msg }`; }
}

/** namespace Exist */

export namespace Exist
{
	const ls = { life: ltrue, src: ltrue };
	const _new_source = Symbol();

	export class Ref
	{
		protected rcon ? : RefCon ;
		protected _source ? : Exist;

		constructor( rcon : RefCon, protected acts ? : Ref.Acts )
		{
			ls.life && log( this.logform( "new" ) );
			( this.rcon = rcon ).add( this );
		}

		public readonly runiq : string = "R" + String( nextru.ref ++ ) ;
		
		public set source( news : Exist | undefined )
		{
			if( news == this._source )  return;

			let olds = this._source;
			olds?.[ _removeref ]( this );

			this._source = news;
			news?.[ _addref ]( this );

			ls.src && log( this.runiq, "set source", news?.runiq ?? "..", olds?.runiq ?? ".." );

			this._new_source( news, olds );
			news = olds = undefined;
		}

		/** event */

		public _new_source( news : Exist | undefined, olds : Exist | undefined )
		{
			// log( this.logform( "new_src", `${ news?.runiq || "x" } ${ olds?.runiq || "x" }` ) );
			
			olds && this.acts?.old_source?.();
			news && this.acts?.new_source?.( news );
		}

		/** life */

		public ref_term()
		{
			this.source = undefined;
			this.rcon?.remove( this );
			this.rcon = undefined;
			
			ls.life && log( this.logform( "old" ) );
		}

		/** log form */

		protected logform( event :string, msg : string = "" ) : string { return `${ this.runiq } ${ event } ${ msg }`; }
	}

	export namespace Ref
	{
		export interface Acts
		{
			new_source?( news : Exist ) : void ;
			old_source?() : void ;
		}
	}
}

export namespace Exist
{
	export class RefCon
	{
		protected items = new Set < Ref > ;

		public add( ref : Ref ) : void { this.items.add( ref ); }
		public remove( ref : Ref ) : void { this.items.delete( ref ); }

		public forEach( fn : ( ref : Ref ) => void )
		{
			this.items.forEach( ref => fn( ref ) );
		}

		public refs_term()
		{
			this.items.forEach( ref => ref.ref_term() );
		}

		public get size() { return this.items.size; }
	}
}


/**  */

export abstract class Container extends Exist
{
	public update() : void {};
}


/**  */

export const root = new Owner();

