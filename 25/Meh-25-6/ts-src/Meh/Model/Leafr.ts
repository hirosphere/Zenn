import { Existence } from "./Existence.js" ;

export const setValue = Symbol () ;

export interface Leafr < V > extends Existence
{
	set vch ( vch : Leafr.vch < V > ) ;
	
	get $ () : V ;

	[ setValue ] ( new_v : V , notify : boolean ) : void ;

	cvr < R >
	(
		stor : ( srcv : V ) => R ,
		rtos ? : ( refv : R ) => V
	
	) : Leafr.Converter < R , V > ;
}


export namespace Leafr
{
	export const create = < V > ( iv : V ) : Source < V > => new Source ( iv ) ;

	/* */

	export abstract class Base < V >  extends Existence  implements Leafr < V >
	{
		protected p_vch = new Set < vch < V > > ;

		public set vch ( vch : Leafr.vch < V > ) { this.p_vch.add ( vch ) ; }

		public abstract get $ () : V ;
		public abstract [ setValue ] ( new_v : V , notify : boolean ) : void ;

		public cvr < R > ( stor : ( srcv : V ) => R , rtos ? : ( refv : R ) => V ) : Converter < R , V >
		{
			return new Converter < R , V > ( this , stor , rtos ) ;
		}

		public override terminate() : void
		{
			this.p_vch.clear () ;
			super.terminate () ;
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
			this.p_vch.forEach
			(
				vch => vch ( new_v , old_v , this )
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

			source.vch = ( new_v , old_v ) =>
			{
				const r_new_v = this.SR ( new_v ) ;
				const r_old_v = old_v !== undefined ? this.SR ( old_v ) : undefined ;
				this.p_vch.forEach ( vch => vch ( r_new_v , r_old_v , this ) ) ;
			}
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

	export type vch < V > =
	(
		new_v : V ,
		old_v : V | undefined ,
		source : Leafr < V >
	
	) => void ;
}

export type cv < S , R > = ( value : S ) => R ;
