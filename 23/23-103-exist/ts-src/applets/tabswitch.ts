import { models as Mehm, Leaf, ef, each, newhook, Hook } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;
const { div, span, p, ul, li, select, option } = ef;

//  //

class PageContent
{
	readonly name;
	constructor( name : string )
	{
		this.name = new Leaf.String( name );
	}
}

//  //

export const TabSwitchApp = () =>
{
	const labels = [ "Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn" ];
	const sel : Mehm.Select < string > = Mehm.Select.fromLabels( labels, "Nuuull" );
	sel.root?.parts[ 3 ].select();

	return Applet({
		title: "TabSwitch",
		content: [
			div( ef.button( { acts: { click() { sel.default.select(); } } }, "Null" ) ),
			Tabs( sel.root.parts ),
			Tabs( sel.root.parts ),
			Tabs( sel.root.parts ),
			ef.input( { attrs: { value: sel.current.cv( o => `${ o?.value }` ) } } )
		]
	});
}

// Tab|Tab|Tab //

const Tabs = ( opts ? : Mehm.Option < string > [] ) =>
{
	const hook = newhook();
	hook.init = () =>
	{
		log( "Tabs init()", hook.e );
	}

	const gr = new Grazer( { buttons: 1, hook } );
	return ul( {
			class: "tabs",
			actActs: {
				touchstart( ev ) { gr.ctstart( ev )  },
				touchmove( ev ) { gr.ctmove( ev ); },
				touchcancel( ev ) { gr.ctend( ev ); },
				touchend( ev ) { gr.ctend( ev ); }
			},
			hook,
		},
		each( opts || [], opt => Tab( opt, gr ) ), );
}

const Tab = ( opt : Mehm.Option < string >, gr : Grazer ) =>
{
	return li( {
			class: [ "tab", { selected: opt.selected } ],
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ) && opt.select(); },
				mouseenter( ev ) { gr.mouseenter( ev ) && opt.select(); },
			}
		},
		opt.value
	);
};

//  //

const Contents = () =>
{
	;
}

//  //

class Grazer
{
	public get isActive() { return this._isActive; }

	constructor( protected args : { buttons: number, hook : Hook } )
	{
		document.addEventListener( "mouseup", () => this._isActive = false );
	}

	protected _isActive = false;
	protected current : Element | null = null;

	//  //

	public mousedown( ev : MouseEvent ) : boolean
	{
		log( "mouse down" )
		if( ev.buttons != this.args.buttons ) return false;

		this._isActive = true;
		ev.preventDefault(); 
		return true;
	}

	public mouseenter( ev : MouseEvent ) : boolean
	{
		if( ev.buttons != this.args.buttons )  this._isActive = false;
		log( "mouse enter", ev.buttons , this.args.buttons, this.isActive )
		return this._isActive;
	}

	// container event handlers //
	
	public ctstart( ev : TouchEvent )
	{
		const e = this.postoel( ev );
		this._isActive = true;
		ev.touches.length == 1 && ev.preventDefault();

		log( "ct start", e?.innerHTML );
		
		if( ! e )  return;

		this.current = e;		
		this.dispatch( "mousedown", e, ev.touches[ 0 ] );
	}

	public ctmove( ev : TouchEvent ) : ""
	{
		const e = this.postoel( ev );
		if( ! e )  return "";

		this.current = e;
		log( "ct move", e?.innerHTML.slice( 0, 12 ) );
		this.dispatch( "mouseenter", e, ev.touches[ 0 ] );
		
		return "";
	}

	public ctend( ev : TouchEvent )
	{
		log( "ct end" );
		this.current = null;
		this._isActive = false;
	}

	protected dispatch( type : string, e : Element, touch ? : Touch )
	{
		if( ! touch )  return;

		e.dispatchEvent( new MouseEvent( type,
		{
			cancelable: true,
			bubbles : true,
			buttons: this.args.buttons,
			... touch
		}));
	}

	protected postoel( ev : TouchEvent ) : Element | null
	{
		if( ev.touches.length != 1 ) return null;

		const t = ev.touches[ 0 ];		
		const e = document.elementFromPoint( t.clientX, t.clientY );
		
		if( e == this.current ) return null;

		return e;
		
		//if( e && e.parentNode == this.args.hook.e ) return e;
		
		//return null; 
	}
}

class TouchToMouse
{
	public touchstart( ev : TouchEvent ) : void
	{
		;
	}

	public touchmove( ev : TouchEvent ) : void
	{
		;
	}

	public touchcancel( ev : TouchEvent ) : void
	{
		;
	}

	public touchend( ev : TouchEvent ) : void
	{
		;
	}

	protected dispatch( type: string, target : Element, touch : Touch ) : void
	{
		;
	}
}
