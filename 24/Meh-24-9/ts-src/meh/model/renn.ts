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

	public insert( srcs : S [], start ? : pos )
	{
		start = pos_trim( start, srcs ) ;

		this._items_.splice ( start, 0, ... srcs );

		this._orders_.splice
		(
			start, 0,
			... srcs.map( src => new Order( src ) )
		);

		log( "insert", srcs.length, this._items_.length );
	}
}

const pos_trim = ( pos : pos, ar : Array < any > ) =>
{
	if( pos === undefined || pos >= ar.length )  return ar.length ;
	if( pos < 0 )  return 0 ;
	return pos ;
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
