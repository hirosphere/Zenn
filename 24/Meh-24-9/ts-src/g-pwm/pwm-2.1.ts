import { leaf , Renn , dom , ef , each , forms , au , log } from "../meh/index.js" ;
import * as wdt from "../widjet/widjet.js" ;

namespace DM    /* Doc Models */
{
	export class App
	{
		volume = leaf.num ( 0.10 ) ;
		osc = new Pulse () ;
		lfo = new LFO () ;
	}

	export class Pulse
	{
		freq = leaf ( 77.5 ) ;
		u_offset = leaf ( -0 ) ;
		u_amp = leaf ( 1 ) ;
		v_offset = leaf ( -0 ) ;
		v_amp = leaf ( -1 ) ;
	}

	export class LFO
	{
		freq = leaf ( 0.1 ) ;
		waveform = leaf < OscillatorType > ( "sine" );
		cf_amp = leaf ( 0 ) ;
		pw_u_amp = leaf ( 0 ) ;
		pw_v_amp = leaf ( 0 ) ;
	}
}

namespace VM    /*  View Models  */
{
	export class App
	{
		volume : forms.range ;
		freq : forms.range ;
		u_offset : forms.range ;
		u_amp : forms.range ;
		v_offset : forms.range ;
		v_amp : forms.range ;

		lfo_freq : forms.range ;
		lfo_waveform : { [ p in OscillatorType ] ? : string } = { "triangle" : "Tri" , "sine" : "Sine" } ;
		lfo_wf = forms.model ;
		lfo_cf_amp : forms.range ;
		lfo_pw_u_amp : forms.range ;
		lfo_pw_v_amp : forms.range ;

		constructor ( public dm : DM.App )
		{
			this.volume = { title : "音量" ,     value : dm.volume , ... pc ()  } ;

			this.freq   = { title : "周波数" ,   value : dm.osc.freq  , max : 3000 , unit : "Hz" } ;
			this.u_offset  = { title : "Uパルス幅" , value : dm.osc.u_offset , ... pw } ;
			this.u_amp = { title : "U振幅" ,     value : dm.osc.u_amp , ... pc ( -1 )  } ;
			this.v_offset  = { title : "Vパルス幅" , value : dm.osc.v_offset , ... pw } ;
			this.v_amp = { title : "V振幅" ,     value : dm.osc.v_amp , ... pc ( -1 )  } ;

			this.lfo_freq   = { title : "周波数" ,   value : dm.lfo.freq , min : 0.1 , max : 300 , step : 0.1 , unit : "Hz" } ;
			this.lfo_cf_amp = { title : "CF" ,     value : dm.lfo.cf_amp , min : -1200 , max : 1200 , step : 5 } ;
			this.lfo_pw_u_amp = { title : "U PW" ,     value : dm.lfo.pw_u_amp , ... pc ( -1 )  } ;
			this.lfo_pw_v_amp = { title : "V PW" ,     value : dm.lfo.pw_v_amp , ... pc ( -1 )  } ;
		}
	}

	const pc = ( min = 0 ) => null ||
	{
		step : 0.002 ,
		max : 1 ,
		min ,
		to_lv : ( v : number ) => ( v * 100 ) .toFixed ( 1 ) ,
		unit : "%"
	}

	const pw : forms.range.p =
	{
		step : 0.002 ,
		min : -1 , max : 1 ,
		to_lv : v => ( ( v + 1 ) * 50 ) .toFixed ( 1 ) ,
		unit : "%"
	} ;
}


namespace VC    /*  View Components  */
{
	export const App = ( vm : VM.App ) =>
	{
		return ef.article
		(
			ef.h1 ( "PWM-2.1" ) ,
			
			ef.section
			(
				ef.h2 ( "全体" ) ,
				ef.section
				(
					{ class : "Ranges fl-col" } ,
					
					forms.range ( vm.volume ) ,
				) ,	
			) ,

			ef.section
			(
				ef.h2 ( "Pulse Gen" ) ,
				ef.section
				(
					{ class : "Ranges fl-col" } ,
					
					forms.range ( vm.freq ) ,
					forms.range ( vm.u_offset ) ,
					forms.range ( vm.v_offset ) ,
					forms.range ( vm.u_amp ) ,
					forms.range ( vm.v_amp ) ,
				) ,	
			) ,

			ef.section
			(
				ef.h2 ( "LFO" ) ,
				ef.section
				(
					{ class : "Ranges fl-col" } ,
					
					forms.range ( vm.lfo_freq ) ,
					forms.range ( vm.lfo_cf_amp ) ,
					forms.range ( vm.lfo_pw_u_amp ) ,
					forms.range ( vm.lfo_pw_v_amp ) ,
				) ,	
			) ,
		) ;
	}
}


namespace AC    /* Audio Components */
{
	export class App extends au.Composition
	{
		public override readonly output : au.Node ;

		constructor ( m : DM.App )
		{
			super () ;

			const osc = new au.Osc ( this , { freq : 440 , pitch : 0 , type : "sine" } ) ;

			this.output = new au.Gain ( this, { in : [ osc ] , gain : 0.1 } ) ;
		}
	}
}

export const main = () =>
{
	const dm = new DM.App ;
	const vm = new VM.App ( dm ) ;

	au.inits.add ( new AC.App ( dm ) ) ;

	dom.add
	(
		ef.main
		(
			VC.App ( vm ) ,
			wdt.ClockA () ,
		),
		"body"
	) ;
}
