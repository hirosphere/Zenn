import { State , Leaf } from "./State.js" ;
import { ru , terminate , notify , updateComposite } from "./Symbol.js" ;
const log = console.log ;

/* Branch */

export type Branch < V extends object > = Branch.Imp < V > &
{
	readonly [ prop in keyof V ] :
	(
		V [ prop ] extends object ?
				Branch < V [ prop ] >
				: Leaf < V [ prop ] >
	)
}

export type Branc < V extends object > = Branch.Imp < V > &
{
	readonly [ prop in keyof V ] :  number ;
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
	
		public override getValue () : V
		{
			return Object.fromEntries
			(
				Object.entries ( this ).map
				(
					( [ prop , state ] ) => [ prop , state.$ ]
				)
			) as V ;
		}
	
		public override setValue ( newV : V )
		{
			for ( const [ prop , state ] of Object.entries ( this ) )
			{
				state instanceof State && state.setValue
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
