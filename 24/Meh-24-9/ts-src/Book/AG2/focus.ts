import { leaf , ksel } from "../../meh/index.js" ;
import { Node } from "./node.js" ;

export class FocusDistributor < N >
{
	public current = ksel < NavigatorBadge > ( undefined ) ;

}

export class Item < N extends Node < any > >
{
	constructor
	(
		public target : N ,
		protected focus : ksel < N > ,
		protected defaultNode : N
	)
	{}

	public keypress = ( ev : KeyboardEvent ) : void =>
	{
		const next = this.target.next ;

		if ( ! ev.shiftKey && ! ev.ctrlKey && ! ev.altKey )
		{
			switch ( ev.code )
			{
				case "ArrowRight" :
					if ( next ) this.focus.current.$ = next ;
					break ;

				default : return ;
			}

			if ( ev.target instanceof Element ) ev.target.scrollIntoView () ;
		}
	}
}
