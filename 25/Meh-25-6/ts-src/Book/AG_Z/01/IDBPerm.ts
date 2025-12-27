import { Live , Ease , Perm , ef , pl , DD , log } from "../../../Meh/Meh.js" ;


namespace DM
{
	export type app =
	{
		root : node ;
	}

	export type node =
	{
		type : string ;
		value : string ;
		parts : node [] ;
	}

	export type Node = Ease < node > ;
}


namespace qst
{
	const todo_def = { title : () => "" , completed : () => false } ;

	type tob < t extends string > = { type ? : t } ;

	type br < v extends tob < any > > =
	(
		{ [ p in keyof v ] : p extends "type" ? v [ p ] : () => v [ p ] }
	) ;

	type v_br < def extends br < any > > =
	{
		[ p in keyof def ] : p extends "type" ? def [ p ] :  ReturnType < def [ p ] > ;
	} ;

	( s : v_br < typeof todo_def > ) =>
	{
		s.completed = false ;
	}
}


namespace VM
{
	export class App
	{
		public readonly ps : Perm.Item < DM.app > ;

		constructor ()
		{
			const perm = new Perm ( "PS_2512A" ) ;

			this.ps = perm.item < DM.app > ( { name : "MAIN" } ) ;
		}
	}
}


export namespace VC
{
	export const App = (  ) : DD.Mel =>
	{
		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				{ class : "PX" } ,
				ef.h1 ( "IDBPerm" ) ,
			) ,
		) ;
	}

	/* */

	const css = /* css */ `
	
	* { box-sizing : border-box ;  margin : 0 ;  color : hsl( 0  0%  20% ) ; }

	:host { height : 100% ; }

	.PX { padding : 1ex ; }
	
	main
	{
		height : 100% ;
		background : hsl( 215  80%  90% ) ;
	}
	
	
	` ;
}
