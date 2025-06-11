
export const ru = Symbol () ;
let next_ru = 1 ;

export class Existence implements Existence
{
	protected p_xt = new Set < Existence.xt > ;
	public set xt ( xt : Existence.xt ) { this.p_xt.add ( xt ) ; }

	public terminate ()
	{
		this.p_xt .forEach
		(
			xt => xt ( this )
		) ;
	}

	public readonly [ ru ] = `RU-${ next_ru ++ }` ;
}

export namespace Existence
{
	export type xt = ( source : Existence ) => void ;
}
