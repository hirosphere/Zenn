import { leaf , ef , forms , dom , log } from "../meh/index.js" ;

namespace DM
{
	export class App
	{
		public exp = leaf ( 0 ) ;
		public readonly step = 12 * 12 ;
		public pow : leaf.str ;

		constructor ()
		{
			this.pow = this.exp.conv ( this.to ) ;
		}

		to = ( exp : number ) =>
		{
			const r = 1 * ( 2 ** ( exp / this.step ) ) ;
			return r.toFixed ( 8 ) ;
		}
	}
}

namespace VM
{
	export class App
	{
		public exp : forms.range ;

		constructor ( public readonly dm = new DM.App )
		{
			this.exp = { title : "Exp" , value : dm.exp , min : - 8 * dm.step , max : 14 * dm.step } ;
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
			ef.h2 ( "Exponential Integer" ) ,
			forms.range ( vm.exp ) ,
			ef.p ( vm.dm.exp ) ,
			ef.p ( vm.dm.pow ) ,
		) ;	
	}
}

export const main = () =>
{
	dom.add ( VC.App () , "body" ) ;
}
