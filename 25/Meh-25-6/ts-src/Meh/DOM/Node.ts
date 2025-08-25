import { Leaf } from "../Model/Model.js" ;
import * as DD from "./DD.js" ;
import { PartsPlace } from "./PartsPlace.js" ;

export type TargetDOMElement = HTMLElement | SVGElement | MathMLElement ;


export abstract class MehNode
{
	public abstract node : Node ;
	#srcs = new Set < Leaf.Ref > ;

	protected bindState
	(
		text : any ,
		update : ( new_v : any ) => void ,
	
	) : void
	{
		if ( text instanceof Leaf.Core )
		{
			const ref =
			{
				source : text ,
				vChan : () => update ( text.$ ) ,
			}

			this.#srcs.add ( ref ) ;
			Leaf.RO.addRef ( text , ref ) ;
		}

		else  update ( text ) ;
	}

	public terminate ()
	{
		this.node.parentElement ?.removeChild ( this.node ) ;
		this.#srcs.forEach ( ref => ref.source && ref ) ;
		this.#srcs.clear () ;
	}
}



/*  */

export class MehText extends MehNode
{
	readonly node : Node ;

	constructor ( text : DD.Text )
	{
		super () ;

		this.node = document.createTextNode ( "" ) ;

		this.bindState
		(
			text ,
			new_v => this.node.nodeValue = String ( new_v )
		) ;
	}
}


/*  */

export class MehElement extends MehNode
{
	public readonly el : TargetDOMElement ;

	#_parts : PartsPlace | null = null ;


	constructor
	(
		ns : string ,
		type : string ,
		dec : DD.ElementSpec ,
		parts : DD.Part [] ,
	)
	{
		super () ;

		this.el = makeElement ( ns , type , dec ) ;

		/* bind props */

		if ( dec.class )  this.bindClass ( dec.class ) ;
		if ( dec.style )  this.bindStyle ( dec.style ) ;
		if ( dec.props )  this.bindProps ( dec.props ) ;
		if ( dec.attrs )  this.bindAttrs ( dec.attrs , ns ) ;
		if ( dec.biBind )  this.bindBB ( dec.biBind ) ;
		if ( dec.passive )  this.setActions ( dec.passive , true ) ;
		if ( dec.active )  this.setActions ( dec.active , false ) ;
		if ( dec.focus )  this.bindFocus ( dec.focus ) ;

		/* build parts */

		if ( parts )
		{
			if ( dec.shadow !== undefined )
			{
				const root = this.el.attachShadow ( { mode : "open" } ) ;
				this.setShadow ( dec.shadow , root ) ;
				this.#_parts = PartsPlace.create ( parts , root ) ;
			}

			else  this.#_parts = PartsPlace.create ( parts , this.el ) ;
		}

		/* Hook */

		if ( dec.hook )
		{
			dec.hook.el = this.el ;
			dec.hook.init?. ( this.el ) ;
		}
	}

	public get node () : Node
	{
		return this.el ;
	}

	/* */

	protected bindClass ( dec : DD.Class ) : void
	{
		if ( Array.isArray ( dec ) )
		{
			dec.forEach ( dec => this.bindClass ( dec ) ) ;
			return ;
		}
		
		if ( typeof dec == "string" )
		{
			this.el.classList.add ( ... dec.split ( /\s+/g ) ) ;
		}

		else if ( dec instanceof Leaf.Core && typeof dec.$ == "string" )
		{
			const place = new ClassPlace ( this.el ) ;
			this.bindState ( dec , names => place.classNames = names ) ;
		}

		else for ( const [ className , state ] of Object.entries ( dec ) )
		{
			this.bindState
			(
				state ,
				state => this.el.classList.toggle ( className , state )
			) ;
		}
	}

	protected bindStyle ( dec : DD.Style ) : void
	{
		for ( const [ name , value ] of Object.entries ( dec ) )
		{
			this.bindState
			(
				value ,
				value => ( this.el.style as any ) [ name ] = value
			);
		}
	}

