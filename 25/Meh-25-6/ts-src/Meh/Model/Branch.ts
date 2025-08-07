import { State , Leaf } from "./State.js" ;
import { Renn } from "./Renn.js" ;
import { ru , terminate , getValue , setValue , notify , updateComposite } from "./Symbol.js" ;
const log = console.log ;

/* Branch */

export type Branch < $ extends object > = Branch.Imp < $ > &
{
	readonly [ prop in keyof $ ] :
	(
		$ [ prop ] extends object ?
				Branch < $ [ prop ] >
				: Leaf < $ [ prop ] >
	)
}

export function Branch < V extends object > () : { new ( newV : V ) : Branch < V > }
{
	return Branch.Imp as any ;
}


export namespace Branch
{
	export interface Composite
	{
		[ updateComposite ] () : void ;
	}

	export class Imp < V extends object > extends State < V >
	{
		constructor ( newV : V , composite ? : Composite )
		{
			super ( composite ) ;

			for ( const [ prop , value ] of Object.entries( newV ) )
			{
				if ( ( this as any ) [ prop ] !== undefined ) continue ;

				( this as any ) [ prop ] =
				(
					typeof value == "object" ?
						new Imp ( value , this ) :
						new Leaf ( value , this )
				) ;
			}
		}


		/* 非公開 */
	
		public override [ getValue ] () : V
		{
			return Object.fromEntries
			(
				Object.entries ( this ).map
				(
					( [ prop , state ] ) => [ prop , state.$ ]
				)
			) as V ;
		}
	
		public override [ setValue ] ( newV : V )
		{
			for ( const [ prop , state ] of Object.entries ( this ) )
			{
				state instanceof State && state [ setValue ]
				(
					( newV as any ) [ prop ] ,
					true
				) ;
			}

			this [ updateComposite ] () ;
		}
	
		[ updateComposite ] () : void
		{
			this [ notify ] () ;
		}
	}
}


