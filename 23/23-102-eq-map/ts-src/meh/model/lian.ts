
// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //

export class Lian < T > extends Array < T >
{
	protected refs = new Set < Lian.Ref < T > > ();

	public addref( ref : Lian.Ref < T > )
	{
		;
	}

	public splice( start: number, deleteCount: number, ...items: T[] ) : T[]
	{
		const rt = super.splice( start, deleteCount, ... items );
		deleteCount && this.refs.forEach( ref => ref.remove( start, deleteCount ) );
		items?.length && this.refs.forEach( ref => ref.add( start, items.length ) );
		return rt;
	}
}

export namespace Lian
{
	export abstract class Ref < T >
	{
		constructor( protected source : Lian < T > ) {}
		add( start : number, count : number ) : void {};
		remove( start : number, count : number ) : void {}
	}
}

