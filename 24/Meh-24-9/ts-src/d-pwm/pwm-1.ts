import { leaf , Renn , dom , ef , each , forms , log } from "../meh/index.js" ;
import * as af from "../meh-au/audio.js" ;
import * as wdt from "../widjet/widjet.js" ;

namespace DM    /* Doc Models */
{
	export class App
	{
		freq = leaf ( 1684 ) ;
		offset = leaf ( -0.95 ) ;
		volume = leaf.num ( 0.10 ) ;
	}
}

namespace VM    /*  View Models  */
{
	export class App
	{
		freq : forms.range ;
		offset : forms.range ;
		volume : forms.range ;

		constructor ( public dm : DM.App )
		{
			this.freq   = { title : "周波数" ,   value : dm.freq  , max : 3000 , unit : "Hz" } ;
			this.offset  = { title : "パルス幅" , value : dm.offset , ... pw } ;
			this.volume = { title : "音量" ,     value : dm.volume , ... pc  }
		}
	}

	const pc =
	{
		step : 0.002 ,
		max : 1 ,
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
			ef.h2 ( "Article" ) ,			
			ranges ( vm ) ,

			ef.section
			(
				ef.h3 ( "Section" ) ,
			) ,

			ef.section
			(
				ef.h3 ( "Section" ) ,
			) ,
		) ;
	}

	const ranges = ( vm : VM.App ) => ef.section
	(
		{ class : "Ranges fl-col" } ,

		forms.range ( vm.freq ) ,
		forms.range ( vm.offset ) ,
		forms.range ( vm.volume ) ,
	)

	const ae = ( type : keyof GlobalEventHandlersEventMap , hdr : () => void ) =>
	{
		document.documentElement.addEventListener ( type , hdr , { once : true } )
	}
}

namespace AC    /* Audio Components */
{
	export const PWM = ( m : DM.App , ac : AudioContext ) =>
	{
		const osc = af.osc ( { freq : af.constant ( m.freq , 0.01 , ac ) , type : "triangle" } , ac ) ;
		const bias = af.constant ( m.offset , 0.02 , ac ) ;
		const scaled = af.gain ( [ osc , bias ] , 10000 , ac ) ;

		const pulse = af.shaper
		(
			[ scaled ] ,
			new Float32Array ( [ -1 , 1 ] ) ,
			ac
		) ;


		const root = af.gain
		(
			// [ pulse , af.pil ( 100 , ac ) , af.pil ( 100.3 , ac ) , af.pil ( 500.25 , ac ) , af.pil ( 500.75 , ac ) , ] ,
			[ pulse ] ,
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
			ef.h1 ( "PWM-1" ) ,
			VC.App ( vm , au_start ) ,
			wdt.ClockA () ,
		),
		"body"
	) ;
}
