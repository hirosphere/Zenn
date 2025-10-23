import { VM } from "./BookBase.js" ;

const EG = ( title : string ) =>
(
	{
		title ,
		parts :
		{
			Attack : { title : "Attack" } ,
			Decay : { title : "Decay" } ,
			Sustain : { title : "Sustain" } ,
			Release : { title : "Release" } ,	
		}
	}
) ;

export const Synth : VM.index =
{
	title : "Synth" ,
	parts :
	{
		"EG 1" : EG ( "EG 1" ) ,
		"EG 2" : EG ( "EG 2" ) ,
		"EG 3" : EG ( "EG 3" ) ,
	}
}
