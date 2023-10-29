// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //

const log = console.log;

export class Lian < I = any > extends Array < I >
{
	protected refs = new Set < Lian.Ref < I > > ();

	public ref( ref : Lian.Ref < I > )
	{
		this.refs.add( ref );
	}
	
	public add( item : I, order ? : number )
	{
		order = Math.min( order ?? this.length, this.length );
		this.splice( order, 0, item );
	}

	public splice( start: number, deleteCount: number, ...newItems : I[] ) : I[]
	{
		const rt = super.splice( start, deleteCount, ... newItems );

		const remove = rt.length;
		const add = newItems.length;		
		this.refs.forEach( ref => ref.update( start, remove, add ) );
		
		return rt;
	}
}

export namespace Lian
{
	export class Ref < I >
	{
		;

		update( start : number, removeCount : number, addCount : number )
		{}
	}
}
