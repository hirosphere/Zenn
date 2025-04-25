import { leaf , Renn } from "../../meh/index.js" ;

export class List
{
	datatext = leaf ( "" ) ;
	items =  new Items ;

	async update ()
	{
		const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
		if( res.status != 200 ) return ;

		const data = await res.json() as srcitem [] ;

		this.items.replace ( data )

		this.update_monitor ( data ) ;
	}

	protected update_monitor ( data : item [] )
	{
		this.datatext.value =
		(
			cols.join ( "\t" ) + "\n" +
			data.map ( ( i , n ) =>
			(
				n + " " +
				cols.map ( name => i [ name ] ).join ( "\t" ) )
			) .join ( "\n" )
		) ;

		// this.datatext.value = JSON.stringify ( data , null , "\t" ) ;
	}
}

const cols : ( keyof item ) [] = [ "eid" , "anm" , "mag" , "rdt" ] ;

export class Items extends Renn < item > {}

export type srcitem =
{
	ctt : string ,
	eid : string ,
	rdt : string ,
	ttl : string ,
	ift : string ,
	ser : string ,
	at : string ,
	anm : string ,
	acd : string ,
	cod : string ,
	mag : string ,
	maxi : string ,
	json : string ,
	en_ttl : string ,
	en_anm : string ,
}

export type item = srcitem &
{}