	protected setShadow ( dec : DD.Shadow , root : ShadowRoot ) : void
	{
		if ( dec instanceof Array )
		{
			dec.forEach ( dec => this.setShadow ( dec , root ) ) ;
			return ;
		}

		if ( dec instanceof CSSStyleSheet )  root.adoptedStyleSheets.push ( dec ) ;

		else
		{
			const ss = new CSSStyleSheet () ;

			if ( dec instanceof Leaf.Core )
			{
				this.bindState ( dec , state => ss.replace ( state ) ) ;
			}
			else if ( typeof dec == "string" ) ss.replace ( dec ) ;

			root.adoptedStyleSheets.push ( ss ) ;
		}
	}

	protected bindAttrs ( dec : DD.Attributes < any > , ns : string ) : void
	{
		for ( const [ name , value ] of Object.entries ( dec ) )
		{
			this.bindState ( value , value => setAttribute ( ns , this.el , name , value ) )
		}
	}

	protected bindProps ( dec : DD.Attributes < any > )
	{
		for ( const [ name , value ] of Object.entries ( dec ) )
		{
			this.bindState ( value , value => ( this.el as any ) [ name ] = value ) ;
		}	
	}

	protected bindBB ( dec : DD.BB )
	{
		dec.vInp  && this.bindbb ( "input"  , "value" , dec.vInp  ) ;
		dec.vChan && this.bindbb ( "change" , "value" , dec.vChan ) ;

		dec.vInpN  && this.bindbb ( "input"  , "value" , dec.vInpN , sncv  ) ;
		dec.vChanN && this.bindbb ( "change" , "value" , dec.vChanN , sncv ) ;

		dec.chInp  && this.bindbb ( "input"  , "checked" , dec.chInp  ) ;
		dec.chChan && this.bindbb ( "change" , "checked" , dec.chChan ) ;
	}


	protected bindbb ( type : string , prop : string , state : Leaf < any > , cv ? : typeof sncv ) : void
	{
		this.bindState
		(
			state ,
			state => ( this.el as any ) [ prop ] = cv ? cv.get ( state ) : state
		) ;

		this.el.addEventListener
		(
			type ,
			ev =>
			{
				const v = ( ev.target as any ) [ prop ] ;
				state.$ = cv?.set ( v ) ?? v
			}
		) ;
	}

	protected setActions ( dec : DD.Actions , passive : boolean ) : void
	{
		for ( const [ type , action ] of Object.entries ( dec ) )
		{
			this.el.addEventListener ( type , action as EventListener , { passive } ) ;
		}
	}

	protected bindFocus ( dec : DD.Focus ) : void
	{
		this.bindState
		(
			dec ,
			state => { this.el.tabIndex = state ? 0 : -1 ; }
		) ;
	}
}

const makeElement = ( ns : string , type : string , dec : DD.ElementSpec ) : TargetDOMElement =>
{
	const rt =
	(
		dec.target && document.querySelector ( dec.target ) ||
		(
			ns ?
				document.createElementNS ( ns , type ) :
				document.createElement ( type )
		)
	) ;
	
	return rt as TargetDOMElement ;
}


class ClassPlace
{
	constructor ( protected el : Element , ) {}

	set classNames ( v : string )
	{
		const rem = this.#prev ;
		const mow = new Set < string > ( v.split ( /\s+/g ) ) ;

		this.el.classList.remove ( ... rem .difference ( mow ) ) ;
		this.el.classList.add ( ... mow ) ;

		this.#prev = mow ;
	}

	#prev = new Set < string > ;
}

const setAttribute = ( ns : string , el : Element , name : string , value : any ) : void =>
{
	if ( value == null )
	{
		ns ? el.removeAttributeNS ( ns , name ) : el.removeAttribute ( name ) ;
	}

	else  ns ? el.setAttributeNS ( ns, name , value ) : el.setAttribute ( name , value ) ;
}

/*　BB 双方向バインド用 string <-> number 相互変換  */
const sncv =
{
	set ( v : string ) { return Number ( v ) } ,
	get ( v : number ) { return String ( v ) }
} ;
