import { leaf , ef , pl , MehElement , log } from "../../meh/index.js" ;


interface Navigator
{
	serial : SerialPort ;
}

interface SerialPort
{
	requestPort () : void ;
}

declare var navigator : Navigator ;

namespace VM
{
	export class Applet
	{
		port = new Port

		constructor ()
		{
		}

		quest() : void
		{
			this.port.open () ;
		}
	}


	class Port
	{
		state = leaf < sp_state > ( "CLOSED" ) ;

		open ()
		{
			navigator.serial.requestPort () ;
		}

		close ()
		{}
	}

	type sp_state = "CLOSED" | "OPEN"
}


export namespace VC
{
	export const Applet = ( vm : VM.Applet = new VM.Applet ) : MehElement =>
	{
		return ef.main
		(
			{ class : "BH FV AC PXX" } ,

			ef.h1 ( "Serial" ) ,
			ef.p ( "Web Serial API でNゲージ列車制御を。" ) ,
			ef.section
			(
				{ class : "FH PPX AC" } ,
				ef.button ( { action : { click () { vm.quest () ; } } } , "Port" ) ,
				ef.span ( { class : "STATE BH PXX" } , vm.port.state ) ,
			) ,
		) ;
	}
}
