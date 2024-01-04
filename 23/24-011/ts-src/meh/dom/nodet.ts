import { Container, Exist } from "../model/exist.js";
import { Leafr, LeafrRefFactory } from "../model/leaf.js";
import { defs } from "./defs.js";
import { PartFragment, createParts } from "./parts.js"
const log = console.log; 

/** class Nodet
 * 
 * DOMNode, DOMElementのプロパティーと要素をリアクティブにする委譲クラス。
 * 
*/

export class Nodet extends Exist
{
	protected parts ? : PartFragment;
	protected refs = new Exist.Refs;
	protected _e ? : Element;

	public get e() : Element | undefined { return this._e ; }

	constructor( container : Container, def : defs.Node, ce : Element | null, rel ? : Node )
	{
		super( container );

		const node = ( def instanceof defs.Element ) ?
			( this._e = this.createElement( def ) ) :
			this.createText( def )
		;

		log( ce, node )

		ce?.insertBefore( node, rel || null );
	}

	protected createElement( def : defs.Element ) : Element
	{
		const e = document.createElement( def.type );
		
		let { attrs,  } = def.echar || {};

		if( attrs )
		{
			for( let [ name, value ] of Object.entries( attrs ) )
			{
				this.bindAttr( e, name, value );
			}
		}

		if( def.parts ) this.parts = createParts( this, def.parts );

		
		attrs = undefined;
		return e;
	}

	protected bindAttr( e : Element, name :string, value : defs.Text ) : void
	{
		if( value instanceof LeafrRefFactory )
		{
			value.createRef
			(
				this.refs,
				newv => setAttr( e, name, newv, value.tostr )
			);
		}
		else setAttr( e, name, String( value ) );
	}

	protected createText( def : defs.Text ) : Text
	{
		const node = document.createTextNode( "" );
		if( def instanceof LeafrRefFactory )
		{
			def.createRef
			(
				this.refs,
				newv => node.nodeValue =  String( newv ) || ""
			);
		}
		else node.nodeValue = String( def );
		return node;
	}

	public override terminate() : void
	{
		this.parts?.terminate();
		this.refs.terminate();
		super.terminate();
	}
}

const setAttr = ( e : Element, name : string, value : any, tostr ? : Leafr.tostr < any > | null ) : void =>
{
	e.setAttribute( name, tostr ? tostr( value ) : String( value ) );
};

