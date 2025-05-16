import { model , leaf , Renn , dom , ef , pl } from "../../meh/index.js" ;

namespace VM
{
	export class Applet
	{}
}

namespace VC
{
	export const Applet = ( index : model.navi.Index ) : dom.MehElement =>
	{
		return ef.main
		(
			ef.h1 ( "Rectia" ) , 
		) ;
	}
}

export const Rectia = VC.Applet ;
