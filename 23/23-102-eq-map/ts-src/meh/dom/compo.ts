import { Leaf, LoL, Ref, ToString } from "../model/leaf.js";
import { defs } from "./defs.js";
import { Parts } from "./parts.js";

const log = console.log;

class Refs extends Set < Ref > {}

//

export class Component
{
	e ? : Element;
	parts ? : Parts;
	refs = new Refs;

	constructor( def : defs.Element, ce : Element | null )
	{
		this.e = this.createElement( def, ce );
	}

	createElement( def : defs.Element, ce : Element | null ) : Element
	{
		const { type, class: className, props, attrs, style, acts, optActs, parts } =  def;

		const e = document.createElement( type );

		if( className ) this.bindClass(  e, className );

		if( props ) this.bindProps( e, props );
		if( attrs ) this.bindAttrs( e, attrs );
		if( style ) this.bindStyle( e, style );
		if( acts ) this.bindActs( e, acts );
		if( optActs ) this.bindOptActs( e, optActs );
		
		if( parts ) Parts.create( this, e, parts );

		if( ce ) ce.appendChild( e );

		return e;
	}

	// bind opers //

	bindClass ( e : Element, def : defs.Class )
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

	bindProps ( e : Element, def : AnyObj )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindText( e, name, value, this.refs );
		}
	}

	bindAttrs ( e : Element, def : defs.Attrs )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindAttr( e, name, value, this.refs );
		}
	}

	bindStyle ( e : HTMLElement, def : defs.Style )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindText( e.style, name, value, this.refs );
		}
	}

	bindActs ( e : Element, def : defs.Actions )
	{
		for( const [ name, act ] of Object.entries( def ) )
		{
			e.addEventListener( name, act as EventListener );
		}
	}

	bindOptActs ( e : Element, def : defs.OptActions )
	{
		for( const [ name, actdef ] of Object.entries( def ) )
		{
			const [ act, opt ] = actdef;
			e.addEventListener( name, act as EventListener, opt );

			log( "optAct", name, opt )
		}
	}

	//  //

	delete()
	{
		this.parts?.delete();
		delete this.parts;
		
		this.refs.forEach( ref => ref.release() );
		this.refs.clear();

		delete this.e;
	}
}




type AnyObj = Record < string, any > ;

const bindClass = ( e : Element, name : string, value : LoL.Boolean, refs : Refs ) =>
{
	if( value instanceof Leaf )
	{
		refs.add( value.ref( ( value ) => e.classList.toggle( name, value ) ) );
	}
	
	else  e.classList.toggle( name, value );
}

const bindProp = ( target : any, name : string, value : any, refs : Refs ) =>
{
	if( value instanceof ToString )
	{
		refs.add( value.ref( () => { target[ name ] = value.toString() } ) );
	}

	else  target[ name ] = value;
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

export const bindText = ( target : any, name : string, text : any, refs : Refs ) =>
{
	if( text instanceof ToString )
	{
		refs.add( text.ref( () => { target[ name ] = text.toString() } ) );
	}

	else
	{
		target[ name ] = text;
	}
};
