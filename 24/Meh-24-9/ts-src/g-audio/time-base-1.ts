import { leaf , ef , forms , dom , au , log } from "../meh/index.js" ;
import { ClockA } from "../widjet/widjet.js" ;

namespace DM
{
	export class App
	{
		public timebase = new au.Player ( { tempo : 120 , } )

		constructor ()
		{
		}
	}
}

namespace VM
{
	export class App
	{
		constructor ( public readonly dm = new DM.App )
		{
		}

		public update ()
		{
			;
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
			ef.h1 ( "Audio Timebase" ) ,
		) ;	
	}
}

export const main = () =>
{
	dom.add ( ef.main ( VC.App () , ClockA () ) , "body" ) ;
}
