
export const LEAF_SET_VALUE = Symbol () ;
export const AGG_UPDATE = Symbol () ;


namespace Live
{
	export abstract class Leaf < V >
	{
		public set ( value : V ) { this [ LEAF_SET_VALUE ] ( value ) ; }

		abstract [ LEAF_SET_VALUE ] ( value : V , changer ? : object ) : void ;
	}

	export class Entity < V > extends Leaf < V >
	{
		override [ LEAF_SET_VALUE ] ( value : V , changer ? : object ) : void
		{
			;
		}
	}

	export const createClass = () =>
	{}
}

namespace Live
{
	export interface Aggrigate
	{
		[ AGG_UPDATE ] () : void ;
	}
}


namespace Live
{
	export const easyCreate = < V > ( value : V ) =>
	{}
}

/*
	Live
		Tough
		Easy
*/
