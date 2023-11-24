
const parts = Symbol();

class Owner
{
	[ parts ] = new Set < Exist > ;

	public terminate() : void
	{
		this[ parts ].forEach( part => part.terminate() );
		this[ parts ].clear();
	}
}

const rootex = new Owner;

export class Exist extends Owner
{
	constructor( owner : Owner )
	{
		super();
	}

	protected refs = new Set < Exist.Ref > ;

	public releaseRef( ref : Exist.Ref )
	{
		this.refs.delete( ref );
	}

	public terminate() : void
	{
		this.refs.forEach( ref => ref.terminate() );
	}
}

export namespace Exist
{
	export class Ref
	{
		constructor
		(
			protected _source : Exist | undefined
		){}

		public get source() : Exist | undefined { return this._source; }

		public release()
		{
			this._source?.releaseRef( this );
			delete this._source;
		}

		public terminate() : void
		{
			this.release();
		}
	}
}


const set = Symbol();
const get = Symbol();

export class Leaf < V > extends Exist
{
	/**  */

	constructor ( owner : Owner, protected _value : V )
	{
		super( owner );
	}

	public [ get ]() : V { return this._value; }
	protected [ set ]( value : V, ref ? : Leaf.Ref < V > ) : void
	{
		this.refs.forEach( ref =>
			{ if( ref instanceof Leaf.Ref ) ref.change(); }
		);
	}	
}

export namespace Leaf
{
	export class Ref < V > extends Exist.Ref
	{
		constructor( source : Leaf < V > )
		{
			super( source );
		}

		public get value() : V | undefined
		{
			return this.source instanceof Leaf && this.source[ get ]() || undefined;
		}

		public set value( value : V | undefined )
		{
			this.source instanceof Leaf && this.source[ set ]( value, this );
		}

		public change() : void {}
	}

	export class RO < V > extends Leaf < V >
	{
		get value() : V { return this._value; }
	}
}

const r = new Leaf.Ref( new Leaf < string > ( rootex, "A aa" ) );

r.value = "";
