import { Eki } from "./Eki.js" ;

const log = console.log ;


export class root implements index
{
	public title = "駅データ.jp" ;
	public parts : parts ;

	constructor ( datapath : string )
	{
		const ents = Object.keys ( Eki.AreaName_PrefList )  .map < [ string , index ] >
		(
			title => [ title , new area ( title , datapath ) ]
		) ;

		this.parts = Object.fromEntries ( ents ) ;
	}
}

class area implements index
{
	public parts : parts ;

	constructor ( public title : string , private datapath : string )
	{
		const ents : [ string , index ] [] = [] ;

		for ( const name of Eki.AreaName_PrefList [ this.title ] )
		{
			ents.push ( [ name , new pref ( name , this.datapath ) ] ) ;
		}

		this.parts = Object.fromEntries ( ents ) ;
	}
}

class pref implements index
{
	constructor ( public title : string , private datapath : string )
	{
	}

	public async parts () : Promise < static_parts >
	{
		log ( "index pref parts" , this?.title ) ;

		const eki = await Eki.make ( this.datapath ) ;
		const lines = eki.pref_line.items
		(
			Eki.pref_cd [ this.title ]
		) ;

		const ents : [ string , index ] [] = [] ;
		for ( const rc of lines )
		{
			ents.push ( [ rc.line_name , new line ( rc ) ] ) ;
		}

		return Object.fromEntries ( ents ) ;
	}
}

class line implements index
{
	type = "eki.1" ;
	title : string ;
	cont : any ;

	constructor ( private line : Eki.Line )
	{
		this.title = line.line_name ;
		this.cont = line ;
	}

	parts = async () : Promise < static_parts > =>
	{
		const ents : [ string , index ] [] = [] ;

		for ( const rec of this.line.Stations )
		{
			ents.push ( [ rec.StationName , new station ( rec ) ] ) ;
		}

		return Object.fromEntries ( ents ) ;
	}
}

class station implements index
{
	type = "eki.1" ;
	title : string ;
	cont : any ;

	constructor ( rec : Eki.Station )
	{
		this.title = rec.StationName ;
		this.cont = rec ;
	}
}


export type index =
{
	title : string ;
	parts ? : parts ;
}

type parts = static_parts | dynamic_parts ;

type dynamic_parts = () => Promise < static_parts > ;
type static_parts = { [ name : string ] : index } ;
