import { leaf , Renn , dom , ef , each , forms , navi , log } from "../meh/index.js" ;
import * as af from "../meh-au/audio.js" ;

namespace DM    /* doc models */
{
	export class App
	{
		freq = leaf ( 300 ) ;
		width = leaf ( 0.5 ) ;
		volume = leaf.num ( 0.155 ) ;
	}
}

namespace VM    /*  view models  */
{
	export class App
	{
		freq : forms.range ;
		width : forms.range ;
		volume : forms.range ;

		constructor ( public dm : DM.App )
		{
			this.freq   = { title : "周波数" ,   value : dm.freq  , max : 3000 , unit : "Hz" } ;
			this.width  = { title : "パルス幅" , value : dm.width , ... pc } ;
			this.volume = { title : "音量" ,     value : dm.volume , ... pc  }
		}
	}

	const pc =
	{
		step : 0.01 ,
		max : 1 ,
		to_lv : ( v : number ) => ( v * 100 ) .toFixed ( 0 ) ,
		unit : "%"
	}
}


namespace VC    /*  view components  */
{
	export const App = ( vm : VM.App , au_start : () => void ) =>
	{
		document.documentElement.addEventListener ( "mousedown" , au_start ) ;

		return ef.article
		(
			ef.h2 ( "Article" ) ,
			
			ranges ( vm ) ,

			ef.section
			(
				ef.h3 ( "Section" )
			) ,

			ef.section
			(
				ef.h3 ( "Section" )
			) ,
		) ;
	}

	const ranges = ( vm : VM.App ) => ef.section
	(
		{ class : "Ranges fl-col" } ,

		forms.range ( vm.freq ) ,
		forms.range ( vm.width ) ,
		forms.range ( vm.volume ) ,
	)
}

namespace AC    /* Audio Components */
{
	export const PWM = ( m : DM.App , ac : AudioContext ) =>
	{
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
		),
		"body"
	) ;
}
