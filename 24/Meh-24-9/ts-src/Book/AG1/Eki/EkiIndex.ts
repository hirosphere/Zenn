import { navi , ef , dom } from "../../../meh/index.js" ;
import { EkiDataJP } from "../../data-api/eki-data-jp.js" ;
import { global } from "../../App/Main.js" ;

export const EkiIndex : navi.types.index =
{
	name : "Eki" ,
	parts : [
		{ name : "Q1" , page : index => VC.Main () } ,
	] ,
}

namespace VM
{
	export class Main
	{
		constructor ()
		{
			const ekidata = EkiDataJP ( global.res_root ) ;
		}
	}
}

namespace VC
{
	export const Main = () : dom.MehElement =>
	{
		const vm = new VM.Main ;

		return ef.main
		(
			ef.h1 ( "EkiData Main" ) ,
		) ;
	}
}
