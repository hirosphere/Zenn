import { leaf , Renn , dom , forms , ef , log } from "../meh/index.js" ;
import * as IDB from "./web-db-idb.js" ;
import * as wdt from "../widjet/widjet.js" ;

namespace PS
{
	export class DB extends IDB.DB
	{
		memo_pad ;

		constructor ()
		{
			super () ;
			this.memo_pad = new MemoPad ( this );
			
			this.init ( { name : "Memo-Pad-24" , version : 1 } ) ;
		}
	}

	export class MemoPad extends IDB.Store < memo_pad , idr , string >
	{
		constructor ( db : IDB.DB )
		{
			super ( db ,  "memo_pad" , { keyPath : "id" , autoIncrement : false } ) ;
		}
	}

	type memo_pad = { title : string , text : string } ;
	type idr = { id : string } ;
}

namespace VM
{
	export class App
	{
		db = new PS.DB ;

		pad_1 ;

		constructor ()
		{
			this.pad_1 = new Record ( this.db.memo_pad , "alpha" ) ;
			this.db.on_open_db = () => this.on_open_db () ;
		}

		on_open_db ()
		{
			this.pad_1.load () ;
			log ( "on_open_db" )
		}
	}

	export class Record
	{
		title = leaf ( "" , this ) ;
		text = leaf ( "" , this ) ;

		constructor ( protected store : PS.MemoPad , public id : string )
		{
			this.title.value += " ###"
		}

		async load ()
		{
			try
			{
				const pv = await this.store.get ( this.id ) ?? this.defv () ;
				this.title.value = pv.title ;
				this.text.value = pv.text ;
			}
			catch ( err )
			{
				log ( err )
			}
		}

		save ()
		{
			this.store.set ( this.perm_v ) ;
		}

		get perm_v ()
		{
			return { id : this.id , title : this.title.value , text : this.text.value }
		}

		defv ()
		{
			return { id : this.id , title : "新規 Memo" , text : "kazenoko" }
		}

		update ()
		{
		}
	}
}

namespace VC
{
	export const App = (  ) =>
	{
		const vm = new VM.App ;

		return ef.main
		(
			ef.h1 ( "Indexed DB - 1" ) ,
			//Record ( d.record ) ,
			MemoPad ( vm.pad_1 ) ,
			wdt.ClockA () ,
		)
	}

	const MemoPad = ( vm : VM.Record ) =>
	{
		return ef.section
		(
			{ class : "memo-pad" } ,

			ef.section ( { class : "fl-bar" , style : { gap : "1ex" } } ,
				ef.h2 ( vm.id ) ,
				ef.button ( { action: { click () { vm.save () ; } } } , "保存" ) ,
			) ,
			
			ef.input
			(
				{ class : "-title" , binds : { value_input : vm.title } }
			) ,
			ef.textarea
			(
				{ class : "-text" , binds : { value_input : vm.text } }
			)
		) ;
	}

	const Pane = (  ) =>
	{
		return ef.section
		(
			ef.button ( { action : { click () {   ; } } } , "New" ) ,
		)
	}
}

export const main = async () =>
{
	dom.add ( VC.App () , "body" ) ;
}
