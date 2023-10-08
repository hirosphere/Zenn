import { Leaf, LoL, Ref, ToStr } from "../model/leaf.js";
import { defs } from "./defs.js";
import { Parts } from "./parts.js";

const log = console.log;

//

export class Component
{
	e : Element | null = null;
	partsList = new Set < Parts >;
	refs = new Set < Ref > ();

	constructor( def : defs.Element, ce : Element | null )
	{
		this.e = this.createElement( def, ce );
	}

	createElement( def : defs.Element, ce : Element | null ) : Element
	{
		const { type, props, parts } =  def;

		const e = document.createElement( type );
		// if( parts ) this.createParts( e, parts );
		if( parts ) Parts.create( this, e, parts );
		if( props ) this.bindProps( props, e );

		if( ce ) ce.appendChild( e );

		return e;
	}

	bindProps( def : AnyObj, e : Element )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			if( name == "attrs" ) this.bindAttrs( value, e );
			else if( name == "class" ) this.bindClass( value, e );
			else if( name == "style" && e instanceof HTMLElement ) this.bindStyle( value, e );
			else bindText( e, name, value, this.refs );
		}
	}

	bindClass( def : defs.Class, e : Element )
	{
		if( def instanceof Array )
		{
			for( const subdef of def )  this.bindClass( subdef, e );
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

	bindAttrs( def : AnyObj, e : Element )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			log( "attr", name, value )
			bindText( e, name, value, this.refs );
		}
	}

	bindStyle( def : defs.Style, e : HTMLElement )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			bindText( e.style, name, value, this.refs );
		}
	}

	terminate()
	{
		this.partsList.forEach( i => i.terminate() );
		this.partsList.clear();
		this.e = null;
	}
}

type AnyObj = Record < string, any > ;

const bindClass = ( e : Element, name : string, value : LoL.Boolean, refs : Set < Ref > ) =>
{
	if( value instanceof Leaf )
	{
		refs.add( value.ref( ( value ) => e.classList.toggle( name, value ) ) );
	}
	
	else  e.classList.toggle( name, value );
}

const bindProp = ( target : any, name : string, value : any, refs : Set < Ref > ) =>
{
	if( value instanceof Leaf || value instanceof ToStr )
	{
		refs.add( value.ref( () => { target[ name ] = value.value } ) );
	}

	else  target[ name ] = value;
};

const bindAttr = ( target : any, name : string, text : any, refs : Set < Ref > ) =>
{
	if( text instanceof Leaf || text instanceof ToStr )
	{
		refs.add( text.ref( () => { target[ name ] = text.value } ) );
	}

	else  target[ name ] = text;
};

export const bindText = ( target : any, name : string, text : any, refs : Set < Ref > ) =>
{
	if( text instanceof Leaf || text instanceof ToStr )
	{
		refs.add( text.ref( () => { target[ name ] = text.value } ) );
	}

	else
	{
		if( typeof text == "object" ) log( text.constructor.name );
		else target[ name ] = text;
	}
};
