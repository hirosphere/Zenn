const dbg = true;
const log = dbg ? console.log : ( ... args : any[] ) => void( 0 );

/** class Container */

const _parts = Symbol();

export class Container
{
	/** parts */

	public [ _parts ] = new Set < Exist > ;
	public _update() {}

	public terminate() : void
	{
		this[ _parts ].forEach( part => part.terminate() );
	}
}


/** class Exist */

export const _container = Symbol();

let nextru = 1;

export class Exist extends Container
{
	constructor( container : Container )
	{
		super();
		this[ _container ] = container;
		this[ _container ][ _parts ].add( this );

		log( this.logform( "new" ) );
	}

	protected [ _container ] : Container | null = null ;
	public readonly runiq : string = String( nextru ++ ) ;

	/** refs */

	public addRef( ref : Exist.Ref )
	{
		log( this.logform( "addref", `${ ref.runiq }` ) );
		this._refs.add( ref );
	}

	public removeRef( ref : Exist.Ref )
	{
		this._refs.delete( ref );
		log( this.logform( "removeref", `${ ref.runiq }` ) );
	}

	protected _refs = new Exist.Refs();

	/** life */

	public override terminate() : void
	{
		this._refs.forEach( ref => ref.source = null );

		this[ _container ]?.[ _parts ].delete( this );
		this[ _container ] = null;

		super.terminate();

		log( this.logform( "term" ) );
	}

	/** log */

	protected logform( event : string, msg  : string = "" ) { return `Exist ${ this.runiq } ${ event } ${ msg }`; }
}

/** namespace Exist */

export namespace Exist
{
	export class Ref
	{
		protected _source : Exist | null = null;

		constructor( refs : Refs )
		{
			log( this.logform( "new" ) );
			refs.add( this );
		}

		public readonly runiq : string = String( nextru ++ ) ;

		public set source( news : Exist | null )
		{
			if( news == this._source )  return;

			let olds = this._source;
			olds?.removeRef( this );
			this._source = news;
			news?.addRef( this );

			this._new_source( news, olds );
			news = olds = null;
		}

		/** event */

		public _new_source( news : Exist | null, olds : Exist | null )
		{
			log( this.logform( "new_src", `${ news?.runiq || "x" } ${ olds?.runiq || "x" }` ) );
		}

		/** life */

		public terminate()
		{
			this.source = null;
			log( this.logform( "term" ) );
		}

		/** log form */

		protected logform( event :string, msg : string = "" ) : string { return `Ref ${ this.runiq } ${ event } ${ msg }`; }
	}

	export class Refs extends Set < Ref >
	{
		public terminate()
		{
			this.forEach( ref => ref.terminate() );
		}
	}
}

/**  */

export const root = new Container();

