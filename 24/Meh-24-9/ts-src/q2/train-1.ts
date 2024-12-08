import { leaf , Renn , dom , forms , ef , log } from "../meh/index.js" ;

namespace DM
{
	export class App
	{
		tr = new 列車制御 ( "列車 1" ) ;

		trains = Array ( 4 ) .fill ( () => 0 ) .map ( ( i , n ) => new 列車制御 ( "列車 " + ( n + 1 ) ) )
	}

	export class 列車制御
	{
		voltage = leaf ( 0 ) ;

		constructor
		(
			public title : string ,
		)
		{}
	}
}

namespace VM
{
	export class App
	{
		d = new DM.App () ;
		trains = this.d.trains.map ( d => new 列車制御 ( d ) )
	}

	export class 列車制御
	{
		voltage : forms.range ;

		constructor
		(
			public readonly d : DM.列車制御
		)
		{
			this.voltage = { title : "電圧" , value : d.voltage , max : 12 , step : 0.025 , to_lv : lv_v , unit : "V" } ;
		}
	}

	const lv_v = ( v : number ) => v.toFixed ( 2 )
}

namespace VC
{
	export const App = ( m : VM.App ) =>
	{
		return ef.main
		(
			ef.h1 ( "Train-1" ) ,
			... m.trains.map ( m => 列車制御 ( m ) ) ,
		) ;
	}

	const 列車制御 = ( m : VM.列車制御 ) =>
	{
		return ef.section
		(
			ef.h2 ( m.d.title ) ,
			ef.section
			(
				forms.range ( m.voltage ) ,
			)
		) ;
	}
}

export const main = () =>
{
	log ( "Train-1" ) ;

	dom.add ( VC.App ( new VM.App () ) , "body" ) ;
}
