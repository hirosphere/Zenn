import { leaf , ef , pl , forms , log } from "../../meh/index.js" ;

namespace DM
{
	export const App = () =>
	(
		{
			color : new OKLCH ( { l : 0.7 , c : 0.43 , h : 135 } ) ,
		}
	)

	export class OKLCH
	{
		l ; c ; h ;
		css ;

		constructor ( v : OKLCH.v )
		{
			this.l = leaf ( v.l , this ) ;
			this.c = leaf ( v.c , this ) ;
			this.h = leaf ( v.h , this ) ;

			this.css = leaf ( "" ) ;

			this.update () ;
		}

		update ()
		{
			const { l , c , h } = this.value ;
			this.css .value = `oklch( ${ percent( l ) } ${ percent( c ) } ${ fixed( h ) } )` ;
		}

		get value () : OKLCH.v
		{
			return { l : this.l.value , c : this.c.value , h : this.h.value } ;
		}
	}

	namespace OKLCH
	{
		export type v =
		{
			l : number ;
			c : number ;
			h : number ;
		}
	}

	export const OKLCH_ = (  ) =>
	{
		const update = () =>
		{
			const { l , c , h } = m.value ;
			m.css .value = `oklch( ${ percent( l ) } ${ percent( c ) } ${ fixed( h ) } )` ;
		}

		const br = { update } ;

		const m =
		{
			l : leaf ( 0 , br ) ,
			c : leaf ( 0 , br ) ,
			h : leaf ( 0 , br ) ,
			css : leaf ( "" ) ,

			get value () : OKLCH.v
			{
				return { l : m.l.value , c : m.c.value , h : m.h.value  }
			}
		}

		br.update () ;
		return m ;
	}

	const percent = ( v : number ) => ( v * 100 ).toFixed ( 1 ) + "%" ;
	const fixed = ( v : number ) => v.toFixed ( 1 ) ;

	export type OKLCH_ = ReturnType < typeof OKLCH_ > ;
}


namespace VM
{
	export const App = () =>
	{
		const dm = DM.App () ;

		return null ||
		{
			dm ,
			ranges : Ranges ( dm.color ) ,
		}
	}

	export const Ranges = ( dm : DM.OKLCH ) =>
	(
		{
			l : { title : "明度(L)" , value : dm.l , step : 0.01 , max : 1 , unit : "%" , to_lv  } ,
			c : { title : "彩度(C)" , value : dm.c , step : 0.01 , max : 1 , unit : "%" , to_lv } ,
			h : { title : "色相(H)" , value : dm.h , step : 1 , max : 360 } ,
		}
	) ;

	const to_lv = ( v : number ) => ( v * 100 ).toFixed ( 1 ) ;

	export type Ranges = ReturnType < typeof Ranges > ;
}


export const OKLCH = () =>
{
	const vm = VM.App () ;

	return ef.main
	(
		{ class : "AF0 UIG_COLOR_1" } ,
		ef.h1 ( "OKLCH" ) ,
		Display ( vm.dm.color ) ,
		Ranges ( vm.ranges ) ,
	) ;
}

const Display = ( dm : DM.OKLCH ) => ef.section
(
	{
		class : "_DISPLAY" ,
		style : { backgroundColor : dm.css , }
	} ,

	ef.span ( { class : "_VALUE _W" } , dm .css ) ,
	ef.span ( { class : "_VALUE _B" } , dm .css ) ,
) ;

const Ranges = ( vm : VM.Ranges ) =>
{
	return ef.section
	(
		{ class : "_RANGES" } ,
		forms.range ( vm.l ) ,
		forms.range ( vm.c ) ,
		forms.range ( vm.h ) ,
	)
}
