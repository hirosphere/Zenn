
// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //

type Update = ( start : number, remove : number, add : number ) => void;

export class Lian < T > extends Array < T >
{
	protected refs = new Set < Update > ();

	public ref( update : Update )
	{
		this.refs.add( update );
	}
	
	public add( item : T, order ? : number )
	{
		order = Math.min( order ?? this.length, this.length );
		this.splice( order, 0, item );
	}

	public splice( start: number, deleteCount: number, ...newItems: T[] ) : T[]
	{
		const rt = super.splice( start, deleteCount, ... newItems );		
		this.refs.forEach( update => update( start, rt.length,newItems?.length ?? 0  ) );
		return rt;
	}
}

export namespace Lian
{
	export class Ref < T >
	{
		constructor( protected updateOper : Update ) {}

		update( start : number, remove : number, add : number ) : void
		{
			this.updateOper( start, remove, add );
		}
	}
}

