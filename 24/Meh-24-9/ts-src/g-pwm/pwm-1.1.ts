import { leaf , Renn , dom , ef , each , forms , log } from "../meh/index.js" ;
import * as af from "../meh-au/audio.js" ;
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

	const pc = ( min = 0 ) => (
	{
		step : 0.002 ,
		max : 1 ,
		min ,
		to_lv : ( v : number ) => ( v * 100 ) .toFixed ( 1 ) ,
		unit : "%"
	});

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
	export const App = ( vm : VM.App , au_start : () => void ) =>
	{
		ae ( "mousedown" , au_start ) ;
		ae ( "touchend" , au_start ) ;
		ae ( "keydown" , au_start ) ;

		return ef.article
		(
			ef.h1 ( "PWM-1.1" ) ,
			
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

	const ae = ( type : keyof GlobalEventHandlersEventMap , hdr : () => void ) =>
	{
		document.documentElement.addEventListener ( type , hdr , { once : true } )
	}
}

namespace AC    /* Audio Components */
{
	export const App = ( m : DM.App , ac : AudioContext ) =>
	{
		const lfo_osc = af.osc ( { freq : af.constant ( m.lfo.freq , 0.01 , ac ) , type : "sine" } , ac ) ;
		const lfo_cf_amp = af.gain ( [ lfo_osc ] , [ af.constant ( m.lfo.cf_amp , 0.01 , ac ) ] , ac ) ;
		const lfo_pw_u_amp = af.gain ( [ lfo_osc ] , [ af.constant ( m.lfo.pw_u_amp , 0.01 , ac ) ] , ac ) ;
		const lfo_pw_v_amp = af.gain ( [ lfo_osc ] , [ af.constant ( m.lfo.pw_v_amp , 0.01 , ac ) ] , ac ) ;

		const osc = af.osc ( { freq : af.constant ( m.osc.freq , 0.01 , ac ) , pitch : lfo_cf_amp , type : "triangle" } , ac ) ;

		const u_pulse = pulse_shaper ( osc , lfo_pw_u_amp , m.osc.u_offset , m.osc.u_amp , ac ) ;
		const v_pulse = pulse_shaper ( osc , lfo_pw_v_amp , m.osc.v_offset , m.osc.v_amp , ac ) ;

		const root = af.gain
		(
			// [ pulse , af.pil ( 100 , ac ) , af.pil ( 100.3 , ac ) , af.pil ( 500.25 , ac ) , af.pil ( 500.75 , ac ) , ] ,
			[ u_pulse , v_pulse ] ,
			[ af.constant ( m.volume , 0.01 , ac ) ],
			ac
		) ;

		root.node.connect ( ac.destination ) ;
	}

	const pulse_shaper =
	(
		carriar : af.node ,
		moduration : af.node ,
		offset : leaf.ll.num ,
		amp : leaf.ll.num ,
		ac : AudioContext
	
	) : af.node =>
	{
		const bias = af.constant ( offset , 0.02 , ac ) ;
		const scaled = af.gain ( [ carriar , bias, moduration ] , 10000 , ac ) ;

		const pulse = af.shaper
		(
			[ scaled ] ,
			new Float32Array ( [ -1 , 1 ] ) ,
			ac
		) ;

		return af.gain ( [ pulse ] , [ af.constant ( amp , 0.01 , ac ) ] , ac ) ;
	}
}

export const main = () =>
{
	const dm = new DM.App ;
	const vm = new VM.App ( dm ) ;

	let ac : AudioContext ;
	const au_start = async () =>
	{
		if( ac ) return ;

		ac = new AudioContext ;
		ac.resume () ;
		log ( ac.state )
		AC.App ( vm.dm , ac ) ;
	}

	dom.add
	(
		ef.main
		(
			VC.App ( vm , au_start ) ,
			wdt.ClockA () ,
		),
		"body"
	) ;
}
