const log = console.log;

/** class Exist
 * Mehクラスの存在の元締め。　メモリリーク防止に有効と思え。
*/

const parts = Symbol();

export interface Owner
{
	readonly runiq : number ;
	[ parts ] : Set < Exist > ;
	terminate() : void ;
}

class OwnerImpl implements Owner
{
	readonly runiq = nextru ++;
	public toString() : string { return "Owner ru " + String( this.runiq ); }

	[ parts ] = new Set < Exist > ;

	public terminate() : void
	{
		this[ parts ].forEach( part => part.terminate() );
		this[ parts ].clear();
	}
}

let nextru = 0;

export const root = new OwnerImpl();

export class Exist
{
	constructor( owner : Owner )
	{
		this.owner = owner;
		owner[ parts ].add( this );

		log( this.lf( "construct" ) );
	}

	/** owner */

	protected owner ? : Owner;

	/** refs */
	
	protected refs = new Set < Exist.Ref >;

	public addRef( ref : Exist.Ref ) : void
	{
		this.refs.add( ref );
	}

	public removeRef( ref : Exist.Ref ) : void
	{
		this.refs.delete( ref );
	}

	/** life */

	public override terminate() : void
	{
		this.refs.forEach( ref => ref.release() );
		this.refs.clear();

		delete this.owner;

		super.terminate();
		log( this.lf( "terminate" ) );
	}

	public get ru() { return this.runiq; }

	/**  */

	protected lf( event : string, info : string = "" ) { return `Exist[${this.ru}] ${ event }`; }
}


export namespace Exist
{
	/**  class Ref
	 * モデルとビュー(SourceとRef)を分かつ根源。
	 * 。
	*/

	export class Ref
	{
		/** */

		constructor()
		{
			log( this.lf( "construct" ) );
		}

		static nextid = 1;
		protected id = Ref.nextid ++;

		/** source アクセサ */

		public set source( newSource : Exist | undefined ) { this.setSource( newSource ); }
		public get source() : Exist | undefined { return this._source; }

		protected setSource( newSource : Exist | undefined )
		{
			if( newSource == this._source ) return;
			
			//log( "Exist.Ref setSource", "ru " + newSource?.ru )

			this._source?.removeRef( this );
			this._source = newSource;
			this._source?.addRef( this );
			this.onSourceChange();
		}
		protected _source ? : Exist;

		/** source イベントハンドラ */

		public onSourceChange() : void
		{
			log( this.lf( "onSourceChange" ) );
		}

		/** 操作 */

		public release() : void
		{
			log( this.lf( "release" ) )			
			this._source?.removeRef( this );
		}

		/**  */

		protected lf( event : string ) { return `Exist.Ref[${ this.id }-${ this.source?.ru ?? "?" }] ${ event }`; }
	}
}
