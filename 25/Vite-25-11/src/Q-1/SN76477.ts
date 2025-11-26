
namespace types
{
	export type chip =
	{
		Gate : boolean ;

		MixMode : 0 | 1 | 2 ;
		EG_Attack : number ;
		EG_Decay : number ;
		Oneshot_Time : number ;
		LFO_Freq : number ;
		Noise_Clock : number ;
		Osc_Freq : number ;
		Osc_PWM : boolean ;

	}

	export type osc =
	{
		frequency : number ;
	}

	export type eg =
	{
		attack : number ;
		decay : number ;
	}

	export type ng =
	{
		clock : number ;
	}
}

