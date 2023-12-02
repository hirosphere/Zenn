import { Owner, Exist, LeafRo, StrSrcFactory } from "../model/index.js";
import { defs } from "./defs.js";
import { PartsFragment, createParts } from "./parts.js";
const log = console.log;


/** class Nodet */

type Style = Omit< CSSStyleDeclaration, "length" | "parentRule" >;

export class Nodet extends Exist
{
	constructor( owner : Owner, def : defs.Node, ce : Element, rel ? : Node )
	{
		super( owner );

		if( def instanceof defs.Element ) this.node = this.createElement( def );
		else this.node = this.createText( def );

		ce && ce.insertBefore( this.node, rel || null );
	}

	/**  */

	protected node ? : Node;
	protected parts ? : PartsFragment;
	protected sources = new Set < Ref > ;


	/** 値リアクティブなテキストノードを生成 */

	protected createText( value : defs.Text ) : Text
	{
		const n = document.createTextNode( "" );

		if( value instanceof StrSrcFactory )
		{
			this.sources.add( new Ref( value, str => n.nodeValue = str ) );
		}
		else  n.nodeValue = "" + value;

		return n;
	}

	/** 値・構造リアクティブなエレメントを生成 */

	protected createElement( def : defs.Element ) : Element
	{
		const e = document.createElement( def.type );

		const { style, acts } = def.chars || {};

		if( def.parts ) this.parts = createParts( this, def.parts, e );

		if( style ) {
			for( const [ name, value ] of Object.entries( style ) ){
				this.bindStyle( e.style, name, value );
		}}

		if( acts )  for( const [ name, act ] of Object.entries( acts ) ) this.bindAction( e, name, act );

		return e;
	}

	/** 諸属性値をリアクティブに結合 */

	protected bindStyle( s : any, name : string, value : any )  :void
	{
		if( value instanceof StrSrcFactory )
		{
			this.sources.add( new Ref( value, str => { s[ name ] = str; } ) );
		}
		else s[ name ] = "" + value;
	}

	protected bindAction( e : Element, name : string, act : defs.Action ) : void
	{
		e.addEventListener( name, act );
	}


	/**  */

	public terminate(): void
	{
		this.node?.parentNode?.removeChild( this.node );
		this.sources.forEach( source => source.release() );
		this.sources.clear();
		delete this.node;
		super.terminate();
	}
}

/** Ref */

class Ref extends LeafRo.Ref
{
	constructor( fac : StrSrcFactory, private update : ( str : string ) => void )
	{
		super();

		const src = fac.createStrSrc();
		
		this.tostr = src.tostr;
		this.source = src.source;
	}

	private tostr;

	/**  */

	private getstring() : string { return this.source ? this.tostr( this.source.value ) : ""; }

	/**  */

	public onSourceChange(): void { this.update( this.getstring() ); }
	public onValueChange( newv: any, oldv?: any ): void { this.update( this.getstring() ); }
}
