import { Exist, Leaf } from "./index.js";

export class Index extends Exist
{
	title : Leaf.String ;

	constructor( con : Exist.Container, args : Index.args )
	{
		super( con );

		this.title = Leaf.make( this, args.title );
	}
}

export namespace Index
{
	export type args =
	{
		title : Leaf.LoL.String ;
	};
}
