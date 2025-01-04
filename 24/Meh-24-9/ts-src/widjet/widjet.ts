import { df , leaf , ef , log } from "../meh/index.js" ;

class Model
{
	clock = leaf ( "" ) ;

	constructor ()
	{
		setTimeout
		(
			() =>
			{
				this.on_interval () ;
				setInterval ( () => this.on_interval () , 1000 )
			} ,
			1000 - ( new Date ().getTime () % 1000 )
		) ;
		this.on_interval () ;
	}

	on_interval ()
	{
		const d = new Date ().getTime () % 1000 ;
		this.clock.value = df ( "Y年 MM月 DD日 B曜日 hh:mm:ss" ) ;
	}
}


export const ClockA = () =>
{
	const vm = new Model () ;

	return ef.section
	(
		{ class : "clock-widjet" } ,

		ef.section ( { class : "clock-display" } , vm.clock ) ,
		ef.section
		(
			{ class : "fl-bar" } ,
			ef.a ( { attrs : { href : "./zz-index.html" } } , "index" ) ,
		)
	);
}
