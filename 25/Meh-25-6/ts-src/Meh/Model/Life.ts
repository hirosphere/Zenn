
export const ru = Symbol () ;
export const refs = Symbol () ;

let next_ru = 1 ;

export class Life < Ref extends Life.Ref = any >
{
	protected [ refs ] = new Set < Ref > ;

	public addRef ( ref : Ref ) {  this[ refs ].add ( ref ) ;  }
	public removeRef ( ref : Ref ) {  this[ refs ].delete ( ref ) ;  }

	public terminate ()
	{
		this[ refs ] .forEach
		(
			ref => ref.lterm ?. ( this )
		) ;
	}

	public readonly [ ru ] = `RU-${ next_ru ++ }` ;
}

export namespace Life
{
	export interface Ref
	{
		source ? : Life ;
		lterm ? : ( source : Life ) => void
	}
}
