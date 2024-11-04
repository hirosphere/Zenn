import { Leafr , leafr , set_value } from "./leafr.js" ;

export interface Leaf < V > extends Leafr < V >
{
	get value () : V ;
	set value ( value : V ) ;
	
	set ( new_v : V, is_rooting ? : boolean ) : void ;
}

export namespace Leaf
{
	export class Entity < V > extends Leafr.Entity < V >
	{
		public override get value () : V { return this.p_value ; }
		public override set value ( value : V ) { this.set ( value ) ; }

		public set ( new_v : V, is_permeating ? : boolean ) : void
		{
			this [ set_value ] (  new_v , is_permeating ) ;
		}
	}
}

export namespace Leaf
{
	export type str = Leaf < string > ;
	export type num = Leaf < number > ;
	export type bool = Leaf < boolean > ;
}


export function leaf < V > ( value : V , rel ? : Leafr.Rel ) : Leaf < V >
{
	return new Leaf.Entity ( value, rel ) ;
}

export namespace leaf
{
	export const str = leaf < string > ;
	export const num = leaf < number > ;
	export const bool = leaf < boolean > ;
}

export namespace leaf
{
	export type types < V > = Leaf < V > ;

	export namespace types
	{
		export type str = Leaf < string > ;
		export type num = Leaf < number > ;
		export type bool = Leaf < boolean > ;

		export type lol < V > = V | Leaf < V > ;

		export namespace lol
		{
			export type str = lol < string > ;
			export type num = lol < number > ;
			export type bool = lol < boolean > ;
		}
	}
}
