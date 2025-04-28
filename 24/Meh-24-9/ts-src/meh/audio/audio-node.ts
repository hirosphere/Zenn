import { log } from "../common.js" ;
import { leaf } from "../model/index.js" ;


/* */

export namespace t
{
	export type Input = Node | Connection ;

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

export abstract class Node
{
	public abstract get core () : AudioNode | undefined ;

	constructor ( com ? : Composition )
	{
		com ?.parts.add ( this ) ;
	}

	public abstract initiate ( ac : AudioContext ) : void ;
	public abstract terminate () : void ;
}

export abstract class Composition extends Node
{
	public abstract output : Node ;
	public readonly parts = new Set < Node > ;

	get core () : AudioNode | undefined
	{
		return this.output.core ;
	}

	public initiate ( ac : AudioContext ) : void
	{
		this.parts.forEach ( node => node.initiate ( ac ) ) ;
	}

	public terminate () : void
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
			// this.src_nodes.add ( src ) ;
		}

		else if ( typeof src == "number" )  target.value = src ;
	}

	public terminate () : void
	{
		// this.src_nodes.forEach ( src  ) ;
		this._core = undefined ;
	}
}

/* */

class Connection
{
	constructor
	(
		protected src : Node ,
		protected dest : Node ,
		protected src_channel : number = 0 ,
		protected dest_channel : number = 0 ,
	)
	{}

	public connect ()
	{
		this.dest?.core && this.src.core?.connect
		(
			this.dest.core ,
			this.src_channel ,
			this.dest_channel
		) ;
	}

	public disconnect ()
	{
		this.dest.core && this.src.core ?.disconnect ( this.dest.core ) ;
	}
}

/* */

export class Gain extends Leaf
{
	protected _core ? : GainNode ;

	constructor ( com : Composition , protected args : t.gain )
	{
		super ( com ) ;
	}

	initiate ( ac : AudioContext ) : void
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

	initiate ( ac : AudioContext ) : void
	{
		this._core = new OscillatorNode ( ac ) ;
		this._core.start () ;
	}

	public override terminate () : void
	{
		this._core ?.stop () ;
		super.terminate () ;
	}
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

let trigger_registered = false ;

export const init = ( compo : Composition ) =>
{
	if ( ac ) compo.initiate ( ac ) ;
	else
	{
		inits.add ( compo ) ;

		if ( ! trigger_registered )
		{
			document.addEventListener ( "touchend" , start , { once : true } ) ;
			document.addEventListener ( "mousedown" , start , { once : true } ) ;
			document.addEventListener ( "keydown" , start , { once : true } ) ;
			trigger_registered = true ;
		}
	}
}


const inits = new Set < Composition > ;
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

			compo.initiate ( ac ) ;
			compo.output.core ?.connect ( ac.destination ) ;
		}
	) ;
}

