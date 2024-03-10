import { ExistContainer, Exist, root } from "../model/exist.js";
import { Leafr } from "../model/leaf.js";
import { defs } from "./defs.js";
import { PartFragment, createParts } from "./parts.js"
import { _ls } from "../_ls.js";
const ls = _ls.dom.nodet;
const log = console.log; 



/** class Nodet
 * 
 * DOMのElementのプロパティー(クラス名, 属性, スタイル)と要素、Textの値をリアクティブにする委譲クラス。
 * 
*/

export class Nodet extends Exist
{
	protected node ? : Node ;
	protected e ? : Element ;
	protected acts ? : Map < string, EventListener [] > ;
	protected parts ? : PartFragment ;
	protected refcon ? : Exist.RefContainer ;

	constructor
	(
		container :  ExistContainer,
		def       :  defs.Node,
		ce        :  Element | null,
		rel ?     :  Node
	)
	{
		super( container );

		this.node = ( def instanceof defs.Element ) ?
			this.createElement( def ) :
			this.createText( def )
		;

		ce?.insertBefore( this.node, rel || null );
	}

	/** element */

	protected createElement( def : defs.Element ) : Element
	{
		const e = this.e = document.createElement( def.type );
		
		let { exist, attrs, props, acts, style } = def.echar || {};

		if( def.echar?.class )
		{
			this.class_bind( e, def.echar.class );
		}

		if( attrs )
		{
			for( const [ name, lol ] of Object.entries( attrs ) )
			{
				this.bind_leafr( lol, value => setattr( e, name, value ) );
			}
		}

		if( props )
		{
			for( const [ name, lol ] of Object.entries( props ) )
			{
				this.bind_leafr( lol, value => ( e as any ) [ name ] = value );
			}
		}

		if( acts )
		{
			for( const [ name, act ] of Object.entries( acts ) )
			{
				this.act_bind( e, name, act );
			}
		}

		if( style )
		{
			for( const [ name, lol ] of Object.entries( style ) )
			{
				// log( name, lol );
				this.bind_leafr( lol, value => ( e.style as any ) [ name ] = value );
			}
		}

		if( def.parts ) this.parts = createParts( this, e, def.parts );

		if( exist )
		{
			this.refcon ??= new Exist.RefContainer();
			new Exist.Ref
			(
				this.refcon,
				{ old_source: () => this.terminate() }
			
			).source = exist;
		}
		
		attrs = undefined;
		return e;
	}

	protected class_bind( e : Element, def : defs.Class )
	{
		if( typeof def == "string" )  e.className = def;
	}

	protected act_bind( e : Element, name : string, act : defs.Act )
	{
		this.acts = this.acts || new Map < string, EventListener [] > ;

		if( this.acts.has( name ) )  this.acts.get( name )?.push( act );
		else this.acts.set( name, [ act ] );

		e.addEventListener( name, act );
	}

	/** text */

	protected createText( text : defs.Text ) : Text
	{
		const node = document.createTextNode( "" );
		this.bind_leafr( text, ( lettr : string ) => { node.nodeValue = lettr; } );
		return node;
	}

	/** リアクティブ核心 */

	protected bind_leafr( text : any, update : ( letter : any ) => void, ) : void
	{
		if( text instanceof Leafr )
		{
			this.refcon ??= new Exist.RefContainer();

			new Leafr.Ref < any >
			(
				this.refcon,
				{ new_value: update },
				text
			);
		}
	
		else update( text );
	};


	/** life */

	public override terminate() : void
	{
		if( this.e && this.acts )
		{
			for( let [ name, acts ] of this.acts )
			{
				ls.evh.s && log( name );
				acts.forEach( act => this.e?.removeEventListener( name, act ) );
			}
		}

		if( this.e )
		{
			this.e.remove();
			this.e = undefined;
		}

		this.node = undefined;

		this.parts?.pf_term();
		this.refcon?.refs_term();

		super.terminate();
	}
}

const setattr = ( e : Element, name : string, value : any ) : void =>
{
	e.setAttribute( name, String( value ) );
};




/** */

