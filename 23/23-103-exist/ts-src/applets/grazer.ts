import { Hook, Option } from "../meh/index.js";

type Args =
{
	buttons : number ;
	root : Hook ;
};


export class Grazer
{
	constructor( protected args : Args )
	{
		;
	}

	public start() : void
	{
		;
	}

	public move( option : Option ) : boolean
	{
		return false;
	}
}

export class TouchToMouse
{
	constructor( container : HTMLElement, protected buttons : number )
	{
		container.addEventListener( "touchstart", this.start );
		container.addEventListener( "touchmove", this.move );
		container.addEventListener( "touchcancel", this.end );
		container.addEventListener( "touchend", this.end );
	}

	protected start( ev : TouchEvent ) : void
	{}
	
	protected move( ev : TouchEvent ) : void
	{
		this.dispatch( "mousemove", ev );
	}
	
	protected end( ev : TouchEvent ) : void
	{}
	
	protected dispatch( type : string, ev : TouchEvent )
	{
		if( ev.touches.length != 1 ) return null;

		const touch = ev.touches[ 0 ];
		if( ! touch )  return;

		const e = document.elementFromPoint( touch.clientX, touch.clientY );

		e?.dispatchEvent( new MouseEvent( type,
		{
			cancelable: true,
			bubbles : true,
			buttons: this.buttons,
			... touch
		}));
	}
}
