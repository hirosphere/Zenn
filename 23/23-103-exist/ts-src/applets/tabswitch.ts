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
	const gr = new Grazer( { buttons: 1 } );
	const hook = newhook();
	hook.init = () => hook.e && gr.initTouch( hook.e );

	return ul( {
			class: "tabs",
			actActs: {
				mousedown( ev ) { gr.mousedown( ev ); }
			},
			hook
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

	constructor( protected args : { buttons: number } )
	{
		document.addEventListener( "mouseup", () => this.end() );
	}

	protected _isActive = false;
	protected current : Element | null = null;

	// mouse イベント //

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

		log( "mouse enter", ev.buttons , this.args.buttons, this.isActive );

		return this._isActive;
	}
	
	protected end()
	{
		log( "end" );
		this._isActive = false;
	}

	// touch イベント => マウスイベント変換 //

	public initTouch( container : Element ) : void
	{
		if( container instanceof HTMLElement )
		{
			container.addEventListener( "touchstart", ( ev ) => this.touchstart( ev ), { passive: false } );
			container.addEventListener( "touchmove", ( ev ) => this.touchmove( ev ), { passive: false } );
			container.addEventListener( "touchcancel", ( ev ) => this.touchcancel( ev ), { passive: false } );
			container.addEventListener( "touchend", ( ev ) => this.touchend( ev ), { passive: false } );
		}
	}

	protected touchstart( ev : TouchEvent ) : void
	{
		log( "touch start" );
		ev.cancelable && ev.preventDefault();
		this.dispatch( "mousedown", this.getTouch( ev ) );
	}
	
	protected touchmove( ev : TouchEvent ) : void
	{
		log( "touch move" );

		this.dispatchEnterLeave( this.getTouch( ev ) );
	}
	
	protected touchcancel( ev : TouchEvent ) : void
	{
		log( "touch cancel" );
		this.end();
	}
	
	protected touchend( ev : TouchEvent ) : void
	{
		log( "touch end" );
		this.end();
	}

	//

	protected getTouch( ev : TouchEvent ) : Touch | null
	{
		if( ev.touches.length != 1 ) return null;
		return ev.touches[ 0 ];
	}
	
	protected dispatch( type : string, touch : Touch | null )
	{
		if( ! touch )  return;
		const e = document.elementFromPoint( touch.clientX, touch.clientY );
		e && this.dispatchTo( e, type, touch, true );
	}

	/** touchmove イベントから mouseenter / mouseleave イベントを生成 */

	protected dispatchEnterLeave( touch : Touch | null )
	{
		if( ! touch ) return;

		const e = document.elementFromPoint( touch.clientX, touch.clientY );

		if( ! ( e instanceof HTMLElement ) ) return;

		/** moves の欠員を検出し mouseleave イベントを生成 */

		const ps = getPathSet( e );
		this.moves.forEach (
			move => {
				if( ! ps.has( move ) )
				{
					this.moves.delete( move );
					this.dispatchTo( move, "mouseleave", touch, false );
				}
			}
		);

		/** moves の追加を検出し mouseenter イベントを生成 */

		if( ! this.moves.has( e ) )
		{
			this.moves.add( e );
			this.dispatchTo( e, "mouseenter", touch, false );	
		}
	}
	protected moves = new Set < HTMLElement >;

	protected dispatchTo( e : Element, type: string, touch : Touch, bubbles : boolean )
	{
		e?.dispatchEvent( new MouseEvent( type,
			{
				cancelable: true,
				bubbles,
				buttons: this.args.buttons,
				... touch
			})
		);
	}
}

/** Element の parentElement のパスセットを作成
 * mouseenter / mouseleave の検出に使用
*/
const getPathSet = ( e : HTMLElement | null ) : Set < HTMLElement > =>
{
	const set = new Set < HTMLElement >;
	for( ; e; e = e.parentElement ) set.add( e );
	return set;
}
