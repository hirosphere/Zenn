import { _composition, composition, _parts, _addpart, _removepart, _refs, _addref, _removeref, _setlink, } from "./shadow-props.js";
const log = console.log;

import _ls from "../ls.js";
const ls = _ls.model.exist;

/** class Exist */

let nextru = { exist: 1, ref: 1 };

const sources = Symbol();

export class Exist
{
	public readonly runiq : string = "E" + String( nextru.exist ++ ) ;

	constructor( composition : Exist | null )
	{
		this[ _composition ] = composition;
		this[ _composition ]?.[ _addpart ]( this );
	}


	/* composition */

	public [ _composition ] : Exist | null = null ;

	public get [ composition ]() : Exist | null
	{
		return this[ _composition ];
	}

	public set [ composition ]( new_com : Exist | null )
	{
		this[ _composition ]?.[ _removepart ]( this );
		this[ _composition ] = new_com;
		this[ _composition ]?.[ _addpart ]( this );
	}

	/* parts */

	public [ _parts ] = new Set < Exist > ;

	public [ _addpart ]( part : Exist ) : void
	{
		this[ _parts ].add( part );
	}

	public [ _removepart ]( part : Exist ) : void
	{
		this[ _parts ].delete( part );
	}


	/* refs */

	public [ _refs ] = new Set < Exist.Ref >;

	public [ _addref ]( ref : Exist.Ref )
	{
		this[ _refs ].add( ref );
	}

	public [ _removeref ]( ref : Exist.Ref )
	{
		this[ _refs ].delete( ref );
	}

	/* sources */

	public [ sources ] = new Set < Exist.Ref >;

	/* life */

	public terminate() : void
	{
		this[ sources ].forEach( source => source.terminate() );
		this[ _refs ].forEach( ref => ref.notify_terminate() );
		this[ _parts ].forEach( part => part.terminate() );
		this[ composition ] = null;
	}




	/** log */

	protected logform( event : string, msg  : string = "" ) { return `Exist ${ this.runiq } ${ event } ${ msg }`; }
}

export namespace Exist
{
	export type Container = Exist ;
}

export namespace Exist
{
	export class Ref
	{
		protected p_source ? : Exist;

		constructor
		(
			protected owner : Exist,
			protected p_acts : Acts,
			source : Exist
		)
		{
			owner[ sources ].add( this );
			this.p_source = source;
			source[ _addref ]( this );
		}

		public readonly runiq : string = "R" + String( nextru.ref ++ ) ;

		/* event */

		public notify_terminate()
		{
			this.p_acts?.terminate?.();
		}
		
		/* life */

		public terminate()
		{
			this.p_source?.[ _removeref ]( this );
			this.owner[ sources ].delete( this );
			
			// ls.life.s && log( this.logform( "old" ) );
		}
	}

	export interface Acts
	{
		terminate?() : void ;
	}
}

/**  */

export const root = new Exist( null );
