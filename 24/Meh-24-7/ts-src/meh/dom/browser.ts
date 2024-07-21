import { Exist, } from "../model/exist.js";
import { Leaf } from "../model/leaf.js";

type InitV =
{
	title ? : string ;
}

export class Browser extends Exist
{
	public readonly title : Leaf.String;

	constructor( com : Exist, initv ? : InitV )
	{
		super( com );

		this.title = new Leaf.String( this, initv?.title ?? "", () => this.updatetitle() );

		this.updatetitle();
	}

	protected updatetitle()
	{
		document.title = this.title.value;
	}
}
