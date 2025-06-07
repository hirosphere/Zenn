import { log } from "../common.js";
import { leaf } from "../model/leaf.js";
import { defs } from "./defs.js";
import { create_parts_place } from "./place.js";

type El = defs.El ;

export const add =
(
	def : defs.node ,
	com_qe : El | string | null ,
	rel_qn ? : string | Node | null
)
 : void =>
{
	const com_el : El | null = typeof com_qe == "string" ? document.querySelector( com_qe ) : com_qe || null;
	const rel_node : Node | null = typeof rel_qn == "string" ? document.querySelector( rel_qn ) : rel_qn || null;

	if ( ! com_el )  return ;

	const part = def instanceof MehElement ? def : new MehText ( def ) ;

	part.node && com_el.insertBefore
	(
		part.node ,
		rel_node
	)
};


type el_def = defs.ec < any > &
{
	ns : string,
	type : string,
	parts ? : defs.parts,
};

type E = HTMLElement | SVGElement;

export abstract class MehNode
{
	public abstract get node() : Node | undefined;

	protected bind_value
	(
		value : any ,
		update : ( value : any ) => void ,
	)
	{
		if ( value instanceof leaf.Src )
		{
			const ref = leaf.ref < any >
			(
				value ,
				update ,
			) ;

			this.srcs.add ( ref );
		}
	
		else  update( value );
	}

	protected _destruct( isroot ? : true )
	{
		this.srcs.forEach( ref => ref.term ?.() );
	}

	public destruct()
	{
		this._destruct( true );
	}

	protected srcs = new Set < leaf.ref < any > > ;
}

export class MehElement extends MehNode
{
	protected _el_ ? : El ;
	protected parts;

	constructor( def : el_def )
	{
		super();

		const { ns, type, parts } = def;
		const { class: class_name, style, attrs, props , binds , action: acts, aa: active_acts , focus , hook } = def;

		let el =
		(
			ns ?
				document.createElementNS( ns, type ) :
				document.createElement( type )
		);

		if ( ! ( el instanceof HTMLElement || el instanceof SVGElement ) ) return ;

		this._el_ = el ;

		if( class_name )  this.bind_class( el, class_name );
		if( style )  this.bind_style( el, style );

		if( attrs ) for( const [ name, value ] of Object.entries( attrs ) )
		{
			this.bind_value
			(
				value,
				value => set_attr( el , name , value , ns )
			);
		}

		if( props && el ) for( const [ name , value ] of Object.entries( props ) )
		{
			this.bind_value
			(
				value,
				value =>
				{
					( el as any )[ name ] = value;
				}
			);
		}

		if ( binds )
		{
			if ( binds.value_change )  this.bind_bidir_value ( el , binds.value_change , "value" ,   "change" ) ;
			if ( binds.value_input )   this.bind_bidir_value ( el , binds.value_input  , "value" ,   "input"  ) ;
			if ( binds.checked )       this.bind_bidir_value ( el , binds.checked      , "checked" , "change" ) ;
		}

		if( acts ) for( const [ name, act ] of Object.entries < defs.act > ( acts ) )
		{
			el.addEventListener( name, act as EventListener );
		}

		if( active_acts ) for( const [ name, act ] of Object.entries < defs.act > ( active_acts ) )
		{
			el.addEventListener( name, act as EventListener , { passive : false } );
		}

		if ( focus && focus.state )
		{
			const { state } = focus ;
			// const ref = leaf.ref
			// (
			// 	state ,
			// 	state => state && this.el ?.focus () ,
			// ) ;

			this.bind_value
			(
				state ,
				state =>
				{
					this.el && ( this.el.tabIndex = state ? 0 : -1 ) ;
					state && ( this.el ?.focus () ) ;
				}
			) ;
		}

		if( parts )
		{
			const shadow = def.shadow ;

			if ( shadow )
			{
				const mode = { mode : shadow.mode ?? "open" } ;
				const shadow_root = el.attachShadow ( mode ) ;

				if ( Array.isArray ( shadow.css ) ) shadow.css.forEach ( i => set_css ( shadow_root , i ) ) ;
				else shadow.css && set_css ( shadow_root , shadow.css ) ;

				this.parts = create_parts_place( shadow_root, parts );
			}

			else
			{
				this.parts = create_parts_place( el, parts );
			}
		}

		if( hook )
		{
			hook.el = el ;
			hook.init ?.( el ) ;
		}
	}

	public get node()
	{
		return this._el_;
	}

	public get el ()
	{
		return this._el_ ;
	}

	protected bind_class( e : El , def : defs.class_spec )
	{
		if( typeof def == "string" )
		{
			def.split( /\s/g ) .forEach
			(
				cn => cn && e.classList.toggle ( cn , true )
			) ;

			return;
		}

		if( def instanceof Array )
		{
			def.forEach( def => this.bind_class( e, def ) );
			return;
		}

		for( const [ name, value ] of Object.entries( def ) )
		{
			this.bind_value
			(
				value,
				value => e.classList.toggle( name, value )
			);
		}
	}

	protected bind_style( e : El, def : defs.style )
	{
		for( const [ name, value ] of Object.entries( def ) )
		{
			this.bind_value
			(
				value,
				value => ( e.style as any ) [ name ] = value
			);
		}
	}

	protected bind_bidir_value
	(
		el : El ,
		lv : leaf < any > ,
		prop_name : "value" | "checked" ,
		event_name : "input" | "change" ,
	)
	{
		this.bind_value
		(
			lv ,
			new_v =>
			{
				( el as any ) [ prop_name ] = new_v ;
			}
		) ;

		el.addEventListener
		(
			event_name ,
			( ev ) =>
			{
				lv.value = ( el as any ).value ;
			}
		) ;
	}

	public override _destruct()
	{
		this.parts?.destruct();
		this._el_ = undefined;
		super._destruct();
	}
}


const set_attr =
(
	e : globalThis.Element | undefined,
	name : string,
	value : any ,
	ns : string
) =>
{
	if( !e ) return;

	if( typeof value == "boolean" )
	{
		if( ns ) value ?
			e.setAttributeNS ( ns , name , "" ) :
			e.removeAttributeNS ( ns , name )
		;
		else value ?
			e.setAttribute ( name , "" ) :
			e.removeAttribute ( name )
		;
	}
	else e.setAttribute( name, value );
}

const set_css = ( sr : ShadowRoot , css : string | CSSStyleSheet ) : void =>
{
	if ( css instanceof CSSStyleSheet )
	{
		sr.adoptedStyleSheets.push ( css ) ;
	}
	else
	{
		const css_obj = new CSSStyleSheet ;
		css_obj.replace ( css ) ;
		sr.adoptedStyleSheets.push ( css_obj ) ;
	}
}


/* */

export class MehText extends MehNode
{
	constructor( text : defs.text )
	{
		super();

		this._node_ = document.createTextNode( "" );
		this.bind_value
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
