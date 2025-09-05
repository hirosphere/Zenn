
type Leaf < V > =
{
	get $ () : V ;
}

namespace Live
{
	export class Entity < V > implements Leaf < V >
	{
		#_value : V ;

		constructor ( value : V )
		{
			this.#_value = value ;
		}

		public get $ () : V
		{
			return this.#_value ;
		}
	}

	export class Number extends Entity < number >
	{}

	type Branch < V extends object > = Leaf < V >
	{
	}

	export const Branch = < V extends object > ( ctors : PropCtors < V > ) : new () => Branch < V > =>
	{
		return class Branch
		{
			public get $ () : V { return {} as V ; }
		}
	}

	export type PropCtors < V extends object > =
	{
		[ prop in keyof V ] : new ( value : V [ prop ] ) => Entity < V [ prop ] > ;
	}

	export type Constructor < V > = new (  ) => Entity < V > ;

}

class ExNumber extends Live.Number {}

type xy = { x : number } ;
class XY extends Live.Branch < xy > ( { x : ExNumber } )
{
	op ()
	{
		this.$ ;
	}
}









/*

	* Object
		* フィールド存在の担保


 */
