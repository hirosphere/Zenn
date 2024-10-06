import { _set_, log } from "../common.js";
import { Leaf, Leafr, Renn } from "../model/index.js";


export class Browser
{
	public readonly current = new Leafr < Index | undefined > ( undefined );

	public set_current( index : Index | undefined )
	{
		this.current[ _set_ ]( index );
		
		document.title = this.make_title( this.current.value );
	}

	public make_url()
	{}

	public make_title( index ? : Index ) : string
	{
		return index?.title.value ?? "";
	}
}

export class Index < P extends Index = any >
{
	public readonly name ;
	public readonly title ;
	public readonly parts : Renn < Index < P > >;

	constructor( v : Index.values )
	{
		this.name = new Leaf.str( v.name );
		this.title = new Leaf.str( v.title );

		log( "Index", this.title.value );

		const parts = v.parts?.map( v => new Index < P > ( v ) );
		this.parts = new Renn < Index < P > > ( parts );
	}
}

export namespace Index
{
	export type values < p extends Index = any > =
	{
		name : string ;
		title : string ;
		parts ? : Index.values < p > [];
	};
}

