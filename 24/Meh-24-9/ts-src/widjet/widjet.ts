import { df , leaf , ef , forms , log } from "../meh/index.js" ;

/* VM */

class Model
{
	clock_ymd = leaf ( "" ) ;
	clock_hms = leaf ( "" ) ;
	theme = leaf < keyof typeof theme > ( "sky" ) ;

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

		const l : leaf.r.num = leaf ( 0 ) ;
	}

	on_interval ()
	{
		const d = new Date ().getTime () % 1000 ;
		this.clock_ymd.value = df ( "Y年 MM月 DD日 (B)" ) ;
		this.clock_hms.value = df ( "hh:mm:ss" ) ;
	}
}

const theme =
{
	red   : [   0 , 0.5 , 0.5 ] ,
	green : [  90 , 0.5 , 0.5 ] ,
	aqua  : [ 180 , 0.5 , 0.5 ] ,
	sky   : [ 210 , 0.5 , 0.5 ] ,
}


/* VC */

export const ClockA = () =>
{
	const vm = new Model () ;

	return ef.section
	(
		{ class : "clock-widjet" } ,

		ef.section
		(
			{ class : "clock-display" } ,
			ef.span ( vm.clock_ymd ) ,
			ef.span ( vm.clock_hms )
		) ,
		ef.section
		(
			{ class : "fl-bar" } ,
			ef.a ( { attrs : { href : "./zz-index.html" } } , "index" ) ,
		) ,
		ThemeSelector () ,
	);
}

const ThemeSelector = () =>
{
	return ef.section
	(
		{ class : "fl-row" } ,
		... Object.entries( theme ).map ( ( [ key , value ] ) => ef.span ( key , " " , value.toString () ) )
	)
}
