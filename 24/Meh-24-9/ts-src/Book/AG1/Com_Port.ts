import { leaf , Renn , ef , pl , MehElement , log } from "../../meh/index.js" ;

namespace COM_Port
{
	export const List = async () => { return await post( { Command: "List" }, null ); }
	export const Get_State = async ( path : string ) => { return await post( { Command: "Get-State", Path: path }, null ); }
	export const Set_Enable = async ( path : string, value :any ) => { return await post( { Command: "Set-Enable", Path: path, Value: value }, null ); }
	export const Write = async ( path : string, value : any ) => { return await post( { Path: path, Command: "Write", Value: value } ) };
	export const Get_Lines = async ( path : string ) => { return await post( { Path: path, Command: "Get-Lines" } ) };

	const post = async( args : any, failv ? : any ) =>
	{
		try
		{
			const res = await fetch( "/API/Serial-Port", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify( args ) } );
			return res.ok ? res.json() : failv;
		}
		catch( err )
		{
			return failv;
		}
	}
};

export namespace VC
{
	export const Applet = () : MehElement =>
	{
		const mon = leaf ( "Monitor" ) ;

		load ( mon ) ;

		return ef.main
		(
			{ class : "BS FV AC" } ,

			ef.h1 ( "Com Port" ) ,

			ef.section
			(
				{
					class : "BH PXX OA" ,
					style :
					{
						width : "800px" ,
						whiteSpace : "pre" ,
						fontFamily : "Fira Code" ,
					}
				} ,
				mon ,
			)
		)
	}
}

const load = async ( mon : leaf.str ) =>
{
	mon.$ = JSON.stringify ( await COM_Port.List () , null , "\t" ) ;
}
