/* Renn の Order をキーとした選択・フォーカスシステム */

import { Leaf , Renn , Order } from "../Model/Model.js" ;

type ud = undefined ;
const ud = undefined ;

class Key < T >
{
	constructor
	(
		public readonly curr : Leaf < Order < T > | ud > ,
	)
	{}

	public set ( o : Order < T > | ud = ud ) : void
	{
		this.curr.$ = o ;
	}
}

class Item < T >
{
	constructor
	()
	{}

	
}

