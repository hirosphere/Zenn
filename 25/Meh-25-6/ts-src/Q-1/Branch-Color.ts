import { State } from "../Meh/Meh.js" ;

export namespace DM
{
	export type hsl =
	{
		h : number ;
		s : number ;
		l : number ;
	}

	export class HSL extends State < hsl >
	{
		public readonly h : State < number > ;
		public readonly s : State < number > ;
		public readonly l : State < number > ;

		public readonly css : State.r < string > ;

		constructor ( i : hsl )
		{
			super () ;

			this.h = State.new ( i.h , this ) ;
			this.s = State.new ( i.s , this ) ;
			this.l = State.new ( i.l , this ) ;

			this.css = this.cv ( () => HSL.to_css ( this.$ ) ) ;
		}

		public override set ( new_v : hsl , branch ? : State.Branch )
		{
			this.h.set ( new_v.h , this ) ;
			this.s.set ( new_v.s , this ) ;
			this.l.set ( new_v.l , this ) ;

			this.pNotify ( new_v , branch ) ;
		}

		public override get () : hsl
		{
			const [ h , s , l ] = [ this.h.$ , this.s.$ , this.l.$ ] ;
			return { h , s , l } ;
		}

		public /* friend */ fUpdate ()
		{
			this.pNotify ( this.$ ) ;
		}

		public override toString () { return JSON.stringify ( this.$ ) }

		public static to_css ( { h , s , l } : hsl ) : string
		{
			return `hsl( ${ h }  ${ s }  ${ l } )` ;
		}
	}
}
