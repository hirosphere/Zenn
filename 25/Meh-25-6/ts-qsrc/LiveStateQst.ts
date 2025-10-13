
const log = console.log ;


namespace DM
{
	export type xy = { x : number , y : number } ;
	export function xy ( i : Partial < xy > = {} ) : xy
	{
		return { x : 0 , y : 0 , ... i } ;
	}

	export type shape = { pos : xy , size : xy } ;
	export function shape ( i : Partial < shape > = {} ) : shape
	{
		return { pos : xy ( i.pos ) , size : xy ( i.size ) } ;
	}

	export type doc =
	{
		title : string ;
		shapes : shape [] ;
	}
	export function doc ( i : Partial < doc > = {} ) : doc
	{
		const rt =
		{
			title : i.title ?? "Shape Document" ,
			shapes : i.shapes ?.map
			(
				i => shape ( i )

			) ?? []
		} ;
		
		return rt ;
	}

	type Ease < V > = { $ : V } ;

	function Ease < V > ( v : Partial < V > , c : ( v : Partial < V > ) => V ) : Ease < V >
	{
		return { $ : c ( v ) } ;
	}

	const e : Ease < doc > = Ease ( { title : "My Shapes" , shapes : [ shape () , shape ( { size : { x : 20 , y : 20 } } ) ] } , doc ) ;
}
