import { log } from "../Util.js" ;
import { Life , ru , refs } from "./Life.js" ;

const set = Symbol () ;
const update = Symbol () ;

export abstract class State < V >  extends Life < State.Ref < V > >
{
	public static readonly update = update ;

	public static new < V > ( newV : V , branch ? : State.Branch )
	{
		return new State.Leaf ( newV , branch ) ;
	}

	/* */

	#branch ? : State.Branch ;

	constructor ( branch ? : State.Branch  )
	{
		super () ;
		this.#branch = branch ;
	}

	public override addRef ( ref : State.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vchan ( this.get () ) ;
	}

	public set $ ( newV : V )  {  this.set ( newV ) ;  }
	public get $ () : V  {  return this.get () ;  }

	public [ set ] ( newV : V , branch ? : State.Branch ) : void { this.set ( newV , branch ) ; }

	public abstract set ( newV : V , branch ? : State.Branch ) : void ;
	public abstract get () : V ;

	public cv < R > ( cv : ( value : V ) => R ) : State < R >
	{
		return new State.Trans ( this , { get : cv } ) ;
	}

	protected pNotify ( newV : V , branch ? : State.Branch )
	{
		this[ refs ].forEach ( ref => ref.vchan ( newV ) ) ;
		branch == this.#branch && this.#branch?.fUpdate () ;
	}

	public override toString () { return String ( this.$ ) }
}

export namespace State
{
	export class Leaf < V > extends State < V >
	{
		#value : V ;

		constructor
		(
			newV : V ,
			branch ? : Branch
		)
		{
			super ( branch ) ;
			this.#value = newV ;
		}

		public override set ( newV : V, branch ? : Branch ) : void
		{
			if ( newV === this.#value )  return ;
			this.#value = newV ;
			this.pNotify ( newV , branch ) ;
		}

		public override get() : V {  return this.#value ;  }
	}


	export class Trans < V , S >  extends State < V >
	{
		constructor
		(
			private src : State < S > ,
			private trans : trans < V , S >
		)
		{
			super () ;

			const ref : Ref < S > =
			{
				vchan : () => this.pNotify ( this.$ ) ,
				lterm : () => this.terminate ()
			}
			src.addRef ( ref ) ;
		}

		public override set ( newV : V ) { this.trans.set && this.src.set ( this.trans.set ( newV ) ) ;  }
		public override get ( ): V {  return this.trans.get ( this.src.$ ) ;  }
	}

	/* */

	export interface Ref < V >  extends Life.Ref
	{
		vchan ( newV : V ) : void ;
	}

	/* */

	export type cv < V , S > = ( srcValue : S ) => V ;
	export type trans < V , S > =
	{
		get : ( value : S ) => V ;
		set ? : ( value : V ) => S ;
	}

	export interface r < V > extends Omit< State < V > , "set" | "$" >
	{
		get () : V ;
		get $ () : V ;
	}


	/* Branch */

	export type ToBranch < V extends object > =
	{}



	export abstract class Branch < V extends object = any > extends State < V >
	{
		// public override get () : V {}
		// public override set ( newV : V ) {}

		public abstract fUpdate () : void ;
	}
}
