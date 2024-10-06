import { _set_, log } from "../common.js";
import { Leafr } from "./leaf.js";

export class Renn < S >
{
	protected _items_ : S []  = [];

	constructor( items ? : S [] )
	{
		if( items ) this.insert( items );
	}



	public get items() : S []
	{
		return this._items_;
	}

	public insert( items : S [], start : Position = undefined )
	{
		const s = start ?? this._items_.length ;

		this._items_.splice ( s, 0, ... items );

		log( "insert", items.length, this._items_.length );
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

