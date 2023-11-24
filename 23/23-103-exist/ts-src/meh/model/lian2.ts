import { Leaf, LoL } from "./leaf.js";

interface Exist
{
	terminate() : void ;
}

namespace Exist
{
	export interface Ref
	{
		terminate() : void
	}
}


export class LianX < V > implements Exist
{
	constructor()
	{
		;
	}

	/** protected props */

	protected array = new Array < V > ;


	/** 内容移動 */

	/** 内容生去 */

	/** 内容生去基本 */

	/**  */

	terminate(): void
	{
		;
	}
}

class Order < V > implements Exist
{
	constructor
	(
		public readonly value : V
	)
	{}

	/**  */

	public get val() : V { return this.value; }

	/**  */

	terminate(): void
	{
		;
	}
}

class Index < V > extends Order < V >
{
	public title : LoL.String = "";
	public readonly parts = new LianX < V > ;
	
	public makeTitle() : LoL.String
	{
		return String( this.value );
	}
}
