import { leaf_t, Leaf, LoL, Ref, ToStr } from "../model/leaf.js";

const log = console.log;

//

type gE = globalThis.Element;

export namespace defs
{
	export type CreateElement < E > = ( first ? : Props < E > | Part, ... rest : Part [] ) => Element ;

	export type Element < E extends gE = gE > =
	{
		type : string ;			// "div" "p" などの「タグ名」
		props ? : Props < E > ;	// "id"  "href"  "value" などのプロパティー
		parts ? : Part [] ;		// "childNodes" と名づけるべきですが、好みで。
		isElement : true ;	// Props とのユニオンやその他の識別のため。
	};

	export type Props < E = {} > =
	{
		[ prop in keyof Omit< E, "style" > ] ? : PropT < E [ prop ] > ;
	}
	&
	{
		class ? : Class ;
		attrs ? : { [ name : string ] : Text } ;
		style ? : Style ;
	};

	type PropT < T > = T extends string ? Text : T | Leaf < T >;

	export type Class = string | Leaf.String | ToStr | ClassSwitch | Class[];

	type ClassSwitch =
	{
		[ name : string ] : boolean | Leaf.Boolean
	};

	export type Attrs =
	{
		[ name : string ] : Attr ;
	};
	export type Attr = string | Leaf.String | ToStr;

	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : StyleProp ;
	};
	export type StyleProp = string | Leaf.String | ToStr ;


	export type Part = Element | Text ;

	export type Text =
	(
		boolean | number | string |
		Leaf.Boolean | Leaf.Number | Leaf.String |
		ToStr
	);

	//  //

	export const createElement = ( type : string, first ? : Props | Part, ... rest : Part [] ) : Element =>
	{
		if( typeof first == "object" )
		{
			if( ! ( "isElement" in first || first instanceof Leaf || first instanceof ToStr ) ) 
			{
				return {
					isElement: true,
					type,
					props: first,
					parts: rest
				};
			}
		}

		return {
			isElement: true,
			type,
			parts: first ? [ first, ...rest ] : undefined
		};
	}
}

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
		if( parts ) this.createParts( e, parts );
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

	createParts( e : Element, def : defs.Part [] )
	{
		this.partsList.add( new Parts( this, e, def ) );
	}

	createPart( def : defs.Part, ce : Element )
	{
		if( def == null ) return;

		if( typeof def == "object" && "isElement" in def )
		{
			return this.createElement( def, ce );
		}
		
		const n = document.createTextNode( "" );
		bindText( n, "nodeValue", def, this.refs );
		ce.appendChild( n );
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

const bindText = ( target : any, name : string, text : any, refs : Set < Ref > ) =>
{
	if( text instanceof Leaf || text instanceof ToStr )
	{
		refs.add( text.ref( () => { target[ name ] = text.value } ) );
	}

	else  target[ name ] = text;
};


//  //

class Parts
{
	constructor( private compo : Component, private e : Element, def : defs.Part[] )
	{
		for( const partdef of def )  compo.createPart( partdef, e );
	}

	terminate()
	{
		;
	}
}
