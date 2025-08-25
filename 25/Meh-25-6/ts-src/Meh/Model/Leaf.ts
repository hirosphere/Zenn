export const Refs = Symbol () ;

export const Leaf_Set_Value = Symbol () ;
export const Leaf_Get_Value = Symbol () ;
export const Leaf_Notify_Change = Symbol () ;

export const Coll_Update = Symbol () ;

const log = console.log ;



/* Life */

export class Life < R extends Life.Ref >
{
	public [ Refs ] = new Set < R > ;
}

export namespace Life
{
	export interface Ref
	{
		source ? : Life < any > ;
		lTerm ? () : void ;
	}

	/* */

	export const addRef = ( life : Life < any > , ref : Ref ) =>
	{
		life [ Refs ] .add ( ref ) ;
	}

	export const removeRef = ( life : Life < any > , ref : Ref ) =>
	{
		life [ Refs ] .delete ( ref ) ;
	}

	export const terminate = ( life : Life < any > ) =>
	{
		life [ Refs ] .forEach ( ref => ref.lTerm ?.() ) ;
		life [ Refs ] .clear () ;
	}
}



/* Leaf */

/* .. 型定義・生成 */

export interface Leaf < V , R extends Leaf.Ref = Leaf.Ref > extends Life < R >
{
	get $ () : V ;
	set $ ( newValue : V ) ;

	[ Leaf_Get_Value ] () : V ;
	[ Leaf_Set_Value ] ( newValue : V , coll ? : Coll ) : void ;

	[ Leaf_Notify_Change ] ( coll : Coll | undefined ) : void ;
}

export function Leaf < V > ( newValue : V ) : Leaf < V >
{
	return new Leaf.Core.Entity ( newValue ) ;
}

export namespace Leaf
{
	export interface Ref extends Life.Ref
	{
		vChan ? () : void ;
	}

	export interface trans < V , S >
	{
		get ( value : S ) : V ;
		set ? ( value : V ) : S ;
	}

	/* LL */

	export type LL < V > = Leaf < V > | V ;

	/* RO */

	export type RO < V > = Omit < Leaf < V > , "$" > &
	{
		get $ () : V ;
	}

	export namespace RO
	{
		export type From < L extends Leaf < any > > = Omit < L , "$" > &
		{
			get $ () : any ;
		}
	}
}

export interface Coll
{
	[ Coll_Update ] () : void ;
}

/* .. 実装 */

export namespace Leaf
{
	/* 操作 */

	export const addRef = < V > ( leaf : Leaf < V > , ref : Leaf.Ref )  =>
	{
		Life.addRef ( leaf , ref ) ;
		ref.vChan ?.() ;
	}

	export const trans = < T , S > ( source : Leaf < S > , trans : trans < T , S > ) =>
	{
		return new Leaf.Core.Trans ( source , trans ) ;
	}

	export const transR = < T , S > ( source : Leaf.RO < S > , get : ( src : S ) => T ) : Leaf.RO < T > =>
	{
		return new Leaf.Core.Trans ( source , { get } ) ;
	}

	export namespace RO
	{
		export const addRef = < V > ( leaf : RO < V > , ref : Ref )  =>
		{
			Leaf.addRef ( leaf , ref ) ;
		}
	}

	/* Core */

	export abstract class Core < V , R extends Ref = Ref > extends Life < R > implements Leaf < V >
	{
		#_coll ? : Coll ;

		constructor ( coll : Coll | undefined )
		{
			super () ;
			this.#_coll = coll ;
		}

		public get $ () : V { return this [ Leaf_Get_Value ] () ; }
		public set $ ( newValue : V ) { this [ Leaf_Set_Value ] ( newValue ) ; }

		public abstract [ Leaf_Get_Value ] () : V ;
		public abstract [ Leaf_Set_Value ] ( newValue : V , coll ? : Coll ) : void ;

		public [ Leaf_Notify_Change ] ( coll : Coll | undefined )
		{
			this [ Refs ] .forEach
			(
				ref => ref.vChan ?.()
			)

			if ( this.#_coll && this.#_coll != coll )  this.#_coll [ Coll_Update ] () ;
		}
	}
}

export namespace Leaf.Core
{
	export class Entity < V > extends Core < V >
	{
		#_value : V ;

		constructor ( newValue : V , coll ? : Coll )
		{
			super ( coll ) ;
			this.#_value = newValue ;
		}

		public [ Leaf_Get_Value ] () : V
		{
			return this.#_value ;
		}

		public [ Leaf_Set_Value ] ( newValue : V , coll ? : Coll )
		{
			if ( newValue === this.#_value )  return ;
			this.#_value = newValue ;
			this [ Leaf_Notify_Change ] ( coll ) ;
		}
	}

	export class Trans < V , S > extends Core < V >
	{
		constructor
		(
			protected source : Leaf < S > ,
			protected conv : Leaf.trans < V , S > ,
			coll ? : Coll
		)
		{
			super ( coll ) ;
			
			Leaf.addRef
			(
				source ,
				{
					vChan : () => this [ Leaf_Notify_Change ] ( undefined )
				}
			) ;
		}

		public override [ Leaf_Get_Value ] () : V
		{
			return this.conv.get ( this.source.$ ) ;
		}

		public override [ Leaf_Set_Value ] ( newValue : V , coll ? : Coll ) : void
		{
			if ( this.conv.set )  this.source [ Leaf_Set_Value ]
			(
				this.conv.set ( newValue ) ,
				coll
			) ;
		}
	}
}

