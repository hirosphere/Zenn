import { log } from "../Util.js" ;
import { State } from "../Model/Model.js" ;
import * as DD from "./DD.js" ;
import { PartsPlace } from "./PartsPlace.js" ;

export type TargetDOMElement = HTMLElement | SVGElement | MathMLElement ;


export abstract class MehNode
{
	public abstract node : Node ;
	#srcs = new Set < State.Ref < any > > ;

	protected bindState
	(
		text : any ,
		update : ( new_v : any ) => void ,
	
	) : void
	{
		if ( text instanceof State )
		{
			text.$_addRef
			(
				{
					source : text ,
					vChan : () => update ( text.$ ) ,
				}
			) ;
		}

		else  update ( text ) ;
	}

	protected terminate ()
	{
		this.#srcs.forEach ( ref => ref.source ?. $_rmvRef ( ref ) ) ;
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
		if ( dec.bb )  this.bindBB ( dec.bb ) ;
		if ( dec.passive )  this.setActions ( dec.passive , true ) ;
		if ( dec.active )  this.setActions ( dec.active , false ) ;

		/* build parts */

		if ( parts ) this.#_parts = PartsPlace.create ( parts , this.el ) ;
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

		else if ( dec instanceof State && typeof dec.$ == "string" )
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


	protected bindbb ( type : string , prop : string , state : State < any > , cv ? : typeof sncv ) : void
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
		);
	}

	protected setActions ( dec : DD.Actions , passive : boolean ) : void
	{
		for ( const [ type , action ] of Object.entries ( dec ) )
		{
			this.el.addEventListener ( type , action as EventListener , { passive } ) ;
		}
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
	set : ( v : string ) => { return Number ( v ) } ,
	get : ( v : number ) => { return String ( v ) }
} ;
