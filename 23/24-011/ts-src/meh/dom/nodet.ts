import { Owner, Exist, root } from "../model/exist.js";
import { Leafr } from "../model/leaf.js";
import { defs } from "./defs.js";
import { PartFragment, createParts } from "./parts.js"
const log = console.log; 
const ltrue = false;
const ls = { all: ltrue };



/** class Nodet
 * 
 * DOMNode, DOMElementのプロパティーと要素をリアクティブにする委譲クラス。
 * 
*/

export class Nodet extends Exist
{
	protected node ? : Node ;
	protected e ? : Element ;
	protected acts ? : Map < string, EventListener [] > ;
	protected parts ? : PartFragment ;
	protected refs ? : Exist.RefCon ;

	constructor
	(
		container :  Owner,
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
		
		let { exist, attrs, props, acts } = def.echar || {};

		if( def.echar?.class )
		{
			this.class_bind( e, def.echar.class );
		}

		if( attrs )
		{
			for( let [ name, value ] of Object.entries( attrs ) )
			{
				this.attr_bind( e, name, value );
			}
		}

		if( props )
		{
			for( let [ name, value ] of Object.entries( props ) )
			{
				this.prop_bind( e, name, value );
			}
		}

		if( acts )
		{
			for( let [ name, act ] of Object.entries( acts ) )
			{
				this.act_bind( e, name, act );
			}
		}

		if( def.parts ) this.parts = createParts( this, e, def.parts );

		if( exist )
		{
			this.refs ??= new Exist.RefCon();
			new Exist.Ref
			(
				this.refs,
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

	protected attr_bind( e : Element, name :string, value : defs.Text ) : void
	{
		this.bindtext( value, lettr => setAttr( e, name, lettr ) );
	}

	protected prop_bind( e : any, name :string, value : defs.Text ) : void
	{
		this.bindtext( value, lettr => e[ name ] = lettr );
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
		this.bindtext( text, lettr => { node.nodeValue = lettr; } );
		return node;
	}

	/** bindtext */


	protected bindtext
	(
		text : defs.Text,
		update : ( letter : string ) => void,
	
	) : void
	{
		if( text instanceof Leafr )
		{
			this.refs ??= new Exist.RefCon();

			new Leafr.Ref < any >
			(
				this.refs, { new_value: newv => update( String( newv ) ) }
			)
			.source = text;
		}
	
		else update( String( text ) );
	};


	/** life */

	public override terminate() : void
	{
		if( this.e && this.acts )
		{
			for( let [ name, acts ] of this.acts )
			{
				ls.all && log( name );
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
		this.refs?.refs_term();

		super.terminate();
	}
}

const setAttr = ( e : Element, name : string, value : any ) : void =>
{
	e.setAttribute( name, String( value ) );
};




/** */

