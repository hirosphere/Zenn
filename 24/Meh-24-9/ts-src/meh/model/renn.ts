
export class Renn < V >
{
	constructor( protected _values_ : V [] = [] )
	{
		;
	}

	public get values() : V []
	{
		return this._values_;
	}

	public insert( values : V [], start : Position )
	{
		;
	}
}

type Position = number | undefined ;
