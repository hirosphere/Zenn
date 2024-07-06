import { log } from "../meh/index.js";

export class EQDrop
{
	public set_data() : void
	{}

	public test()
	{
		log( "EQDrop" );
	}
}

export namespace defs
{
	export type src =
	{
		node : AudioNode ;
		channel ? : number ;
	}

	export class Component
	{
		;
	}

	export class Gain extends Component{}
}

namespace af
{
	export const Gain = () => new defs.Gain(  );
}

const create = ( def : defs.Component, ac ? : AudioContext ) =>
{
	;
}

const Drop = (  ) =>
{
	return af.Gain
	(

	);
}

namespace n1
{
	const Osc = ( ac : AudioContext ) =>
	{
		return new OscillatorNode( ac, { frequency: 440 } );
	}

	() =>
	{
		const x : keyof OscillatorNode = "frequency";
	}
}
