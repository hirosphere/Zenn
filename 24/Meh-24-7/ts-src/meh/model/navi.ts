import { Exist, Branch, Leafr, Leaf, Renn, root } from "./index.js";
import { _setvalue } from "../shadow-props.js";
const log = console.log;

export class Browser extends Exist
{
	constructor( com : Exist, protected args ? : Browser.args )
	{
		super( com );
	}

	public readonly current = new Leafr < Index | undefined > ( this, undefined );

	public set_current( index : Index | undefined, tohistory : boolean = false ) : void
	{
		this.current[ _setvalue ]( index );

		document.title =
			this.current ?. val ?. title.val ??
			this.args ?. default_title ??
			""
		;
	}
}

export namespace Browser
{
	export type args =
	{
		default_title ? : string ;
	};

	export class Item
	{
		constructor
		(
			protected browser : Browser,
			public readonly index : Index | undefined
		)
		{}

		public select( to_history : boolean = false ) : void
		{
			this.browser.set_current( this.index, to_history );
		}
	}
}

export class Index < P extends Index = any > extends Exist
{
	public readonly title : Leaf.String ;
	public readonly path;
	public readonly parts = new Renn < P > ( this );

	constructor( con : Exist.Container, initv : Index.initv )
	{
		super( con );

		this.title = Leaf.make( this, initv?.title ?? "" );
		this.path = new Leafr.String( this, initv?.path ?? "" );
	}

	public get link() : string
	{
		log( this.title.value );
		return "";
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
