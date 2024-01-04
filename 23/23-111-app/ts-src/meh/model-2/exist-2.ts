abstract class Container
{
	abstract terminate() : void ;
}

abstract class Exist
{
	constructor( public readonly container : Container )
	{}

	abstract terminate() : void ;
}

class Lian extends Container
{
	override terminate(): void
	{
		;
	} 
}

class Branch extends Container
{
	override terminate(): void
	{
		
	}
}

class Leaf < V > extends Exist
{
	constructor( container : Container )
	{
		super( container );
	}

	override terminate(): void
	{
		;
	}
}

export const root = new Lian();

/** 応用例 */

{
	const lian = new Lian();

	class HSLColor extends Branch
	{
		public readonly hue ;

		constructor()
		{
			super();

			this.hue = new  Leaf < number > ( this );
		}
	}
}

