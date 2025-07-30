import { ru , refs , terminate } from "./Symbol.js" ;

let next_ru = 1 ;

export class Life < Ref extends Life.Ref < any > = any >
{
	protected [ refs ] = new Set < Ref > ;

	public addRef ( ref : Ref ) {  this[ refs ].add ( ref ) ;  }
	public removeRef ( ref : Ref ) {  this[ refs ].delete ( ref ) ;  }

	public [ terminate ] ()
	{
		this [ refs ].forEach
		(
			ref => ref.lTerm ?. ( this )
		) ;
	}

	public readonly [ ru ] = `RU-${ next_ru ++ }` ;
}

export namespace Life
{
	export interface Ref < Src extends Life >
	{
		source ? : Src ;
		lTerm ? : ( source : Life ) => void
	}
}
