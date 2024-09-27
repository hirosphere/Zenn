import { log } from "../common.js";
import { Leaf, lol } from "../model/leaf.js";
import { defs } from "./defs.js";
import { PartsColl } from "./parts.js";

type el_args = defs.ec < any > &
{
	ns : string,
	type : string,
	parts ? : defs.parts,
};

type E = HTMLElement | SVGAElement;

export abstract class Nodet
{
	public abstract get node() : Node | undefined;

	protected bind
	(
		value : lol < any >,
		update : ( value : any ) => void,
	)
	{
		if( value instanceof Leaf )
		{
			const ref = new Leaf.Ref();
			ref.on_value_change = () => update( value.value ) ;
			ref.src = value;
			this.srcs.add( ref );
		}
	
		else  update( value );
	}

	protected _destruct( isroot ? : true )
	{
		this.srcs.forEach( ref => ref.term() );
	}

	public destruct()
	{
		this._destruct( true );
	}

	protected srcs = new Set < Leaf.Ref < any > > ;
}

export class Element extends Nodet
{
	// protected _el_? : HTMLElement ;
	protected _el_? : globalThis.Element ;
	protected parts;

	constructor( args : el_args )
	{
		super();

		const { ns, type, parts } = args;
		const { class: cname, style, attrs, props, acts, actActs: actacts } = args;

		let el = this._el_ =
		(
			ns ?
				document.createElementNS( ns, type ) :
				document.createElement( type )
		);

		if( cname ) this.binb_class( this._el_, cname );

		if( style && this._el_ instanceof HTMLElement ) for( const [ name, value ] of Object.entries( style ) )
		{
			this.bind
			(
				value,
				value => this._el_
			);
		}

		if( attrs ) for( const [ name, value ] of Object.entries( attrs ) )
		{
			this.bind
			(
				value,
				value => set_attr( this._el_, name, value )
			);
		}

		if( props && this._el_ ) for( const [ name, value ] of Object.entries( props ) )
		{
			this.bind
			(
				value,
				value =>
				{
					( this._el_ as any )[ name ] = value;
				}
			);
		}

		if( acts ) for( const [ name, act ] of Object.entries < defs.act > ( acts ) )
		{
			this._el_.addEventListener( name, act as EventListener );
		}

		if( parts )
		{
			const df = document.createDocumentFragment();
			this.parts = new PartsColl( this._el_, df, parts );
			this._el_.appendChild( df );
		}
	}

	public get node()
	{
		return this._el_;
	}

	protected binb_class( e : globalThis.Element, def : defs.class_spec )
	{
		if( typeof def == "string" )
		{
			log( "class", def );

			e.className += " " + def;
			return;
		}

		if( def instanceof Array )
		{
			def.forEach( def => this.binb_class( e, def ) );
			return;
		}

		for( const [ name, value ] of Object.entries( def ) )
		{
			this.bind
			(
				value,
				value => e.classList.toggle( name, value )
			);
		}
	}

	public override _destruct()
	{
		this.parts?.destruct();
		this._el_ = undefined;
		super._destruct();
	}
}

const set_attr = ( e : globalThis.Element | undefined, name : string, value : any ) =>
{
	log( "attr", value, typeof e );

	if( !e ) return;

	if( value === false )  e.removeAttribute( name );
	else e.setAttribute( name, value );
}

export class Text extends Nodet
{
	constructor( text : defs.text )
	{
		super();

		this._node_ = document.createTextNode( "" );
		this.bind
		(
			text,
			value =>
			{
				if( this._node_ ) this._node_.nodeValue = value
			}
		);
	}

	public get node()
	{
		return this._node_;
	}

	protected _node_ ? : globalThis.Text ;
}
