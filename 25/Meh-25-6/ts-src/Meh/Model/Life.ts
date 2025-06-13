
export const ru = Symbol () ;
let next_ru = 1 ;

export class Life < Ref extends Life.Ref = any >
{
	protected p_refs = new Set < Ref > ;

	public addRef ( ref : Ref )
	{
		this.p_refs.add ( ref ) ;
	}

	public terminate ()
	{
		this.p_refs .forEach
		(
			ref => ref.lterm ( this )
		) ;
	}

	public readonly [ ru ] = `RU-${ next_ru ++ }` ;
}

export namespace Life
{
	export interface Ref
	{
		source ? : Life ;
		lterm : ( source : Life ) => void
	}
}
