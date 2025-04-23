import { leaf , ef , log } from "../../meh/index.js" ;

namespace DM
{
	export class Applet
	{
		list = new List () ;
	}

	export class List
	{
		datatext = leaf ( "data .." ) ;

		async load ()
		{
			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status != 200 ) return ;
	
			const data = await res.json();

			this.datatext.value = JSON.stringify ( data , null , "\t" )
		}
	}

	export class Record
	{
		;
	}
}

export const EQListApp = () =>
{
	const dm = new DM.Applet ;

	return ef.main
	(
		{ class : "AF0" } ,
		ef.h1 ( "地震リスト" ) ,
		List () ,
		ef.textarea
		(
			{
				style : { height : "20em" } ,
				props : { value : dm.list.datatext }
			} ,
		) ,
		ef.section
		(
			{  } ,
			ef.button ( { acts : { click : () => dm.list.load () } } , "Load" )
		)
	)
}

const List = () =>
{
	return ef.ul ()
}
