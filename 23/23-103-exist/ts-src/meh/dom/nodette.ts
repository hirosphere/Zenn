import { Leaf, LoL, Ref, ToString } from "../model/leaf.js";
import { defs } from "./defs.js";
import { Parts as Parts } from "./parts.js";

const log = console.log;

class Refs extends Set < Ref > {}

//

export class Nodette
{
	public node ? : Node;
	public element : Element | null = null;
	private parts ? : Parts;
	private refs = new Refs;

	constructor( def : defs.Node, ce : Element | null, nextNode ? : Node )
	{
		if( typeof def == "object" && "isElement" in def )  this.createElement( def, ce, nextNode );
		else  this.createText( def, ce, nextNode );
	}

	private createElement( def : defs.Element, ce : Element | null, nextNode ? : Node ) : Element
	{
		const { type, class: className, props, attrs, style, acts, actActs, optActs, parts } =  def;

		const e = document.createElement( type );
		this.node = this.element = e;

		if( className ) this.bindClass(  e, className );
		if( props ) this.bindProps( e, props );
		if( attrs ) this.bindAttrs( e, attrs );
		if( style ) this.bindStyle( e, style );
		if( acts ) this.bindActs( e, acts );
		if( actActs ) this.bindActs( e, actActs, { passive: false } );		
		if( optActs ) this.bindOptActs( e, optActs );
		
		if( def.parts ) this.parts = Parts.create( this, def.parts );

		if( ce ) ce.insertBefore( e, nextNode || null );

		return e;
	}

	private createText( def : defs.Text, ce : Element | null, nextNode ? : Node ) : Text
	{
		const node = document.createTextNode( "" );
		bindText( node, "nodeValue", def, this.refs );

		if( ce )  ce.insertBefore( node, nextNode || null );

		this.node = node;
		return node;
	}

	// bind opers //

	private bindClass ( e : Element, def : defs.Class ) :void
	{
		if( def instanceof Array )
		{
			for( const subdef of def )  this.bindClass( e, subdef );
			return;
		}

		if( typeof def == "string" || def instanceof Leaf )
		{
			bindText( e, "className", def, this.refs );
		}

		else if( typeof def == "object" )
		{
			for( const [ name, value ] of Object.entries( def ) )
			{
				bindClass( e, name, value, this.refs );
			}
		}
	}

	private bindProps ( e : Element, def : Record < string, any > ) :void
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindText( e, name, value, this.refs );
		}
	}

	private bindAttrs ( e : Element, def : defs.Attrs ) :void
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindAttr( e, name, value, this.refs );
		}
	}

	private bindStyle ( e : HTMLElement, def : defs.Style ) :void
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindText( e.style, name, value || "", this.refs );
		}
	}

	private bindActs ( e : Element, def : defs.Actions, opt ? : AddEventListenerOptions ) :void
	{
		for( const [ name, act ] of Object.entries( def ) )
		{
			e.addEventListener( name, act as EventListener, opt );
		}
	}

	private bindOptActs ( e : Element, def : defs.OptActions ) :void
	{
		for( const [ name, actdef ] of Object.entries( def ) )
		{
			const [ act, opt ] = actdef;
			e.addEventListener( name, act as EventListener, opt );
		}
	}

	//  //

	public delete() :void
	{
		this.node?.parentElement?.removeChild( this.node );

		this.parts?.delete();
		this.refs.forEach( ref => ref.release() );
		this.refs.clear();
	}
}

// binds //

const bindClass = ( e : Element, name : string, value : LoL.Boolean, refs : Refs ) =>
{
	if( value instanceof Leaf )
	{
		refs.add( value.ref( ( value ) => e.classList.toggle( name, value ) ) );
	}
	
	else  e.classList.toggle( name, value );
}


const bindAttr = ( e : Element, name : string, value : defs.Text, refs : Refs ) =>
{
	if( value instanceof Leaf )
	{
		refs.add( value.ref( () => setAttr( e, name, value.get() ) ) );
	}

	else if( value instanceof ToString )
	{
		refs.add( value.ref( () => setAttr( e, name, value.toString() ) ) );
	}

	else setAttr( e, name, value );
};

const setAttr = ( e : Element, name : string, value : boolean | number | string ) =>
{
	if( typeof value == "boolean" )
	{
		value ? e.setAttribute( name, "" ) : e.removeAttribute( name );
	}
	
	else
	{
		e.setAttribute( name, String( value ) );
	}
}

export const bindText = ( target : any, name : string, text : defs.Text, refs : Refs ) =>
{
	if( text instanceof ToString )
	{
		refs.add( text.ref( () => { target[ name ] = text.toString() } ) );
	}

	else  target[ name ] = text;
};
