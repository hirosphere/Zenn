import { Live } from "../../../Meh/Meh.js" ;


let ac : AudioContext | undefined ;

const inits : ( () => void ) [] = [] ;

export interface Node
{
	out ? : AudioNode ;
	term () : void ;
}

export abstract class Node implements Node
{
	public out ? : AudioNode ;
	public composite ? : Composite ;

	constructor ( protected com : Composite | undefined )
	{
		com ?. [ addpart ] ( this ) ;

		if ( ac ) this.init ( ac ) ;
		else inits.push ( () => ac && this.init ( ac ) ) ;
	}

	protected abstract init ( ac : AudioContext ) : void ;

	public term () : void
	{
		this.pcs.terminate () ;
		this.out ?.disconnect () ;
	}

	protected pcs = new param.conns ;
}

export abstract class Composite extends Node
{
	public [ addpart ] ( part : Node ) : void
	{
		this.parts.push ( part ) ;
	}

	protected parts : Node [] = [] ;
}

const addpart = Symbol () ;


/* */


export abstract class Gen < param > extends Node
{
	constructor
	(
		protected p : param  ,
		com : Composite
	)
	{ super ( com ); }
}

export abstract class Mut < param > extends Node
{
	constructor
	(
		protected input : audio.srcs ,
		protected p : param  ,
		com : Composite
	)
	{ super ( com ); }
}

export class Osc extends Gen < osc >
{
	protected init ( ac : AudioContext ) : void
	{
		const an = new OscillatorNode ( ac ) ;

		this.pcs.add ( an.frequency , this.p.freq ) ;
		this.pcs.add ( an.detune , this.p.pitch ) ;

		an.start () ;
		this.out = an ;
	}

	public override term () : void
	{
		if ( this.out instanceof OscillatorNode )  this.out.stop () ;
		super.term () ;
	}
}

export type osc =
{
	freq ? : param.srcs ;
	pitch ? : param.srcs ;
}

/* */

export class Gain extends Mut < gain >
{
	protected override init ( ac : AudioContext ) : void
	{
		const an = this.out = new GainNode ( ac , { gain : 0 } ) ;
		this.pcs.add ( an.gain , this.p.gain ) ;
	}
}

export type gain =
{
	gain : param.srcs ;
} ;


/* */

export namespace param
{
	export type src = number | Node | { node : Node , ch ? : number } ;
	export type srcs = src | src [] ;
	export type conn = { dest : AudioParam , src : AudioNode } ;

	export class conns
	{
		public add ( dest : AudioParam , src ? : srcs ) : void
		{
			if ( src == undefined )  return ;
	
			if ( src instanceof Array )
			{
				src.forEach ( src => this.add ( dest , src ) ) ;
				return ;
			}
	
			if ( typeof src == "number" )
			{
				dest.value = src ;
				return ;
			}
	
			if ( src instanceof Node && src.out )
			{
				src.out.connect ( dest ) ;
				this.conns.push ( { dest , src : src.out  } ) ;
				return ;
			}
	
			if ( "node" in src && src.node.out )
			{
				src.node.out.connect ( dest , src.ch ) ;
				this.conns.push ( { dest , src : src.node.out } ) ;
			}
		}

		public terminate () : void
		{
			this.conns.forEach
			(
				conn => conn.src.disconnect ( conn.dest )
			) ;
		}

		protected conns : conn [] = [] ;
	}
}

export namespace audio
{
	export type src = Node | { node : Node , sch ? : number , dch ? : number } ;
	export type srcs = src | src [] ;
}
