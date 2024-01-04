import { Exist } from "./exist.js";

export class Lian < I extends Exist >
{
	/** */


	/** */

	public get orders() : Array < I > { return this.p_orders; }
	protected p_orders : Array < I > = [];

	/** */

	public insert() : void {}
}
