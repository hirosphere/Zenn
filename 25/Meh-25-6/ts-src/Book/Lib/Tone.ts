import { Live } from "../../Meh/Meh.js" ;

type uned = undefined ;
const uned = undefined ;

const log = console.log ;

export class Tone
{
	public readonly volume = Live ( 0.2 ) ;
	public readonly tempo = Live ( 120 ) ;
	public readonly transpose = Live ( 0 ) ;

	public start () : void
	{
		this.ac.resume () ;
	}

	protected make () : AudioNode
	{
		if ( this.#_gain )  return  this.#_gain ;

		const ac = this.ac ;

		const gain = this.#_gain = new GainNode ( ac , { gain : 0 } ) ;
		gain.connect ( ac.destination ) ;

		this.volume.add_ref ( { vChan : () => gain.gain.setTargetAtTime ( this.volume.$ , ac.currentTime , 0.02 ) } ) ;

		return this.#_gain ;
	}

	protected get ac () : AudioContext { return this.#_ac ??= new AudioContext () ; }
	#_ac ? : AudioContext ;

	get voice () : Voice { return this.#_voice ??= new Voice ( this.ac , this.make () , this ) ; }
	
	#_gain ? : GainNode ;
	#_voice ? : Voice ;
}

export namespace Tone
{
	export type note = [ number , number ] ;
}


/*  */

class Voice
{
	constructor ( private ac : AudioContext , private dest : AudioNode , private tone : Tone )
	{}

	public sch ( notes : [ number , number ] [] ) : void
	{
		if ( this.ac.state != "running" )  return ;
		
		const ac = this.make () ;
		const batt = ( 240 / this.tone.tempo.$ ) ;

		let t = ac.currentTime ;
		
		notes.forEach
		(
			note => t = this.sch_note ( t , note , batt )
		) ;
	}

	protected sch_note ( start : number , note : Tone.note , batt : number ) : number /* next time */
	{
		const key = note [ 1 ] + this.tone.transpose.$ ;
		const len = batt / note [ 0 ] ;

		const a = 0.0005 ;
		const d = len * 0.5 ;
		const r = 0.01 ;

		this.#_osc  ?.detune.cancelAndHoldAtTime ( start ) ;
		this.#_osc  ?.detune.setValueAtTime ( ( key - 69 ) * 100 , start ) ;
		this.#_gain ?.gain  .cancelAndHoldAtTime ( start ) ;

		let t = start ;

		this.#_gain ?.gain  .setTargetAtTime ( 1 , t += a , a ) ;
		this.#_gain ?.gain  .setTargetAtTime ( 0.5 , t += d , d ) ;
		this.#_gain ?.gain  .setTargetAtTime ( 0 , t , r ) ;

		return start + len ;
	}

	private make () : AudioContext
	{
		const ac = this.ac ;

		if ( this.#_gain )  return ac ;

		this.#_osc = new OscillatorNode ( ac , {  } ) ;
		this.#_osc.start () ;
		this.#_gain = new GainNode ( ac , { gain : 0 } ) ;

		this.#_osc.connect ( this.#_gain ) ;
		this.#_gain.connect ( this.dest ) ;

		return ac ;
	}

	#_osc ? : OscillatorNode ;
	#_gain ? : GainNode ;
}

