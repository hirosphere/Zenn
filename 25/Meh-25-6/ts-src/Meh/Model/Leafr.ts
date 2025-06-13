import { Life } from "./Life.js" ;

export const setValue = Symbol () ;

export function Leafr < V > ( iv : V ) : Leafr < V >
{
	return new Leafr.Source ( iv ) ;
}

export interface Leafr < V > extends Life
{
	get $ () : V ;

	[ setValue ] ( new_v : V , notify ? : boolean ) : void ;

	cvr < R >
	(
		stor : ( srcv : V ) => R ,
		rtos ? : ( refv : R ) => V
	
	) : Leafr.Converter < R , V > ;
}


export namespace Leafr
{
	/* */

	export abstract class Base < V >  extends Life < Leafr.Ref < V > >  implements Leafr < V >
	{
		public abstract get $ () : V ;
		public abstract [ setValue ] ( new_v : V , notify : boolean ) : void ;

		public cvr < R > ( stor : ( srcv : V ) => R , rtos ? : ( refv : R ) => V ) : Converter < R , V >
		{
			return new Converter < R , V > ( this , stor , rtos ) ;
		}
	}

	/* */

	export class Source < V > extends Base < V >
	{
		constructor ( protected p_value : V )
		{
			super () ;
		}

		public get $ () : V
		{
			return this.p_value ;
		}

		public [ setValue ] ( new_v : V , notify : boolean = true ) : void
		{
			if ( new_v === this.p_value )  return ;

			const old_v = this.p_value ;
			this.p_value = new_v ;

			notify &&
			this.p_refs.forEach
			(
				ref => ref.vchan ( new_v , old_v )
			) ;
		}
	}

	/* */

	export class Converter < V , S > extends Base < V >
	{
		constructor
		(
			protected source : Leafr < S > ,
			protected SR : ( value : S ) => V ,
			protected RS ? : ( value : V ) => S
		)
		{
			super () ;

			const ref : Ref < S > =
			{
				lterm : () => this.terminate () ,
				vchan : ( s_new , s_old ) =>
				{
					const r_new = this.SR ( s_new ) ;
					const r_old = s_old !== undefined ? this.SR ( s_old ) : undefined ;
					this.p_refs.forEach
					(
						ref => ref.vchan ( r_new , r_old )
					)
				}
			}

			source.addRef ( ref ) ;
		}

		public get $ () : V
		{
			return this.SR ( this.source.$ ) ;
		}

		public [ setValue ] ( new_v : V , notify : boolean = true ) : void
		{
			if ( this.RS )  this.source [ setValue ]
			(
				this.RS ( new_v ) ,
				notify
			) ;
		}
	}

	/* */

	export interface Ref < V > extends Life.Ref
	{
		vchan ( newV : V , oldV ? : V ) : void ;
	}
}

export type cv < S , R > = ( value : S ) => R ;
