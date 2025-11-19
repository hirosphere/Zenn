import { Live } from "../../Meh/Meh.js" ;

type uned = undefined ;
const uned = undefined ;

const log = console.log ;

export const Tone = new class Tone
{
	public readonly volume = Live ( 0.2 ) ;

	public start () : void
	{
		this.ac.resume () ;
		log ( "Tone start" ) ;
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

	get voice () : Voice { return this.#_voice ??= new Voice ( this.ac , this.make () ) ; }
	
	#_gain ? : GainNode ;
	#_voice ? : Voice ;
}


/*  */

class Voice
{
	constructor ( private ac : AudioContext , private dest : AudioNode )
	{}

	public sch ( notes : [ number , number ] [] ) : void
	{
		if ( this.ac.state != "running" )  return ;
		const ac = this.make () ;

		let t = ac.currentTime ;
		this.#_osc?.detune.cancelScheduledValues ( t ) ;
		notes.forEach
		(
			n =>
			{
				const r = this.#_osc?.detune.setValueAtTime ( n [ 1 ] * 100 , t ) ;
				t += n [ 0 ] ;
				return r ;
			}
		) ;

		this.trigger () ;
	}

	public trigger () : void
	{
		if ( this.ac.state != "running" )  return ;
		const ac = this.make () ;

		const a = 0.001 ;
		const d = 0.5 ;

		let t = ac.currentTime ;
		this.#_gain ?.gain.cancelAndHoldAtTime ( t ) ;
		// this.#_gain ?.gain.cancelScheduledValues ( t ) ;
		this.#_gain ?.gain.setTargetAtTime ( 1 , t += a , a ) ;
		this.#_gain ?.gain.setTargetAtTime ( 0 , t += d , d ) ;
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

