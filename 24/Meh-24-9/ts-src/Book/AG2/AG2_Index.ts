import { leaf , Renn , navi , ef , pl , dom , log } from "../../meh/index.js" ;
import { Curr_Focus } from "./Curr_Focus.js" ;

export const index_def : navi.types.index =
{
	name : "AG2" ,
	parts :
	[
		{ name : "CurrFocus" , page : () => Curr_Focus () }
	]
}

