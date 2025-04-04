import { leaf , ef , pl , forms , log } from "../../meh/index.js" ;

namespace DM
{
	export const App = () =>
	(
		{
			color : OKLCH () ,
		}
	)

	export const OKLCH = (  ) =>
	{
		return null ||
		{
			l : leaf ( 0 ) ,
			c : leaf ( 0 ) ,
			h : leaf ( 0 ) ,
		}
	}

	export type OKLCH = ReturnType < typeof OKLCH > ;
}


namespace VM
{
	export const App = () =>
	{
		const dm = DM.App () ;

		return null ||
		{
			ranges : Ranges ( dm.color ) ,
		}
	}

	export const Ranges = ( dm : DM.OKLCH ) =>
	(
		{
			l : { title : "明度" , value : dm.l } ,
			c : { title : "彩度" , value : dm.c } ,
			h : { title : "色相" , value : dm.h } ,
		}
	) ;

	export type Ranges = ReturnType < typeof Ranges > ;
}


export const OKLCH = () =>
{
	const vm = VM.App () ;

	return ef.main
	(
		{ class : "UIG_OKLCH" } ,
		ef.h1 ( "OKLCH" ) ,
		Ranges ( vm.ranges ) ,
	) ;
}

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
