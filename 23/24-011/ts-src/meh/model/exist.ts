const dbg = true;
const log = dbg ? console.log : ( ... args : any[] ) => void( 0 );

import { _ls } from "../ls.js";
const ls = _ls.model.exist;

/** class ExistContainer */

const _parts = Symbol();

class ExistContainer
{
	/** parts */

	public readonly [ _parts ] = new Set < Exist > ;

	public terminate() : void
	{
		this[ _parts ].forEach( part => part.terminate() );
	}
}


/** class Exist */

export const _container = Symbol();
export const _addref = Symbol();
export const _removeref = Symbol();
export const _refs = Symbol();

let nextru = { exist: 1, ref: 1 };

export class Exist extends ExistContainer
{
	constructor( container : ExistContainer )
	{
		super();
		this[ _container ] = container;
		this[ _container ][ _parts ].add( this );

		ls.life.s && log( this.logform( "new" ) );
	}

	public readonly runiq : string = "E" + String( nextru.exist ++ ) ;
	protected [ _container ] : ExistContainer | null = null ;
	protected [ _refs ] = new Set < Exist.Ref >;

	/** refs */

	public [ _addref ]( ref : Exist.Ref )
	{
		// log( this.logform( "addref", `${ ref.runiq }` ) );
		this[ _refs ].add( ref );
	}

	public [ _removeref ]( ref : Exist.Ref )
	{
		this[ _refs ].delete( ref );
		ls.ref.s && log( this.logform( "removeref", `${ ref.runiq }` ) );
	}

	/** life */

	public override terminate() : void
	{
		this[ _refs ].forEach( ref => ref.ref_term() );
		this[ _container ]?.[ _parts ].delete( this );
		this[ _container ] = null;

		super.terminate();

		ls.life.s && log( this.logform( "old" ) );
	}

	/** log */

	protected logform( event : string, msg  : string = "" ) { return `Exist ${ this.runiq } ${ event } ${ msg }`; }
}

export namespace Exist
{
	export type Container = ExistContainer ;
}

/** namespace Exist */

export namespace Exist
{
	const _new_source = Symbol();

	export class Ref
	{
		protected refcon ? : Ref.Container ;
		protected _source ? : Exist;

		constructor
		(
			refcon : Ref.Container,
			protected acts : Acts,
			source ? : Exist
		)
		{
			ls.life.s && log( this.logform( "new" ) );
			( this.refcon = refcon ).add( this );
			this.source = source;
		}

		public readonly runiq : string = "R" + String( nextru.ref ++ ) ;
		
		public set source( news : Exist | undefined )
		{
			if( news === this._source )  return;

			let olds = this._source;
			olds?.[ _removeref ]( this );

			this._source = news;
			news?.[ _addref ]( this );

			ls.src.s && log( this.runiq, "set source", news?.runiq ?? "..", olds?.runiq ?? ".." );

			this._new_source( news, olds );
			news = olds = undefined;
		}

		/** event */

		public _new_source( news ? : Exist, olds ? : Exist )
		{
			// log( this.logform( "new_src", `${ news?.runiq || "x" } ${ olds?.runiq || "x" }` ) );
			
			olds && this.acts?.old_source?.();
			news && this.acts?.new_source?.( news );
		}

		/** life.s */

		public ref_term()
		{
			this.source = undefined;
			this.refcon?.remove( this );
			this.refcon = undefined;
			
			ls.life.s && log( this.logform( "old" ) );
		}

		/** log form */

		protected logform( event :string, msg : string = "" ) : string { return `${ this.runiq } ${ event } ${ msg }`; }
	}

	export interface Acts
	{
		new_source?( news : Exist ) : void ;
		old_source?() : void ;
	}
}

export namespace Exist.Ref
{
	export class Container
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

export const root = new ExistContainer();


