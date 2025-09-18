import { Live } from "./QLiveState.js" ;

namespace DM
{
	export class XY extends Live.NewBranch
	(
		{
			x : Live.Number ,
			y : Live.Number
		}
	)
	{
		public toOrigin () { this.x.$ = this.y.$ = 0 ; }
	}

	class Hue extends Live.Number
	{
		public invert () { this.$ = ( this.$ + 180 ) % 360 ; }
	}

	export class HSL extends Live.NewBranch
	(
		{
			hue : Hue ,
			sat : Live.Number ,
			light : Live.Number
		}
	)
	{
		public quest ()
		{
			this.sat.$ *= 0.8 ;
			this.hue.invert () ;
		}
	}


	export class Shape extends Live.NewBranch
	(
		{
			pos : XY ,
			size : XY ,
			color : HSL
		}
	)
	{}

	const Todo = Live.NewBranch ( { text : Live.String , done : Live.Boolean } ) ;
	type Todo = InstanceType < typeof Todo > ;

	const todo : Todo = new Todo ( { text : "" , done : false } ) ;
}

namespace DM.ADSR
{
	export class WaveForm extends Live.NewLeaf < "SINE" | "SAW" | "SQR" | "TRI" > ( "SINE" ) {}

	export class Oscillator extends Live.NewBranch
	(
		{
			Tune : Live.Number ,
			WaveForm : WaveForm
		}
	)
	{}

	export class EG extends Live.NewBranch
	(
		{
			Attack : Live.Number ,
			Decay : Live.Number ,
			Sustain : Live.Number ,
			Release : Live.Number ,
		}
	)
	{}	
}

namespace SB
{
	( s : Live.Number ) =>
	{
		s.$ = 255 ;
		s.set ( 127 ) ;
	}
	
	() =>
	{
		const s = new Live.Number ( 5 ) ;
	}

	( l : Live.Number [ "$" ] , sh : DM.Shape ) =>
	{
		sh.color.hue.invert () ;
		sh.pos.$ = { x : 22 , y : 57 } ;
		sh.size.toOrigin () ;

		sh.pos.x.$ ++ ;

		sh.color.$ = { hue : 90 , sat : 0.6 , light : 0.6 } ;
	}
}



