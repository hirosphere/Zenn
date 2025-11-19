import { Live , DD , ef , log } from "../../Meh/Meh.js" ;

export function Range ( vm : Range.vm , css ? : string ) : DD.Mel
{
	const con = ef.section
	(
		{ class : "RANGE" , } ,
		ef.label( vm.title ) ,
		ef.input
		(
			{
				attrs :
				{
					type : "range" ,
					min : tos ( vm.min ) ,
					max : tos ( vm.max ) ,
					step : tos ( vm.step ) ,
				} ,
				biBind : { vInpN : vm.value }
			}
		) ,
		ef.span
		(
			ef.span ( {  } , vm.lv ? vm.value.trans_r ( vm.lv ) : vm.value ) ,
		) ,
	) ;

	return ef.div ( { shadow : css ?? Range.def_css } , con ) ;
}

function tos ( ll ? : Live.R.ll.num ) : Live.R.ll.str | undefined
{
	return ll instanceof Live ? ll.trans_r ( v => String ( v ) ) : String ( ll ) ;
}

export namespace Range
{
	export type vm =
	{
		title : Live.R.ll.str ;
		value : Live.num ;
		min ? : Live.R.ll.num ;
		max ? : Live.R.ll.num ;
		step ? : Live.R.ll.num ;
		unit ? : Live.R.ll.str ;
		lv ? : ( value : number ) => string ;
	}

	export const def_css = /* css */ `

	* box-sizing : border-box ;

	.RANGE
	{
		display : grid ;
		gap : 1ex ;
	}

	input
	{
		width : 300px ;
	}

	` ;
}
