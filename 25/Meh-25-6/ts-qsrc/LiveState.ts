
const log = console.log ;

export const uned = undefined ;
export type uned = undefined ;

/* */

export const ru = Symbol () ;
export const life_term = Symbol () ;
export const life_add_ref = Symbol () ;
export const agg_echan = Symbol () ;

const life_remove_ref = Symbol () ;
export const refs = Symbol () ;
export const agg = Symbol () ;

let next_ru = 1 ;
let life_count = 0 ;

export class Life < R extends Life.Ref >
{
	constructor ( a ? : Agg )
	{
		life_count ++ ;
		this [ agg ] = a ;
	}

	public [ life_add_ref ] ( ref : R )
	{
		this [ refs ] .add ( ref ) ;
	}

	public [ life_remove_ref ] ( ref : R )
	{
		this [ refs ] .delete ( ref ) ;
	}

	public [ life_term ] ()
	{
		this [ refs ] .forEach ( ref => ref.lTerm ?.() ) ;
		this [ refs ] .clear () ;
		life_count -- ;

		log ( "term" , this [ ru ] , life_count )
	}

	protected [ ru ] = next_ru ++ ;
	protected [ agg ] ? : Agg ;
	protected [ refs ] = new Set < R > ;
}

export namespace Life
{
	/* methods */

	export const add_ref = < R extends Ref > ( life : Life < R > , ref : R ) => life [ life_add_ref ] ( ref ) ;
	export const remove_ref = < R extends Ref > ( life : Life < R > , ref : R ) => life [ life_remove_ref ] ( ref ) ;
	export const terminate = < R extends Ref > ( life : Life < R > ) => life [ life_term ] () ;

	/* Ref */

	export type Ref =
	{
		lTerm ? () : void ;
	}
}

export type Agg =
{
	[ agg_echan ] () : void ;
}


/* */

const ls_set = Symbol () ;
const ls_get = Symbol () ;
const ls_notify = Symbol () ;


export type LS < T > = Life < LS.Ref > &
{
	[ ls_set ] ( newv : T , ch ? : object ) : void ;
	[ ls_get ] () : T ;
}

export namespace LS
{
	export type Ref = Life.Ref &
	{
		vChan ( changer ? : object ) : void ; 
	}

	export type R < T > = Life < Ref > &
	{
		[ ls_get ] () : T ;
	} ;
}


export namespace LS
{

	export abstract class Impl < T >  extends Life < Ref >  implements LS < T >
	{

		public abstract [ ls_set ] ( newv : T , ch ? : object ) : void ;
		public abstract [ ls_get ] () : T ;

		protected [ ls_notify ] ( ch : object | uned ) : void
		{
			this [ refs ] .forEach ( ref => ref.vChan ( ch ) ) ;
			this [ agg ] && ch != this [ agg ] && this [ agg ] [ agg_echan ] () ;
		}
	}

	export const set = < T > ( ls : LS < T > , newv : T , ch ? : object ) : void => ls [ ls_set ] ( newv , ch ) ;
	export const get = < T > ( ls : LS.R < T > ) : T => ls [ ls_get ] () ;
	export const mod = < T > ( ls : LS < T > , m : ( v : T ) => T , ch ? : object ) => { set ( ls , m ( get ( ls ) ) , ch ) }

	export const add_ref = < T > ( ls : LS.R < T > , ref : Ref ) =>
	{
		Life.add_ref ( ls , ref ) ;
		ref.vChan () ;
	}


	/* ....  ....  ....  ....  ....  ....  ....  ....  ....  .... */



	/* Leaf */

	export class Leaf < T >  extends Impl < T >
	{
		constructor ( newv : T , agg ? : Agg )
		{
			super ( agg ) ;
			this.#_value = newv ;
		}

		public override [ ls_set ] ( newv : T , ch ? : object ) : void
		{
			if ( newv === this.#_value )  return ;
			this.#_value = newv ;
			this [ ls_notify ] ( ch ) ;
		}

		public override [ ls_get ] () : T
		{
			return this.#_value ;
		}

		#_value : T ;
	}

	export class Trans < T , S >  extends Impl < T >
	{
		constructor ( src : Impl < S > , tr : trans < T , S > , agg ? : Agg )
		{
			super ( agg ) ;
			this.#_trans = tr ;
			this.#_src = src ;
			LS.add_ref ( src , this.#_ref ) ;
		}

		public override [ ls_set ] ( newv : T , ch ? : object ) : void
		{
			if ( ! this.#_trans.set )  return ;

			LS.set 
			(
				this.#_src ,
				this.#_trans.set ( newv ) ,
				ch
			)
		}

		public override [ ls_get ] () : T
		{
			return this.#_trans.get
			(
				LS.get ( this.#_src )
			) ;
		}


		#_src : Impl < S > ;
		#_ref : Ref = { vChan : ( ch ) => this [ ls_notify ] ( ch ) }
		#_trans : trans < T , S > ;
	}

	export type trans < T , S > =
	{
		get : ( srcv : S ) => T ;
		set ? : ( v : T ) => S ;
	}
}




/* .... .... Ease .... .... */

export function Ease < T > ( v : T , agg ? : Agg ) : Ease < T >
{
	const rt =
	(
		v instanceof Object ?
		(
			v instanceof Array ?
				createRow  ( v , agg )
				: createBranch ( v , agg )
		)
		: new LS.Leaf ( v , agg )
	) ;

	return rt as any ;
}

export type Ease < T > =
(
	T extends object ?
	(
		T extends Array < infer E > ?
			Ease.Row < E >
			: Ease.Branch < T >
	)
	: LS < T >
) ;


export namespace Ease
{
	/* .... Type .... */

	export type Branch < T extends object > = LS < T > & Agg & Props < T > ;

	type Props < T extends object > =
	{
		[ prop in keyof T ] : Ease < T [ prop ] > ;
	}
	
	export type Row < E > = LS < E [] > & Agg &
	{
		at ( pos : number ) : Ease < E > | undefined ;
	}
}

/* Branch */

function createBranch < T extends object > ( newv : T , agg ? : Agg ) : Ease.Branch < T >
{
	return new BranchImpl ( newv , agg ) as any ;
}

class BranchImpl < T extends object >  extends LS.Impl < T >  implements Agg
{
	constructor ( newv : T , agg ? : Agg )
	{
		super ( agg ) ;
	}

	public override [ ls_set ] ( newv : T , ch ? : object ) : void
	{}

	public override [ ls_get ] () : T
	{
		return {} as any ;
	}

	public [ agg_echan ] ()
	{
		;
	}
}


/* Row */

function createRow < E > ( newv : E [] , agg ? : Agg ) : Ease.Row < E >
{
	return new RowImpl ( newv , agg ) ;
}

class RowImpl < E >  extends LS.Impl < E [] > implements Ease.Row < E >
{
	constructor ( newv : E [] , agg ? : Agg )
	{
		super ( agg ) ;
	}

	public override [ ls_set ] ( v : E [] , ch ? : object ) : void
	{
		v ;
	}

	public override [ ls_get ] () : E []
	{
		return [] ;
	}

	public at ( pos : number ) : Ease < E > | undefined
	{
		return undefined ;
	}

	public [ agg_echan ] () : void
	{}
}


