import { State , } from "../../Meh/Meh.js" ;

export namespace types
{
	export type project =
	{
		code : string ;
		name : string ;
		product : product ;
		progress : progress [] ;
	}

	export type progress =
	{
		process : process ;
	}

	export type process =
	{
		code : string ;
		name : string ;
	}

	export type product =
	{
		code : string ;
		name : string ;
	}

}

