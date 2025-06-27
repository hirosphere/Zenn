import { Leaf } from "../Meh/Meh.js" ;

export namespace DM
{
	export type hsl =
	{
		h : number ;
		s : number ;
		l : number ;
	}

	export class HSL extends Leaf < hsl >
	{
		public readonly h : Leaf < number > ;
		public readonly s : Leaf < number > ;
		public readonly l : Leaf < number > ;

		public readonly css : Leaf.r < string > ;

		constructor ( i : hsl )
		{
			super () ;

			this.h = Leaf.new ( i.h , this ) ;
			this.s = Leaf.new ( i.s , this ) ;
			this.l = Leaf.new ( i.l , this ) ;

			this.css = this.cv ( () => HSL.to_css ( this.$ ) ) ;
		}

		public override set ( new_v : hsl , is_branch ? : boolean )
		{
			this.h.set ( new_v.h , true ) ;
			this.s.set ( new_v.s , true ) ;
			this.l.set ( new_v.l , true ) ;

			this.p_notify ( new_v , is_branch ) ;
		}

		public override get () : hsl
		{
			const [ h , s , l ] = [ this.h.$ , this.s.$ , this.l.$ ] ;
			return { h , s , l } ;
		}

		public override toString () { return JSON.stringify ( this.$ ) }

		public static to_css ( { h , s , l } : hsl ) : string
		{
			return `hsl( ${ h }  ${ s }  ${ l } )` ;
		}
	}
}
