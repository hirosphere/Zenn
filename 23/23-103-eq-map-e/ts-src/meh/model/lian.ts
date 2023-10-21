
// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //

export class Lian < T = any > extends Array < T >
{
	protected refs = new Set < Lian.Update > ();

	public ref( update : Lian.Update )
	{
		this.refs.add( update );
		update( 0, 0, this.length );
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
	export type Update = ( start : number, remove : number, add : number ) => void;
}
