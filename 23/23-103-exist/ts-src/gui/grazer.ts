const log2 = console.log;
const log = ( ... any : any ) => {};

//  //

export class Grazer
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
	
	protected end() : void
	{
		log( "end" );
		this._isActive = false;
	}

	// touch イベント => マウスイベント変換 //

	public initTouchContainer( container : Element ) : void
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

		this.touchmove_( this.getTouch( ev ) );
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
	
	protected dispatch( type : string, touch : Touch | null ) : void
	{
		if( ! touch )  return;
		const e = document.elementFromPoint( touch.clientX, touch.clientY );
		e && this.dispatchTo( e, type, touch, true );
	}

	/** touchmove イベントから mouseenter / mouseleave イベントを生成 */

	protected touchmove_( touch : Touch | null ) : void
	{
		if( ! touch ) return;

		const e = document.elementFromPoint( touch.clientX, touch.clientY );

		if( ! ( e instanceof HTMLElement ) ) return;

		/** moves の欠員を検出し mouseleave イベントを生成 */

		const ps = createPathSet( e );
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

	protected dispatchTo( e : Element, type: string, touch : Touch, bubbles : boolean ) : void
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
const createPathSet = ( e : HTMLElement | null ) : Set < HTMLElement > =>
{
	const set = new Set < HTMLElement >;
	for( let p = e ; p; p = p.parentElement ) set.add( p );
	const ar : HTMLElement[] = [];
	
	// for( let p = e ; p; p = p.parentElement ) ar.push( p );
	// log2( "pathSet\n" + ar.map( e => e.nodeName ).join( "\n" ) );
	
	return set;
}
