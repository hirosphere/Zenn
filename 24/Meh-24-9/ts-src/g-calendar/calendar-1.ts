import { leaf , Renn , dom , ef , log } from "../meh/index.js" ;

namespace VM
{
	export class Calendar
	{
		month = new Month ( new Date ) ;
	}

	export class Month
	{
		constructor
		(
			protected spec : Date ,
		)
		{}

		get title () : string
		{
			return `${ this.spec.getMonth () + 1 }月` ;
		}
	}
}

namespace VC
{
	export const App = () =>
	{
		const vm = new VM.Calendar ;

		return ef.article
		(
			ef.h1 ( "カレンダー" ) ,
			
			Month ( vm.month ) ,
		)
	}

	const Month = ( vm : VM.Month ) =>
	{
		return ef.section
		(
			ef.h2 ( vm.title ) ,
		)
	}
}

export const main = ( com : string | HTMLElement = "body" ) =>
{
	dom.add ( VC.App () , com ) ;
}
