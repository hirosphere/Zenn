import { Life } from "./Life.js" ;

export function Leafr < V > ( new_v : V , branch ? : () => void ) : Leafr.Entity < V >
{
	return new Leafr.Entity ( new_v , branch ) ;
}

export interface Leafr < V >  extends Life < Leafr.Ref < V > >
{
	[ Leafr.LeafrTag ] : Symbol ;
	get $ () : V ;
	[ Leafr.setValue ] ( new_v : V , isBranch ? : boolean ) : void ;
	addRef ( ref : Leafr.Ref < V > ) : void ;
	cvr < R > ( vtor : ( v : V ) => R , rtov ? : ( r : R ) => V ) : Leafr < R > ;
}


export namespace Leafr
{
	export const setValue = Symbol () ;
	export const LeafrTag = Symbol () ;

	/* */

	export abstract class Base < V > extends Life < Ref < V > > implements Leafr < V >
	{
		public readonly [ LeafrTag ] = LeafrTag ;

		public abstract get $ () : V ;
		public abstract [ setValue ] ( new_v : V , isBranch : boolean ) : void ;

		public override addRef ( ref : Leafr.Ref < V > ) : void
		{
			super.addRef ( ref ) ;
			ref.vchan ( this.$ ) ;
		}

		public cvr < R > ( vtor : ( v : V ) => R , rtov ? : ( r : R ) => V ) : Leafr < R >
		{
			return new Converter ( this , vtor , rtov ) ;
		}
	}

	export class Entity < V > extends Base < V >
	{
		constructor ( protected p_value : V , protected p_branch ? : () => void )
		{
			super () ;
		}

		public override get $ () : V { return this.p_value ; }

		public override [ setValue ] ( new_v : V , isBranch : boolean = false ) : void
		{
			if ( new_v === this.p_value )  return ;
			const old_v = this.p_value ;
			this.p_value = new_v ;
			if( ! isBranch ) this.p_branch ?.() ;
			this.p_refs.forEach ( ref => ref.vchan ( new_v , old_v ) ) ;
		}
	}

	export class Converter < V , S > extends Base < V >
	{
		constructor
		(
			protected source : Leafr < S > ,
			protected stov : ( v : S ) => V ,
			protected vtos ? : ( v : V ) => S
		)
		{
			super () ;

			const ref =
			{
				lterm : () => this.terminate () , 
				vchan : this.notify
			}
			source.addRef ( ref ) ;
		}

		public override [ setValue ] ( new_v : V , isBranch : boolean = false )
		{
			if ( this.vtos )  this.source [ setValue ] ( this.vtos ( new_v ) ) ;
		}

		public override get $ () : V { return this.stov ( this.source.$ ) ; }

		protected notify = ( s_new : S , s_old ? : S ) : void =>
		{
			const new_v = this.stov ( s_new ) ;
			const old_v = ( s_old !== undefined ? this.stov ( s_old ) : undefined ) ;

			this.p_refs.forEach ( ref => ref.vchan ( new_v , old_v ) ) ;
		}
	}

	export abstract class Branch < V >  extends Base < V >
	{
		;
	}

	/* Ref */

	export interface Ref < V > extends Life.Ref
	{
		vchan : ( new_v : V , old_v ? : V ) => void ;
	}
}
