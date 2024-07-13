
export namespace defs
{
	export type Component =
	{
		nodes : { [ name : string ] : Node };
	};

	export type Oscillator =
	{
		frequency : number ;
	};

	export type Gain =
	{
		gain : number ;
	}
}

export namespace nfac
{
	type NodeCreator = ( ac : AudioContext ) => AudioNode ;
	
	export const Oscillator = ( def : defs.Oscillator ) : NodeCreator  =>
	{
		return ac => new OscillatorNode( ac );
	}
}
