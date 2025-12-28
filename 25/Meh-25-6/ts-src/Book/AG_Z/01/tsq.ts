
class Liv < v > { constructor ( public value : v ) {} }

namespace ease
{
	export type obecho < v extends object > =
	{
		[ p in keyof v ] : p extends "type" ? v[p] : Liv < v[p] > ; 
	}


	export function branch ( def : branch_def )
	{
		return function ()
		{
			return {} ;
		}
	}

	export type branch_def < v extends object = object > =
	{
		[ p in keyof v ] : p extends "type" ? v[p] : ctor < v[p] > ;
	} ;


	export type ctor < v > = ( i ? : dp < v > ) => v ;

	export type dp < v > = Partial < v > ;
}


const todo_e = ease.branch ( { type : "todo" , title : () => "" } ) ;



class todo
{
	type : "todo" = "todo" ;
	title : string ;
	completed : boolean ;

	constructor ( i ? : todo )
	{
		this.title = i?.title ?? "" ;
		this.completed = i ?.completed ?? false ;
	}
}

class hsl
{
	type : "hsl" = "hsl" ;
	hue : number ;
	sat : number ;
	light : number ;

	constructor ( i ? : hsl )
	{
		this.hue = i?.hue ?? 90 ;
		this.sat = i?.sat ?? 0.65 ;
		this.light = i?.light ?? 0.65 ;
	}
}

( s : ease.obecho < todo > | ease.obecho < hsl > ) =>
{
	switch ( s.type )
	{
		case "hsl" : s.hue.value += 10 ;  break ;
		case "todo" : s.title.value += " .." ;  break ;
	}
}
