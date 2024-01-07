import { Container, Exist } from "../model/exist.js";
import { Leafr, StringSource } from "../model/leaf.js";
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
	protected refs ? : Exist.Refs;
	protected acts ? : Map < string, EventListener [] > ;
	protected _e ? : Element ;

	constructor
	(
		container :  Container,
		def       :  defs.Node,
		ce        :  Element | null,
		rel ?     :  Node
	)
	{
		super( container );

		const node = ( def instanceof defs.Element ) ?
			this.createElement( def ) :
			this.createText( def )
		;	

		ce?.insertBefore( node, rel || null );
	}

	/** element */

	protected createElement( def : defs.Element ) : Element
	{
		const e = this._e = document.createElement( def.type );
		
		let { attrs, props, acts } = def.echar || {};

		if( def.echar?.class )
		{
			this.bindClass( e, def.echar.class );
		}

		if( attrs )
		{
			for( let [ name, value ] of Object.entries( attrs ) )
			{
				this.bindAttr( e, name, value );
			}
		}

		if( props )
		{
			for( let [ name, value ] of Object.entries( props ) )
			{
				this.bindProp( e, name, value );
			}
		}

		if( acts )
		{
			for( let [ name, act ] of Object.entries( acts ) )
			{
				this.bindAct( e, name, act );
			}
		}

		if( def.parts ) this.parts = createParts( this, e, def.parts );

		
		attrs = undefined;
		return e;
	}

	protected bindClass( e : Element, def : defs.Class )
	{
		if( typeof def == "string" )  e.className = def;
	}

	protected bindAttr( e : Element, name :string, value : defs.Text ) : void
	{
		this.refs = this.refs || new Exist.Refs;

		if( value instanceof StringSource )
		{
			value.createRef
			(
				this.refs,
				note => setAttr( e, name, note.newstr, value.tostr )
			);
		}
		else setAttr( e, name, String( value ) );
	}

	protected bindProp( e : any, name :string, value : defs.Text ) : void
	{
		this.refs = this.refs || new Exist.Refs;

		if( value instanceof StringSource )
		{
			value.createRef
			(
				this.refs,
				note => e[ name ] = note.newstr
			);
		}
		else e[ name ] = value;
	}
	
	protected bindAct( e : Element, name : string, act : defs.Act )
	{
		this.acts = this.acts || new Map < string, EventListener [] > ;

		if( this.acts.has( name ) )  this.acts.get( name )?.push( act );
		else this.acts.set( name, [ act ] );

		e.addEventListener( name, act );
	}

	/** text */

	protected createText( text : defs.Text ) : Text
	{
		this.refs = this.refs || new Exist.Refs;

		const node = document.createTextNode( "" );
		if( text instanceof StringSource )
		{
			log( "createText", text );

			text.createRef
			(
				this.refs,
				note =>
				{
					log( ` ** ${ note.newstr } ${ note.oldstr } ** ` )
					node.nodeValue = note.newstr || "";
				}
			);
		}
		else node.nodeValue = String( text );
		return node;
	}

	/** life */

	public override terminate() : void
	{
		if( this._e && this.acts )
		{
			for( let [ name, acts ] of this.acts )
			{
				log( name );
				acts.forEach( act => this._e?.removeEventListener( name, act ) );
			}
		}

		this.parts?.terminate();
		this.refs?.terminate();
		super.terminate();
	}
}

const setAttr = ( e : Element, name : string, value : any, tostr ? : Leafr.tostr < any > | null ) : void =>
{
	e.setAttribute( name, tostr ? tostr( value ) : String( value ) );
};

