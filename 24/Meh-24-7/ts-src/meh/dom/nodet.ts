import { Exist, root } from "../model/exist.js";
import { Leafr } from "../model/leaf.js";
import { defs } from "./defs.js";
import { Parts, PartFragment } from "./parts.js"
import _ls from "../ls.js";
const ls = _ls.dom.nodet;
const log = console.log; 



/** class Nodet
 * 
 * DOMのElementのプロパティー(クラス名, 属性, スタイル)と要素、Textの値をリアクティブにする委譲クラス。
 * 
*/

export class Nodet extends Exist
{
	protected p_node ? : Node ;
	protected p_element ? : Element ;
	protected acts ? : Map < string, EventListener [] > ;
	protected pf ? : PartFragment ;
	protected p_parts ? : Parts ;

	constructor
	(
		composition :  Exist,
		def       :  defs.Node,
		ce        :  Element | null,
		rel ?     :  Node
	)
	{
		super( composition );

		this.p_node = ( def instanceof defs.Element ) ?
			this.createElement( def ) :
			this.createText( def )
		;

		ce?.insertBefore( this.p_node, rel || null );
	}

	/* accessor */

	public get node() : Node | undefined
	{
		return this.p_node;
	}

	public get e() : Element | undefined
	{
		return this.p_element;
	}


	/* element */

	protected createElement( def : defs.Element ) : Element
	{
		const e = this.p_element = document.createElement( def.type );
		
		let { exist, attrs, props, acts, style } = def.echar || {};

		if( def.echar?.class )
		{
			this.bind_class( e, def.echar.class );
		}

		if( attrs ) for( const [ name, lol ] of Object.entries( attrs ) )
		{
			this.bind_leafr
			(
				lol,
				value => setattr( e, name, value )
			);
		}

		if( props ) for( const [ name, lol ] of Object.entries( props ) )
		{
			this.bind_leafr
			(
				lol,
				value => ( e as any ) [ name ] = value
			);
		}

		if( style ) for( const [ name, lol ] of Object.entries( style ) )
		{
			this.bind_leafr
			(
				lol,
				value => ( e.style as any ) [ name ] = value
			);
		}

		if( acts ) for( const [ name, act ] of Object.entries( acts ) )
		{
			this.bind_act( e, name, act );
		}

		if( def.parts ) this.p_parts = new Parts( this, def.parts );

		if( exist )
		{
			new Exist.Ref
			(
				this,
				{ terminate: () => this.terminate() },
				exist
			);
		}
		
		exist = attrs = props = acts = style = undefined;

		return e;
	}

	protected bind_class( e : Element, def : defs.Class )
	{
		if( def instanceof Array )  def.forEach( item => this.bind_class( e, item ) );

		else if( typeof def == "string" )  e.className = def;
		
		else if( typeof def == "object" )
		{
			for( const [ name, value ] of Object.entries( def ) )
			{
				this.bind_leafr( value, value => e.classList.toggle( name, value ) );
			}
		}
	}

	protected bind_act( e : Element, name : string, act : defs.Act )
	{
		this.acts ??= new Map < string, EventListener [] > ;

		if( this.acts.has( name ) )  this.acts.get( name )?.push( act );
		else this.acts.set( name, [ act ] );

		e.addEventListener( name, act );
	}

	/** text */

	protected createText( text : defs.Text ) : Text
	{
		const node = document.createTextNode( "" );
		
		this.bind_leafr
		(
			text,
			( lettr : string ) => { node.nodeValue = lettr; }
		);

		return node;
	}

	/** リアクティブ核心 */

	protected bind_leafr( text : any, update : ( text : any ) => void, ) : void
	{
		if( text instanceof Leafr )
		{
			new Leafr.Ref < any >
			(
				this,
				{ new_value: update },
				text
			);
		}
	
		else update( text );
	};


	/** life */

	public override terminate() : void
	{
		if( this.p_element && this.acts )
		{
			for( let [ name, acts ] of this.acts )
			{
				ls.$( "event hdr", ( ...a ) => log( ... a, name ) );
				acts.forEach( act => this.p_element?.removeEventListener( name, act ) );
			}
		}

		this.p_node?.parentElement?.removeChild( this.p_node );
		this.p_node = undefined;
		this.p_element = undefined;

		this.pf?.pf_term();

		super.terminate();
	}
}

const setattr = ( e : Element, name : string, value : any ) : void =>
{
	e.setAttribute( name, String( value ) );
};




/** */

