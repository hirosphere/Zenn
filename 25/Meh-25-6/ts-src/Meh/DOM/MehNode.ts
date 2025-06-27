import { log } from "../Util.js" ;
import { Leaf } from "../Model/Model.js" ;
import * as DD from "./DD.js" ;
import { PartsPlace } from "./PartsPlace.js" ;

export type TargetDOMElement = HTMLElement | SVGElement | MathMLElement ;


export abstract class MehNode
{
	public abstract node : Node ;
	protected p_srcs = new Set < Leaf.Ref < any > > ;

	protected bindValue
	(
		text : any ,
		update : ( new_v : any ) => void ,
		lifeBind : boolean = false
	
	) : void
	{
		if ( text instanceof Leaf )
		{
			const lterm = lifeBind ? () => this.terminate () : undefined ;
			text.addRef ( { source : text , vchan : update , lterm } ) ;
		}

		else  update ( text ) ;
	}

	protected terminate ()
	{
		log ( "MehNode terminate" )
		this.p_srcs.forEach ( ref => ref.source ?.removeRef ( ref ) ) ;
		this.p_srcs.clear () ;
	}
}



/*  */

export class MehText extends MehNode
{
	protected p_node : Node ;
	constructor ( text : DD.Text )
	{
		super () ;

		this.p_node = document.createTextNode ( "" ) ;

		this.bindValue
		(
			text ,
			new_v => this.p_node.nodeValue = String ( new_v )
		) ;
	}

	public get node () : Node
	{
		return this.p_node ;
	}
}


/*  */

export class MehElement extends MehNode
{
	public readonly el : TargetDOMElement ;

	protected p_parts : PartsPlace | null = null ;


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
		if ( dec.attrs )  this.bindAttrs ( dec.attrs , ns ) ;
		if ( dec.style )  this.bindStyle ( dec.style ) ;
		if ( dec.passive )  this.setActions ( dec.passive , true ) ;
		if ( dec.active )  this.setActions ( dec.active , false ) ;

		/* build parts */

		if ( parts ) this.p_parts = PartsPlace.create ( parts , this.el ) ;
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
			dec.split ( /\s+/g ).forEach
			(
				className => className && this.el.classList.toggle ( className , true )
			) ;
		}

		else for ( const [ className , state ] of Object.entries ( dec ) )
		{
			this.bindValue
			(
				state ,
				state => this.el.classList.toggle ( className , state )
			) ;
		}
	}

	protected bindStyle ( dec : DD.Style ) : void
	{
		for ( const [ name , value ] of Object.entries ( dec) )
		{
			this.bindValue
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
			this.bindValue ( value , value => setAttribute ( ns , this.el , name , value ) )
		}
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
	if ( dec.target )  return dec.target ;
	return ns ? document.createElementNS ( ns , type ) as TargetDOMElement : document.createElement ( type );
}

const setAttribute = ( ns : string , el : Element , name : string , value : any ) : void =>
{
	if ( value == null )
	{
		ns ? el.removeAttributeNS ( ns , name ) : el.removeAttribute ( name ) ;
	}

	else  ns ? el.setAttributeNS ( ns, name , value ) : el.setAttribute ( name , value ) ;
}
