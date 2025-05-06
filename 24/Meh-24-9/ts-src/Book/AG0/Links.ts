import { ef , log } from "../../meh/index.js" ;

namespace DM
{
	export class Applet
	{
		constructor ()
		{
			this.fetch () ;
		}

		async fetch ()
		{
			const r = await v_fetch < block [] , string > ( "./data/リンク.json" , "" ) ;
			if ( typeof r == "string" )
			{
				return ;
			}

			log ( JSON.stringify ( r ) ) ;
		}		
	}


	type block = { title : string ;  items : item [] } ;
	type item = { title : string ;  url : string } ;
}

const v_fetch = async < RES = any , ERR = any > ( url : string , err : ERR ) : Promise < RES | ERR > =>
{
	const r = await fetch ( url ) ;
	if ( r.status != 200 )  return err ;

	return await r.json () as RES ;
}

namespace VC
{
	export const Links = () =>
	{
		const dm = new DM.Applet () ;

		return ef.main
		(
			{  } ,

			ef.h1 ( "リンク" ) ,
		)
	}

	const Block = () =>
	{
		return ef.section
		(
			ef.h2 (  ) ,

		)
	}
}

export const Links = VC.Links ;
