import { _set_ } from "../common.js";
import { Leafr } from "./leaf.js";

export class Renn < S >
{
	constructor( protected _items_ : S [] = [] )
	{
		;
	}



	public get items() : S []
	{
		return this._items_;
	}

	public insert( items : S [], start : Position )
	{
		;
	}
}

type Position = number | undefined ;

export class Order < S > extends Leafr.num
{
	constructor
	(
		public readonly source : S, ord : number )
	{
		super( ord );
	}
}

