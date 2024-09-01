import { Exist, Branch, Leafr, Leaf, Renn, root } from "./index.js";
import _ls from "../ls.js";
//const { ls } = _ls.model
const log = console.log;

export class Browser extends Branch
{
	public root = location.pathname;
	public readonly index = new Leaf < Index | null > ( this, null );

	constructor( con : Exist, protected acts ? : Browser.Acts )
	{
		super( con );
	}

	public override update(): void
	{
		console.log( "Browser update()", this.index.val?.title.val );
		
		document.title = this.make_title( this.index.value );
	}

	public make_link( index : Index ) : string
	{
		return this.root;
	}

	protected make_title( index : Index | null ) : string
	{
		log( "make_title", index?.title.value ?? "!!!" )

		return index?.title.value ?? "..."
	}
};

export namespace Browser
{
	export type Acts =
	{
		
	}
}

export class Index extends Exist
{
	public readonly title : Leaf.String ;
	public readonly path;
	public readonly parts = new Renn < Index > ( this );

	constructor( con : Exist.Container, protected browser : Browser, initv : Index.initv )
	{
		super( con );

		this.title = Leaf.make( this, initv?.title ?? "" );
		this.path = new Leafr.String( this, initv?.path ?? "" );
	}

	public get link() : string
	{
		log( this.title.value )
		return this.browser.make_link( this );
	}
}

export namespace Index
{
	export type initv =
	{
		title ? : Leaf.LoL.String ;
		path ? : string ;
	};
}
