import { _set_, log } from "../common.js";
import { Leafr } from "./leaf.js";

export class Renn < S >
{
	protected _items_ : S []  = [];
	protected _orders_ : Order < S > [] = [] ;

	constructor( items ? : S [] )
	{
		if( items ) this.insert( items );
	}


	public get items() : S []
	{
		return this._items_;
	}

	public insert( srcs : S [], start : pos = undefined )
	{
		const s = start ?? this._items_.length ;

		this._items_.splice ( s, 0, ... srcs );

		this._orders_.splice
		(
			s,
			0,
			... srcs.map
			(
				src => new Order < S > ( src )
			)
		);

		log( "insert", srcs.length, this._items_.length );
	}
}

export class Order < S > extends Leafr < pos >
{
	constructor
	(
		public readonly source : S, order : pos = undefined )
	{
		super( order );
	}
}


type pos = number | undefined ;
