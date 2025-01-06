import { leaf , log } from "../meh/index.js" ;


/* */

export abstract class Node
{
	public abstract get core () : AudioNode | undefined ;

	constructor ( com : Composition )
	{
		com.parts.add ( this ) ;
	}

	public abstract init ( ac : AudioContext ) : void ;
	public abstract term () : void ;
}

export abstract class Composition extends Node
{
	public abstract output : Node ;
	public readonly parts = new Set < Node > ;

	get core () : AudioNode | undefined
	{
		return this.output.core ;
	}

	public init ( ac : AudioContext ) : void
	{
		this.parts.forEach ( node => node.init ( ac ) ) ;
	}

	public term () : void
	{}
}


/* */

abstract class Leaf extends Node
{
	protected abstract _core ? : AudioNode ;
	public get core () { return this._core ; }

	protected src_nodes = new Map < AudioNode , AudioParam > ;
	protected connect_param ( target : AudioParam , src : t.param )
	{
		if ( src instanceof Array )
		{
			src.forEach ( src => this.connect_param ( target , src ) );
			return ;
		}

		if ( src instanceof AudioNode )
		{
			src.connect ( target ) ;
			this.src_nodes.add ( src ) ;
		}

		else if ( typeof src == "number" )  target.value = src ;
	}

	public term () : void
	{
		this.src_nodes.forEach ( src  ) ;
		this._core = undefined ;
	}
}

export class Gain extends Leaf
{
	protected _core ? : GainNode ;

	constructor ( com : Composition , protected args : t.gain )
	{
		super ( com ) ;
	}

	init ( ac : AudioContext ) : void
	{
		this._core = new GainNode ( ac ) ;
	}
}

export class Osc extends Leaf
{
	protected _core ? : OscillatorNode ;

	constructor ( com : Composition , protected args : t.osc )
	{
		super ( com ) ;
	}

	init ( ac : AudioContext ) : void
	{
		this._core = new OscillatorNode ( ac ) ;
		this._core.start () ;
	}

	public override term () : void
	{
		this._core ?.stop () ;
		super.term () ;
	}
}

/* */

class Connection
{
	constructor ( src : Connection.Src )
	{}

	public release ()
	{
		;
	}
}

namespace Connection
{
	export type Channel = { node : AudioNode , ch : number } ;
	export type Src = AudioNode ;
}

/* */

export function gain ( com : Composition , args : t.gain ) : Node
{
	return new Gain ( com , args )
}

export function osc ( com : Composition , args : t.osc ) : Node
{
	return new Osc ( com , args )
}

/* */

export namespace t
{
	export type gain =
	{
		in : Node [] ;
		gain : param ;
	} ;
	
	export type osc =
	{
		freq ? : param ;
		pitch ? : param ;
		type ? : leaf.ll < OscillatorType > ;
	} ;

	export type param = number | Node | [ ( number | Node ) , ... Node [] ] ;
}


/* */

export const inits = new Set < Composition > ;
let ac : AudioContext | undefined ;

const start = async () =>
{
	if( ac )  return ;
	ac = new AudioContext ;

	log ( "au2 start" ) ;

	inits.forEach
	(
		compo =>
		{
			if ( ! ac )  return ;

			compo.init ( ac ) ;
			compo.output.core ?.connect ( ac.destination ) ;
		}
	) ;
}

document.addEventListener ( "touchend" , start , { once : true } ) ;
document.addEventListener ( "mousedown" , start , { once : true } ) ;
document.addEventListener ( "keydown" , start , { once : true } ) ;

