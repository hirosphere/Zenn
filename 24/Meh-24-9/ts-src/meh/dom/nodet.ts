import { log } from "../common.js";
import { Leaf, lol } from "../model/leaf.js";
import { defs } from "./defs.js";
import { Parts } from "./parts.js";

type el_args = defs.ec < any > &
{
	ns : string,
	type : string,
	parts ? : defs.part [],
};

type text_args = { text : defs.text };

export class Nodet
{
	constructor( args : el_args | text_args )
	{
		/* Text */

		if( "text" in args )
		{
			this._node_ = document.createTextNode( "" );
			this.bind
			(
				args.text,
				value =>
				{
					if( this._node_ ) this._node_.nodeValue = value
				}
			);
			return;
		}


		/* Element */

		const { ns, type, parts } = args;
		const { class: cname, style, attrs, props, acts, actacts } = args;

		this._el_ =
		this._node_ =
		(
			ns ?
				document.createElementNS( ns, type ) :
				document.createElement( type )
		);

		if( cname ) this.binb_class( this._el_, cname );

		if( attrs ) for( const [ name, value ] of Object.entries( attrs ) )
		{
			this.bind
			(
				value,
				value => set_attr( this._el_, name, value )
			);
		}

		if( props ) for( const [ name, value ] of Object.entries( props ) )
		{
			this.bind
			(
				value,
				value =>
				{
					if( this._el_ ) ( this._el_ as any )[ name ] = value;
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
			this.parts = new Parts( parts, df );
			this._el_.appendChild( df );
		}
	}

	protected parts;

	public get node() : Node | undefined
	{
		return this._node_;
	}
	
	protected _node_ ? : Node;

	public get el( ) : Element | undefined
	{
		return this._el_
	}

	protected _el_? : Element ;

	protected srcs = new Set < Leaf.Ref < any > > ;

	protected binb_class( e : Element, def : defs.class_spec )
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
	
	public destruct()
	{
		this.srcs.forEach( ref => ref.term() );
		this._node_ = undefined;
	}
}

const set_attr = ( e : Element | undefined, name : string, value : any ) =>
{
	log( "attr", value, typeof e );

	if( !e ) return;

	if( value === false )  e.removeAttribute( name );
	else e.setAttribute( name, value );
}
