import { Renn , ef , defs , leaf } from "../../meh/index.js" ;

abstract class pl
{
	public static switch < K = any > ( def : sw_def < K > )
	{
		return new defs.Free ;
	}
}

class Switch < K > extends defs.Place
{
	public add ( keys : K [] )
	{}
}

type sw_def < K > =
{
	key : leaf.types.lol < K > ;
	create ? : ( key : K ) => defs.element | undefined ;
	pre_keys ? : K [] ;
	items ? : [ K , defs.element ] [] ;
};

const Skt1 = () =>
{
	const renn = new Renn ( [ 5 ] );

	const sw = new Switch < number >
	();

	sw.add ( [ 5, 7, 9, 13 ] ) ;

	return ef.section
	(
		pl.switch
		({
			key : 0 ,
			create : key => ef.p ( key ) ,
			items : [ [ 5 , ef.p ( "" ) ] ] ,
		}) ,

		sw ,
	);
};
