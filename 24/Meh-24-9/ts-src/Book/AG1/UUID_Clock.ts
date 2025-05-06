import { leaf , ef , log } from "../../meh/index.js" ;


namespace VC
{
	export const Applet = () =>
	{
		const sec = leaf ( "" ) ;

		const update = () =>
		{
			sec.value = crypto.randomUUID () ;
		}

		update () ;
		setInterval ( update , 1000 )

		return ef.main
		(
			{ class : "FV PXX AC" } ,

			ef.h1 ( "UUID_CLOCK" ) ,

			ef.p
			(
				sec
			) ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
