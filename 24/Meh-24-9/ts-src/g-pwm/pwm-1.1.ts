import { leaf , Renn , dom , ef , each , forms , navi , log } from "../meh/index.js" ;
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
		v_offset = leaf ( -0 ) ;
		u_amp = leaf ( 1 ) ;
		v_amp = leaf ( -1 ) ;
	}

	export class LFO
	{
		freq = leaf ( 0.1 ) ;
		amp = leaf ( 0 ) ;
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

		constructor ( public dm : DM.App )
		{
			this.volume = { title : "音量" ,     value : dm.volume , ... pc ()  } ;
			this.freq   = { title : "周波数" ,   value : dm.osc.freq  , max : 3000 , unit : "Hz" } ;
			this.u_offset  = { title : "Uパルス幅" , value : dm.osc.u_offset , ... pw } ;
			this.u_amp = { title : "U振幅" ,     value : dm.osc.u_amp , ... pc ( -1 )  } ;
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
	export const App = ( vm : VM.App , au_start : () => void ) =>
	{
		ae ( "mousedown" , au_start ) ;
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
					forms.range ( vm.u_amp ) ,
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
	export const PWM = ( m : DM.App , ac : AudioContext ) =>
	{
		const osc = af.osc ( { freq : af.constant ( m.osc.freq , 0.01 , ac ) , type : "triangle" } , ac ) ;
		const bias = af.constant ( m.osc.u_offset , 0.02 , ac ) ;
		const scaled = af.gain ( [ osc , bias ] , 10000 , ac ) ;

		const pulse = af.shaper
		(
			[ scaled ] ,
			new Float32Array ( [ -1 , 1 ] ) ,
			ac
		) ;

		const u_amp = af.gain ( [ pulse ] , [ af.constant ( m.osc.u_amp , 0.01 , ac ) ] , ac ) ;


		const root = af.gain
		(
			// [ pulse , af.pil ( 100 , ac ) , af.pil ( 100.3 , ac ) , af.pil ( 500.25 , ac ) , af.pil ( 500.75 , ac ) , ] ,
			[ u_amp ] ,
			[ af.constant ( m.volume , 0.01 , ac ) ],
			ac
		) ;

		root.node.connect ( ac.destination ) ;
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
		AC.PWM ( vm.dm , ac ) ;
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
