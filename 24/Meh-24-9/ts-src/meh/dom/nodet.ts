import { _add_ref_, log } from "../common.js";
import { Srcr, Leafr, lol } from "../model/leaf.js";
import { defs } from "./defs.js";
import { create_place } from "./parts.js";

type gE = globalThis.Element ;
type gN = globalThis.Node ;

export const add =
(
	part : defs.part | defs.part [],
	com_qe : gE | string,
	rel_qn ? : gN | string
)
 : void =>
{
	const com_e : gE | null = typeof com_qe == "string" ? document.querySelector( com_qe ) : com_qe || null;
	const rel_n : gN | null = typeof rel_qn == "string" ? document.querySelector( rel_qn ) : rel_qn || null;

	if( ! com_e )  return ;

	const df = new DocumentFragment();
	const parts = create_place
	(
		com_e,
		df,
		part instanceof Array ? part : [ part ]
	);

	com_e.insertBefore( df, rel_n );
};


type el_args = defs.ec < any > &
{
	ns : string,
	type : string,
	parts ? : defs.parts,
};

type E = HTMLElement | SVGElement;

export abstract class Nodet
{
	public abstract get node() : Node | undefined;

	protected bind
	(
		value : lol < any > ,
		update : ( value : any ) => void,
	)
	{
		if( value instanceof Srcr )
		{
			const ref = new Srcr.Ref
			(
				value ,
				update
			);

			this.srcs.add( ref );
			value [ _add_ref_ ] ( ref ) ;
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

	protected srcs = new Set < Srcr.Ref < any > > ;
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
		const { class: class_name, style, attrs, props, acts, actActs: actacts } = args;

		let el = this._el_ =
		(
			ns ?
				document.createElementNS( ns, type ) :
				document.createElement( type )
		);

		if( class_name ) this.bind_class( this._el_, class_name );

		if( style && this._el_ instanceof HTMLElement )
		{
			this.bind_style( this._el_, style );
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
			// this.parts = new PartsColl( this._el_, df, parts );
			this.parts = create_place( this._el_, df, parts );
			this._el_.appendChild( df );
		}
	}

	public get node()
	{
		return this._el_;
	}

	protected bind_class( e : globalThis.Element, def : defs.class_spec )
	{
		if( typeof def == "string" )
		{
			e.className += " " + def;
			return;
		}

		if( def instanceof Array )
		{
			def.forEach( def => this.bind_class( e, def ) );
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

	protected bind_style( e : HTMLElement, def : defs.style )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			this.bind
			(
				value,
				value => ( e.style as any ) [ name ] = String( value )
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

				if( this._node_ )
				{
					this._node_.nodeValue = value ?? "" ;
				}
			}
		);
	}

	public get node()
	{
		return this._node_;
	}

	protected _node_ ? : globalThis.Text ;
}

const ents = Object.entries;
