import { log } from "../common.js";
import { leaf , set_value , Renn } from "../model/index.js";


export class Browser < I extends Index >
{
	public readonly current = leaf < I | undefined >
	(
		undefined ,
		{ update : ( new_i ) => this.set_current( new_i ) }
	);

	public set_current( index : I | undefined )
	{
		this.current[ set_value ]( index );
		
		document.title = this.make_title( this.current.value );
	}

	public make_url() : string
	{ return "" ; }

	public make_title( index ? : I ) : string
	{
		return index?.title.value ?? "";
	}
}

export class Index < P extends Index = any >
{
	public readonly name ;
	public readonly title ;
	public readonly parts : Renn < Index < P > >;

	constructor( v : Index.value )
	{
		this.name = leaf ( v.name );
		this.title = leaf ( v.title );

		log( "Index", this.title.value );

		const parts = v.parts?.map( v => new Index < P > ( v ) );
		this.parts = new Renn < Index < P > > ( parts );
	}
}

export namespace Index
{
	export type value < p extends Index = any > =
	{
		name : string ;
		title : string ;
		parts ? : Index.value < p > [];
	};
}

