import { leaf , defs , ef } from "../index.js" ;

type sw < k > =
{
	key : leaf < k > ;
	create : ( key : k ) => defs.element ;
	sub ? : Record < string , sw < any > > ;
}

const station : sw < Index | undefined > =
{
	key : leaf < Index | undefined > ( undefined ) ,
	create : key => ef.section ( key )
}

const sw_def : sw < string > =
{
	key : leaf ( "" ) ,
	create : key => ef.section ( key ) ,
	sub : { station }
}

class Switch {}

class Index {}
