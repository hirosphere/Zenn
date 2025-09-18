



/*
	Live
		Number
		String
		Boolean
		BigInt


		easyNew
*/

/*
	Ease < V >
		Ease < V > ( value : V )
*/

/*
	LiveState 用途別難易度

	「きっちり」
		「メンバーコンストラクタとデフォルト値」しっかり定義

	「簡単」
		リテラルタイプとリテラルデータを与えるだけ

*/

const ud = undefined ;
type ud = undefined ;


/* 型 */

export type Live < LIT > =
{
	set $ ( lv : LIT ) ;
	get $ () : LIT ;

	set ( lv : LIT , changer ? : object ) : void ;
	get () : LIT ;

	addRef ( ref : Live.Ref ) : void ;
	removeRef ( ref : Live.Ref ) : void ;
}

export namespace Live
{
	/* Branch */

	export type Branch < BD extends BranchDef > = Live < BDtoLIT < BD > > &
	{
		[ prop in keyof BD ] : InstanceType < BD [ prop ] > ;
	}
	
	export type BranchDef =
	{
		[ prop : string ] : Ctor ;
	} ;

	export type BranchCtor < BD extends BranchDef > =
	(
		new ( lv : BDtoLIT < BD > , agg ? : Agg ) => Branch < BD >
	) ;

	export type BDtoLIT < BD extends BranchDef > =
	{
		[ prop in keyof BD ] : InstanceType < BD [ prop ] > [ "$" ] ;
	} ;



	/* 補助型 */

	export type Lit < LIVE extends Live < any > > = LIVE [ "$" ] ;

	export type Ctor < LIT = any > = new ( lv : LIT , agg ? : Agg ) => Live < LIT > ;



	/* Row */

	export type Row < EL > = Live < EL [] > &
	{}


	/* Aggrigate */

	type Agg =
	{
		elementChanged () : void ;
	}


	/*  */
	
	export type Ref =
	{
		src ? : Live < any > ;
		vChan : ( changer : object | ud ) => void ;
	}
}






/* 実装 */

export abstract class LiveBase < LIT >  implements Live < LIT >
{
	public set $ ( lv : LIT ) { this.set ( lv ) ; }
	public get $ () : LIT { return this.get () ; }

	public abstract set ( lv : LIT ) : void ;
	public abstract get () : LIT ;

	public addRef ( ref : Live.Ref ) : void
	{
		this.#_refs.add ( ref ) ;
		ref.vChan ( ud ) ;
	}

	public removeRef ( ref : Live.Ref ) : void
	{
		this.#_refs.delete ( ref ) ;
	}

	#_refs = new Set < Live.Ref > ;

	protected abstract get defv () : LIT ;
}



export namespace Live
{
	/* Leaf */

	export const NewLeaf = < LIT > ( defv : LIT ) : Live.Ctor < LIT > =>
	{
		return class Leaf extends LiveBase < LIT >
		{
			constructor ( value : LIT )
			{
				super () ;
				this.#_value = value ;
			}
		
			public override get () : LIT { return this.#_value ; }
			public override set ( lv : LIT )
			{
				this.#_value = lv ;
			}
	
			protected override get defv () : LIT
			{
				return defv ;
			}
		
			#_value : LIT ;
		}
	}
		

	export class Number extends NewLeaf ( 0 ) {}
	export class String extends NewLeaf ( "" ) {}
	export class Boolean extends NewLeaf ( false ) {}
	export class BigInt extends NewLeaf ( 0n ) {}



	/* Branch */

	export const NewBranch = < BD extends BranchDef , LIT = BDtoLIT < BD > >
	(
		def : BD
	
	) : BranchCtor < BD > =>
	{
		const rt = class extends LiveBase < LIT >
		{

			public override set ( lv : LIT ) : void
			{
				;
			}

			public override get () : LIT
			{
				return {} as any ;
			}

			protected override get defv () : LIT
			{
				return {} as any ;
			}
		}

		return rt as any ;
	}
}
