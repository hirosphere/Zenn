import { leaf , log } from "../meh/index.js" ;

type AC = AudioContext ;
class PSMap extends Map < node , AudioParam > {}

/* */

export interface node
{
	node : AudioNode ;
	term () : void ;
	ps_map : PSMap ;
	const_srcs : Set < leaf.ref < any > > ;
}

export namespace t
{
	export type osc =
	{
		freq ? : param_srcs ;
		pitch ? : param_srcs ;
		type ? : leaf.ll < OscillatorType > ;
	}
}

const new_an = () =>
{
	const an =
	{
		ps_map : new PSMap ,
		const_srcs : new Set < leaf.ref < any > > ,

		term()
		{
			this.const_srcs.forEach ( src => src.term ?.() ) ;
			this.ps_map.forEach ( ( param , src ) => src.node.disconnect ( param ) ) ;
		}
	}

	return an ;
}

export const gain = ( input : node [] , gain : param_srcs , ac : AC ) : node =>
{
	const node = new GainNode ( ac , { gain : 0.0 } ) ;
	const an = { node , ... new_an () }

	input.forEach ( i => i.node.connect ( node ) ) ;
	connect_param ( an , node.gain , gain ) ;
	
	return an ;
}

export const constant = ( offset : leaf.ll.num , st_rate : number , ac : AC ) : node =>
{
	const node = new ConstantSourceNode ( ac , { offset : leaf.get ( offset ) } ) ;
	const an = { node , ... new_an () } ;

	const value_changed = ( v : number ) =>
	{
		node.offset.setTargetAtTime
		(
			v , ac.currentTime , st_rate
		) ;
	}

	bind_ll ( an , value_changed , offset ) ;
	node.start () ;

	return an ;
}

export const osc = ( args : t.osc , ac : AC ) : node =>
{
	const node = new OscillatorNode ( ac , { frequency : 0 } ) ;
	const an = { node , ... new_an () } ;

	connect_param ( an , node.frequency , args.freq ) ;
	connect_param ( an , node.detune , args.pitch ) ;
	bind_ll < OscillatorType > ( an , v => node.type = v , args.type ?? "sine" ) ;

	node.start () ;

	return an ;
}

export const shaper = ( input : node [] , curve : leaf.ll < Float32Array > , ac : AC ) =>
{
	const node = new WaveShaperNode ( ac ) ;
	node.oversample = "4x" ;
	const an = { node , ... new_an () } ;

	bind_ll
	(
		an ,
		table => node.curve = table ,
		curve
	) ;

	input.forEach ( i => i.node.connect ( node ) ) ;

	return an ;
}

export const pil = ( freq : number , ac : AC ) =>
{
	const node = new OscillatorNode ( ac , { frequency : freq } ) ;
	node.start () ;

	return null ||
	{
		node ,
		... new_an ()
	}
}

const connect_param = ( an : node , param : AudioParam , srcs ? : param_srcs ) =>
{
	if ( srcs instanceof Array )
	{
		srcs.forEach ( i => connect_param ( an , param , i ) ) ;
		return ;
	}

	if( typeof srcs == "object" )
	{
		srcs.node.connect ( param ) ;
		an.ps_map.set ( srcs , param ) ;
	}

	else if ( srcs !== undefined ) param.value = srcs ;
}

const bind_ll = < V >
(
	an : node ,
	update : ( val : any ) => void ,
	value : leaf.ll < V >
) =>
{
	if ( value instanceof leaf.Src )
	{
		an.const_srcs.add
		(
			leaf.ref ( value , update )
		);
		return ;
	}

	update ( value ) ;
}

export type param_srcs = number | node | [ number | node , ... node [] ]  ;
