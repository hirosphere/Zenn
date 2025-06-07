import { leaf , Renn , navi , ef , pl , dom , log } from "../../meh/index.js" ;
import { Curr_Focus } from "./Curr_Focus.js" ;
import * as Counter from "./Count.js" ;
import * as Serial from "./Serial.js" ;

export const index_def : navi.types.index =
{
	name : "AG2" ,
	parts :
	[
		{ name : "CurrFocus" , page : () => Curr_Focus () } ,
		{ name : "Count" , page : () => Counter.VC.Applet () } ,
		{ name : "Serial" , page : () => Serial.VC.Applet () } ,
	]
}

