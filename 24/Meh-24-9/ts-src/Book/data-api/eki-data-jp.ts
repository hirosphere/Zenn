import { leaf , log } from "../../meh/index.js" ;

export const EkiDataJP = ( root_path : string ) =>
{
	const path = root_path + "Res/Eki/2025-05/" ;

	const files =
	{
		line : path + "company20250523.csv" ,
	}

	load ( files.line ) .then ( res => log ( res ) ) ;

	return null ||
	{
		async load ()
		{
			await fetch ( files.line ) ;
		}
	}
}

const load = async ( path : string ) =>
{
	log ( "load" , path ) ;

	const res = await fetch ( path ) ;
	if ( ! res.ok )  return "" ;

	return await res.text () ;
}

export type Line =
{}

export type Station =
{}
