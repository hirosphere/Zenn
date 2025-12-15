import { Live , Ease , Renn , Key , Store , DD, ef , pl } from "../../../Meh/Meh.js" ;
import { Range } from "./../UI.Range.js" ;
import * as VM from "./VM.js" ;


/* */

export const PlayerA = ( vm : VM.Player , cns : pla_cns ) : DD.Mel =>
{
	return ef.section
	(
		{ class : cns.main } ,
		ef.section
		(
			{ class : cns.ctrl } ,
			ef.button ( { passive : { click : () => vm.stop () } } , "リセット" ) ,
			StateButton ( vm.ss.run  , "Run" , [ "停止中" , "演奏中" ] ) ,
			ef.span ( { class : "PROG" } , vm.prog_q ) ,
		) ,
		Range ( { title : "Tempo" , value : vm.ss.tempo , min : 0 , max : 360 } ) ,
	) ;
}

type pla_cns =
{
	main ? : string ;
	ctrl ? : string ;
}

const StateButton = ( s : Live.bool , label : string , sl : [ string , string ] ) : DD.Mel => ef.label
(
	{  } ,
	ef.button
	(
		{ passive : { click : () => { s.$ = ! s.$ } } } ,
		s.trans_r ( s => sl [ s ? 1 : 0 ] ) ,
	) ,
) ;
