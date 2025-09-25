const log = console.log ;

/* Live State */

export interface Live < V >
{
	$ : V ;
	trans < TR > ( tr : Live.trans < TR , V > ) : Live < TR > ;
	trans_r < TR > ( tr : Live.trans_r < TR , V > ) : Live.R < TR > ;
} ;

export namespace Live
{
	export type R < V > = Omit < Live < V > , "trans" > &
	{
		readonly $ : V ;
	}

	export interface Ref
	{
		v_chan ( changer : object | undefined ) : void ;
	} ;

	export type trans < R , S > =
	{
		get : ( val : S ) => R ;
		set : ( val : R ) => S ;
	}

	export type trans_r < R , S > = ( val : S ) => R ;
}




/* Ease */

export type Ease < V > =
(
	V extends object ?
	Branch < V > :
	V extends boolean ?
	Live < boolean > :
	Live < V > & { f : boolean }
) ;

type Branch < V extends object > = Live < V > &
{
	readonly [ prop in keyof V ] : Ease < V [ prop ] > ;
} ;




type todo =
{
	title : string ;
	completed : boolean ;
	重要度 : 重要度 ;
}

type 重要度 = "高" | "中" | "低" ;

(
	et : Ease < todo > ,
	e2 : Ease < 重要度 > ,
	e3 : Ease < string > ,
	eb : Ease < boolean > ,
	l1 : Live < string > ,
	lb : Live < boolean > ,
	r1 : Live.R < string > ,
	rb : Live.R < boolean > ,
) =>
{
	et.title.$ = "発泡よし！" ;

	lb = et.completed ;
	et.completed.$ = true ;
	et.completed.$ = false ;
}
