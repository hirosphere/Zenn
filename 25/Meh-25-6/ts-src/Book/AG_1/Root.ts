import { Live , Renn , DD , ef , pl , IDB , } from "../../Meh/Meh.js" ;

const log = console.log ;

export namespace DM
{
	export type memo =
	{
		name : string ;
		text : string ;
	} ;

	export type todo =
	{
		id : number ;
		task : string ;
		completed : boolean ;
	}

	export const db = new class extends IDB
	{
		public memo ;
		public todo ;

		constructor ()
		{
			super ( { name : "IDBQ_25_1001" , version : 1001 } ) ;

			this.memo = new IDB.Store < memo , "name" , string > ( this , "memo" , { keyPath : "name" } ) ;
			this.todo = new IDB.Store < todo , "id" , number > ( this , "todo" , { keyPath : "id" , autoIncrement : true } ) ;
		}

		override on_open_db () : void
		{
			log ( this.core ) ;
		}
	}

	db.init () ;

	async () =>
	{
		( await db.todo.get ( 500 ) ).completed  ;
	}

}


export namespace VC
{
	const css /* css */ =
	`
	* { box-sizing : bourder-box ; margin : 0 ; padding : 0 ; }
	
	main
	{
		padding : 1em ;
	}


	`;

	export const App = () : DD.Node =>
	{
		DM.db.memo.get ( "" ) ;
		DM.db.todo.get ( 22 ) ;

		return ef.div
		(
			{ shadow : css } ,
			ef.main
			(
				ef.h1 ( "Root" ) ,
			)
		) ;
	}
}
