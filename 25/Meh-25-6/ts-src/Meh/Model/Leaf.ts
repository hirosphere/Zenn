import { Leafr } from "./Leafr.js" ;

export function Leaf < V > ( new_v : V , branch ? : () => void ) : Leaf.Entity < V >
{
	return new Leaf.Entity ( new_v , branch ) ;
}

export interface Leaf < V > extends Leafr < V >
{
	set ( new_v : V , isBranch : boolean ) : void ;
	get () : V ;
	set $ ( new_v : V ) ;
	get $ () : V ;
	cv < R > ( vtor : ( v : V ) => R , rtov : ( r : R ) => V ) : Leaf < R > ;
}

export namespace Leaf
{
	/* */

	export abstract class Base < V >  extends Leafr.Base < V >  implements Leaf < V >
	{
		public override set $ ( new_v : V ) { this.set ( new_v , false ) ; }
		public override get $ () : V { return this.get () ; }
		public abstract set ( new_v : V , isBranch : boolean ) : void ;
		public abstract get () : V ;
		public [ Leafr.setValue ] ( new_v : V , isBranch : boolean = false ) : void
		{
			this.set ( new_v , isBranch ) ; 
		}

		public cv < R > ( vtor : ( v : V ) => R , rtov : ( r : R ) => V ) : Leaf < R >
		{
			return new Converter ( this , vtor , rtov ) ;
		}
	}

	export class Entity < V > extends Leafr.Entity < V >  implements Leaf < V >
	{
		public set ( new_v : V , isBranch : boolean = false )  {  this [ Leafr.setValue ] ( new_v , isBranch )  }
		public get () : V { return this.p_value ; }

		public override set $ ( new_v : V ) { this [ Leafr.setValue ] ( new_v ) ; }
		public override get $ () : V { return this.p_value ; }

		public cv < R > ( vtor : ( v : V ) => R , rtov : ( r : R ) => V ) : Leaf < R >
		{
			return new Converter ( this , vtor , rtov ) ;
		}

	}

	export class Converter < V , S > extends Leafr.Converter < V , S >  implements Leaf < V >
	{
		public set ( new_v : V , isBranch : boolean = false )  {  this [ Leafr.setValue ] ( new_v , isBranch )  }
		public get () : V  { return super.$ ; }

		public override set $ ( new_v : V ) { this [ Leafr.setValue ] ( new_v ) ; }
		public override get $ () : V { return super.$ ; }

		public cv < R > ( vtor : ( v : V ) => R , rtov : ( r : R ) => V ) : Leaf < R >
		{
			return new Converter ( this , vtor , rtov ) ;
		}
	}
}

