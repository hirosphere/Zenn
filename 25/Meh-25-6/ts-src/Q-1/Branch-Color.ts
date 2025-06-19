import { Leaf } from "../Meh/Meh.js" ;

namespace DM
{
	export type hsl =
	{
		h : number ;
		s : number ;
		l : number ;
	}

	export class HSL extends Leaf.Base < hsl >
	{
		public set ( new_v : hsl )
		{}

		public get () : hsl
		{
			return { h : 0 , s : 0 , l : 0 } ;
		}
	}
}

namespace VM.Menu
{
	const init =
	{
		ja : {} ,
		en : {}
	}
}

