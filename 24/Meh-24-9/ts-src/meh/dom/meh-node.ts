import { log } from "../common.js";
import { leaf } from "../model/leaf.js";
import { defs } from "./defs.js";
import { create_parts_place } from "./parts.js";

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

	protected bind
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
		const { class: class_name, style, attrs, props , binds , acts, active_acts , hook } = def;

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
			this.bind
			(
				value,
				value => set_attr( el , name , value , ns )
			);
		}

		if( props && el ) for( const [ name , value ] of Object.entries( props ) )
		{
			this.bind
			(
				value,
				value =>
				{
					( el as any )[ name ] = value;
				}
			);
		}

		if
		(
			binds && binds.value
		)
		{
			this.bind ( binds.value.src , value => ( el as any ) [ "value" ] = value ) ;

			log ( binds.value.act )

			el.addEventListener
			(
				binds.value.act ,
				ev =>
				{
					const is_target =
					(
						ev.target instanceof HTMLInputElement ||
						ev.target instanceof HTMLTextAreaElement
					);

					if ( ! is_target )  return ;

					binds.value?.src.set ( ev.target.value ) ;
				}
			)
		}

		if( acts ) for( const [ name, act ] of Object.entries < defs.act > ( acts ) )
		{
			el.addEventListener( name, act as EventListener );
		}

		if( parts )
		{
			this.parts = create_parts_place( el, parts );
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
			this.bind
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
			this.bind
			(
				value,
				value => ( e.style as any ) [ name ] = value
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

export class MehText extends MehNode
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
