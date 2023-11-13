/*
	[ class Nodette ]

	ひとつのDOMノード( Element, Text )のライフを管理。
	・DOMノードとデータオブジェクト(Leaf)の結びつけと解放。
	・対象DOMノードのコンテナエレメントへの結びつけと解放。
*/


import { Leaf, LoL, Ref, StringSource } from "../model/leaf.js";
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
	private hook ? : Hook;

	constructor( def : defs.Node, ce : Element | null, nextNode ? : Node )
	{
		if( typeof def == "object" && "isElement" in def )  this.createElement( def, ce, nextNode );
		else  this.createText( def, ce, nextNode );

		this.hook?.init();
	}

	private createElement( def : defs.Element, ce : Element | null, nextNode ? : Node ) : Element
	{
		const e = ( def.ns ? document.createElementNS( def.ns, def.type ) : document.createElement( def.type ) );
		this.node = this.element = e;

		if( def.class ) this.bindClass(  e, def.class );
		if( def.attrs ) this.bindAttrs( e, def.attrs );
		if( def.props ) this.bindProps( e, def.props );
		if( def.style ) this.bindStyle( e, def.style );
		if( def.acts ) this.bindActs( e, def.acts );
		if( def.actActs ) this.bindActs( e, def.actActs, { passive: false } );		
		if( def.optActs ) this.bindOptActs( e, def.optActs );
		if( def.hook )
		{
			def.hook[ hook_e ] = e;
			this.hook = def.hook;
		};
		
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
		if( def instanceof Array ) {
			for( const subdef of def )  this.bindClass( e, subdef );
			return;
		}

		if( typeof def == "string" || def instanceof Leaf ) {
			bindText( e, "className", def, this.refs );
		}

		else if( typeof def == "object" ) {
			for( const [ name, value ] of Object.entries( def ) ) {
				bindClass( e, name, value, this.refs );
			}
		}
	}

	private bindProps ( e : Element, def : Record < string, any > ) :void
	{
		for( const [ name, value ] of Object.entries( def ) ) {
			bindText( e, name, value, this.refs );
		}
	}

	private bindAttrs ( e : Element, def : defs.Attrs ) :void
	{
		for( const [ name, value ] of Object.entries( def ) ) {
			bindAttr( e, name, value, this.refs );
		}
	}

	private bindStyle ( e : Element, def : defs.Style ) :void
	{
		if( ! ( e instanceof HTMLElement || e instanceof SVGElement ) )  return;

		for( const [ name, value ] of Object.entries( def ) ) {
			bindText( e.style, name, value || "", this.refs );
		}
	}

	private bindActs ( e : Element, def : defs.Actions, opt ? : AddEventListenerOptions ) :void
	{
		for( const [ name, act ] of Object.entries( def ) ) {
			e.addEventListener( name, act as EventListener, opt );
		}
	}

	private bindOptActs ( e : Element, def : defs.OptActions ) :void
	{
		for( const [ name, actdef ] of Object.entries( def ) ) {
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
	if( value instanceof Leaf ) {
		refs.add( value.createRef( ( value ) => e.classList.toggle( name, value ) ) );
	}
	else  e.classList.toggle( name, value );
}


const bindAttr = ( e : Element, name : string, value : defs.Text, refs : Refs ) =>
{
	if( value instanceof Leaf ) {
		refs.add( value.createRef( () => setAttr( e, name, value.get() ) ) );
	}
	else if( value instanceof StringSource ) {
		refs.add( value.createRef( () => setAttr( e, name, value.toString() ) ) );
	}
	else setAttr( e, name, value );
};

const setAttr = ( e : Element, name : string, value : boolean | number | string ) =>
{
	if( typeof value == "boolean" ) {
		value ? e.setAttribute( name, "true" ) : e.removeAttribute( name );
	}
	else{
		e.setAttribute( name, String( value ) );
	}
}

const bindText = ( target: Record < string, any >, name: string, value: defs.Text, refs: Refs ) =>
{
	if( value instanceof StringSource ) {
		refs.add( value.createRef( () => { target[ name ] = value } ) );
	}
	else  target[ name ] = value;
};


/** hook */

export const newhook = () : Hook =>
{
	return new Hook();
};

const hook_e = Symbol();

export class Hook < E extends Element = Element >
{
	public get e() : Element | null { return this[ hook_e ]; };
	public [ hook_e ] : Element | null = null;
	public init() {}
}
