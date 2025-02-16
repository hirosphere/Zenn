import { leaf , ef , forms , dom , log } from "../meh/index.js" ;
import * as au from "../meh/audio/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace DM
{
	export class App
	{
		public timeline = new au.Timeline ( { tempo : 120 , } )

		constructor ()
		{
		}
	}
}


namespace VM
{
	export class App
	{
		tempo : forms.range ;

		constructor ( public readonly dm = new DM.App )
		{
			this.tempo = { title : "脈拍" , value : dm.timeline.tempo , min : 1 , max : 360 } ;
		}
	}
}

namespace VC
{
	export const App = () =>
	{
		const vm = new VM.App ;

		return ef.article
		(
			ef.h1 ( "Audio Time Line - 1" ) ,
			DisplayA ( vm ) ,
			DisplayB ( vm ) ,
			ef.section
			(
				forms.range ( vm.tempo ) ,
			)
		) ;	
	}

	const DisplayA = ( vm : VM.App ) =>
	{
		const tl = vm.dm.timeline ;
		return ef.section
		(
			{ class : "DISPLAY_A" } ,
			ef.button ( { acts : { click () { tl.stop () ; } } } , "終止" ) ,
			ef.button ( { acts : { click () { tl.togglecontinue () ; } } } , tl.state.conv ( v => v ? "停止" : "再開" ) ) ,
			ef.button ( { acts : { click () { tl.start () ; } } } , "開始" ) ,
			ef.span ( { class : "ITEM" , style : { width : "12ex" } } , tl.current.conv ( v => ( v / 960 ).toFixed ( 0 ) ) ) ,
			ef.span ( { class : "ITEM TEMPO" , style : { width : "6ex" } } , tl.tempo.conv ( v => ( v ).toFixed ( 0 ) ) ) ,
		)
	}

	const DisplayB = ( vm : VM.App ) =>
	{
		return ef.section
		(
			{ class : "DISPLAY_B" } ,
			ef.span ( { class : "ITEM" , style : { width : "30ex" } } , vm.dm.timeline.offset ) ,
		);
	}
}

export const main = () =>
{
	dom.add ( ef.main ( VC.App () , ClockA () ) , "body" ) ;
}
