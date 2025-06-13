import { Leafr , setValue } from "./Leafr.js" ;

export function Leaf < V > ( iv : V ) : Leaf < V >
{
	return new Leaf.Source ( iv ) ;
}

export interface Leaf < V > extends Leafr < V >
{
	set $ ( new_v : V ) ;

	set ( new_v : V , notify : boolean ) : void ;

	cv < R >
	(
		stor : ( srcv : V ) => R ,
		rtos : ( refv : R ) => V
	
	) : Leaf.Converter < R , V > ;
}

export namespace Leaf
{
	/* */

	export class Source < V >  extends Leafr.Source < V >  implements Leaf < V >
	{
		public override set $ ( new_v : V )
		{
			this [ setValue ] ( new_v ) ;
		}

		public set ( new_v : V , notify : boolean = true )
		{
			this [ setValue ] ( new_v , notify ) ;
		}

		public cv < R >
		(
			stor : ( srcv : V ) => R ,
			rtos : ( refv : R ) => V
		
		) : Converter < R , V >
		{
			return new Converter < R , V > ( this , stor , rtos ) ;
		}
	}

	/* */

	export class Converter < V , S >  extends Leafr.Converter < V , S >  implements Leaf < V >
	{
		constructor
		(
			source : Leaf < S > ,
			SR : ( value : S ) => V ,
			RS : ( value : V ) => S
		)
		{
			super ( source , SR , RS )
		}

		public override set $ ( new_v : V )
		{
			this.set ( new_v ) ;
		}

		public set ( new_v : V , notify : boolean = true )
		{
			this.RS && this.source [ setValue ]
			(
				this.RS ( new_v ) ,
				notify
			) ;
		}

		public cv < R >
		(
			stor : ( srcv : V ) => R ,
			rtos : ( refv : R ) => V
		
		) : Converter < R , V >
		{
			return new Converter < R , V > ( this , stor , rtos ) ;
		}

	}

}
