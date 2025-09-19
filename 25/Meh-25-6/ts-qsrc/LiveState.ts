
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
		ref.src = this ;
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
		src ? : Life < any > ;
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
const ls_trans = Symbol () ;
const ls_trans_r = Symbol () ;


/* Suppin Foundation */

export type Suppin < V > = Suppin.Ro < V > &
{
	[ ls_set ] ( newv : V , ch ? : object ) : void ;
	[ ls_trans ] < TR > ( tr : LS.trans < TR , V > ) : LS < TR > ;
}

export namespace Suppin
{
	export type Ro < V > = Life < LS.Ref > &
	{
		[ ls_get ] () : V ;
		[ ls_trans_r ] < TR > ( tr : LS.trans_r < TR , V > ) : LS.Ro < TR > ;
	}
}

/*  */

export type LS < V > = LS.Ro < V > & Suppin < V > &
{
	set $ ( val : V ) ;
	get $ () : V ;

	trans < TR > ( tr : LS.trans < TR , V > ) : LS < TR > ;
}

export namespace LS
{
	export type Ro < V > = Suppin.Ro < V > &
	{
		get $ () : V ;

		add_ref ( ref : Ref ) : void ;
		remove_ref ( ref : Ref ) : void ;

		trans_r < TR > ( tr : LS.trans_r < TR , V > ) : Ro < TR > ;
	}

	export type Ref = Life.Ref &
	{
		vChan ( changer ? : object ) : void ; 
	}
}


export namespace LS
{
	export abstract class Core < V >  extends Life < Ref >  implements LS < V >
	{
		/* LS */

		public add_ref ( ref : Ref ) : void { this [ life_add_ref ] ( ref ) ; }
		public remove_ref ( ref : Ref ) : void { this [ life_remove_ref ] ( ref ) ; }

		public set $ ( newv : V ) { this [ ls_set ] ( newv ) ; }
		public get $ () : V  { return this [ ls_get ] () ; }

		public set ( newv : V , ch : object ) { this [ ls_set ] ( newv , ch ) ; }
		public get () : V  { return this [ ls_get ] () ; }

		public trans < TR > ( tr : trans < TR , V > ) : LS < TR > { return this [ ls_trans ] ( tr ) ; }
		public trans_r < TR > ( tr : trans_r < TR , V > ) : Ro < TR > { return this [ ls_trans_r ] ( tr ) ; }


		/* Suppin */

		public override [ life_add_ref ] ( ref : Ref ) : void
		{
			super [ life_add_ref ] ( ref ) ;
			ref.vChan () ;
		}

		public abstract [ ls_set ] ( newv : V , ch ? : object ) : void ;
		public abstract [ ls_get ] () : V ;

		public [ ls_trans ] < TR > ( tr : trans < TR , V > ) : LS < TR >
		{
			return new Trans < TR , V > ( this , tr ) ;
		}

		public [ ls_trans_r ] < TR > ( tr : trans_r < TR , V > ) : LS.Ro < TR >
		{
			return new Trans < TR , V > ( this , tr ) ;
		}

		protected [ ls_notify ] ( ch : object | uned ) : void
		{
			this [ refs ] .forEach ( ref => ref.vChan ( ch ) ) ;
			this [ agg ] && ch != this [ agg ] && this [ agg ] [ agg_echan ] () ;
		}
	}

	export const set = < T > ( ls : Suppin < T > , newv : T , ch ? : object ) : void => ls [ ls_set ] ( newv , ch ) ;
	export const get = < T > ( ls : Suppin.Ro < T > ) : T => ls [ ls_get ] () ;
	export const mute = < T > ( ls : Suppin < T > , m : ( v : T ) => T , ch ? : object ) => { set ( ls , m ( get ( ls ) ) , ch ) }
	export const trans = < R , T  > ( ls : Suppin < T > , tr : trans < R , T > ) =>    ls [ ls_trans ] ( tr ) ;

	export const add_ref = < T > ( ls : LS.Ro < T > , ref : Ref ) => Life.add_ref ( ls , ref ) ;
	export const remove_ref = < T > ( ls : LS.Ro < T > , ref : Ref ) => Life.remove_ref ( ls , ref ) ;

	/* ....  ....  ....  ....  ....  ....  ....  ....  ....  .... */



	/* Leaf */

	export class Leaf < T >  extends Core < T >
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

	export class Trans < T , S >  extends Core < T >
	{
		constructor ( src : Core < S > , tr : trans_x < T , S > , agg ? : Agg )
		{
			super ( agg ) ;
			this.#_trans = typeof tr == "function" ? { get : tr } : tr ;
			this.#_src = src ;
			src [ life_add_ref ] ( this.#_ref ) ;
		}

		public override [ ls_set ] ( newv : T , ch ? : object ) : void
		{
			if ( ! this.#_trans.set )  return ;

			this.#_src [ ls_set ]
			(
				this.#_trans.set ( newv ) ,
				ch
			) ;
		}

		public override [ ls_get ] () : T
		{
			return this.#_trans.get ( this.#_src [ ls_get ] () ) ;
		}


		#_src : Core < S > ;
		#_ref : Ref = { vChan : ( ch ) => this [ ls_notify ] ( ch ) }
		#_trans : trans < T , S > ;
	}

	export type trans < T , S > =
	{
		get : ( val : S ) => T ;
		set ? : ( val : T ) => S ;
	}

	export type trans_r < T , S > = ( val : S ) => T ;
	export type trans_x < T , S > = trans < T , S > | trans_r < T , S > ;
}
