
export const ud = undefined ;
export type ud = undefined ;


/* Life */

const LIFE_TERMINATE = Symbol () ;

export class Life < R extends Life.Ref >
{
	public addRef ( ref : R )
	{
		this.#_refs.add ( ref ) ;
	}

	public removeRef ( ref : R )
	{
		this.#_refs.delete ( ref ) ;
	}

	[ LIFE_TERMINATE ] ()
	{
		this.#_refs.clear () ;
	}

	#_refs = new Set < R > ;
}

export namespace Life
{
	export type Ref =
	{
		src : Life < any > ;
		lTerm ? : () => void ;
	}

	export const terminate = ( life : Life < any > ) : void =>
	{
		life [ LIFE_TERMINATE ] () ;
	}
}


/* Live */

export type Live < LIT > = Life < Live.Ref > &
{
	set $ ( lv : LIT ) ;
	get $ () : LIT ;

	set ( lv : LIT , changer ? : object ) : void ;
	get () : LIT ;
}

export namespace Live
{
	/* Row */


	/* Aggrigate */

	export type Agg =
	{
		eChan () : void ;
	}


	/*  */
	
	export type Ref = Life.Ref &
	{
		vChan : ( changer : object | ud ) => void ;
	}
}


export namespace Live
{
	export abstract class Base < LIT > extends Life < Live.Ref >  implements Live < LIT >
	{
		protected constructor ()
		{
			super () ;
		}

		public set $ ( lv : LIT ) { this.set ( lv ) ; }
		public get $ () : LIT { return this.get () ; }
	
		public abstract set ( lv : LIT , changer ? : object ) : void ;
		public abstract get () : LIT ;
	
		public override addRef ( ref : Live.Ref ) : void
		{
			super.addRef ( ref ) ;
			ref.vChan ( ud ) ;
		}

		/* */

		protected p_agg ? : Live.Agg ;
	}
	
	
	/* Leaf */

	export abstract class Leaf < LIT > extends Base < LIT >
	{
		protected init ( value : LIT , agg ? : Agg ) : void
		{
			this.p_value = value ;
		}
	
		public override get () : LIT { return this.p_value ; }
		public override set ( lv : LIT , changer ? : object )
		{
			this.p_value = lv ;
		}

		protected abstract p_value : LIT ;
	}

	export function newLeaf < LIT > ( defv : LIT ) : new () => Leaf < LIT >
	{
		return class extends Leaf < LIT >
		{
			protected override p_value: LIT = defv ;
		} ;
	}
	

	export class Number extends newLeaf ( 0 ) {}
	export class String extends newLeaf ( "" ) {}
	export class Boolean extends newLeaf ( false ) {}
	export class BigInt extends newLeaf ( 0n ) {}

	/* Branch */

	export type Branch < LIT > = Live < LIT > &
	{
		
	}

	export function Branch < LIT extends object > ( defv ? : LIT ) : new () => Branch < LIT >
	{
		return class Branch < LIT > extends Base < LIT >
		{
			public override set ( lv : LIT , changer ? : object ) : void
			{
				;
			}
	
			public override get() : LIT
			{
				return {} as any ;
			}

		} as any
	}

	/* Row */

	export class Row < E > extends Base < E [] >
	{
		constructor ( lt : E [] , agg ? : Agg )
		{
			super ( agg ) ;
		}

		public override set( lv : E [] , changer : object ) : void
		{
			;
		}

		public override get(): E[] {
			return [] ;
		}

		public insert ( lt : E [] ) : void
		{}

		public clear () : void
		{}
	}
}

