import { log } from "../Util.js" ;
import { Life , ru , refs } from "./Life.js" ;

const set = Symbol () ;
export const updateBranch = Symbol () ;

export abstract class State < V >  extends Life < State.Ref < V > >
{
	#_composite ? : Branch.Composite ;

	constructor ( composite ? : Branch.Composite )
	{
		super () ;
		this.#_composite = composite ;
	}

	public override addRef ( ref : State.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vchan ( this.get () ) ;
	}

	public set $ ( newV : V )  {  this.set ( newV ) ;  }
	public get $ () : V  {  return this.get () ;  }

	public [ set ] ( newV : V , isBranch ? : true ) : void { this.set ( newV , isBranch ) ; }

	public abstract set ( newV : V , isBranch ? : true ) : void ;
	public abstract get () : V ;

	public cv < R > ( cv : ( value : V ) => R ) : State < R >
	{
		return new State.Trans ( this , { get : cv } ) ;
	}

	protected notify ( newV : V , isBranch ? : true )
	{
		this[ refs ].forEach ( ref => ref.vchan ( newV ) ) ;
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
			composite ? : Branch.Composite
		)
		{
			super ( composite ) ;
			this.#value = newV ;
		}

		public override set ( newV : V, isBranch ? : true ) : void
		{
			if ( newV === this.#value )  return ;
			this.#value = newV ;
			this.notify ( newV , isBranch ) ;
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
				vchan : () => this.notify ( this.$ ) ,
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
}


/* Branch */

export function Branch < T extends object > ()
{

} 

export type Branch < T extends object > = Branch.Imp < T > & Props < T > ;

type Props < T extends object > =
{
	[ prop in keyof T ] : T [ prop ] extends object ? Branch < T [ prop ] > : State < T [ prop ] > ;
}

export namespace Branch
{

	export interface Composite
	{
		[ updateBranch ] () : void ;
	}

	export const create = < T extends object > ( newV : T , branch ? : Imp < any > ) : Branch < T > =>
	{
		return new Imp ( newV , branch ) as Branch < T >
	}

	export class Imp < T extends object , PL extends PropTypeList < T > = any > extends State < T >
	{
			
		/* */
	
		 constructor ( props : T , composite ? : Composite )
		{
			super () ;

			for ( const [ prop , value ] of Object.entries( props ) )
			{
				log ( prop , value ) ;
				( this as any ) [ prop ] =
				(
					typeof value == "object" ?
						new Imp ( value , composite ) :
						new State.Leaf ( value , this )
				) ;
			}
		}
	
		public override get () : T
		{
			return {} as T ;
		}
	
		public override set ( newV : T )
		{
			;
		}
	
		[ updateBranch ] () : void
		{
			;
		}
	}

	type PropTypeList < T extends object > =
	{
		[ prop in keyof T ] :
		(
			T [ prop ] extends object ?
				typeof Imp < T [ prop ] > :
				typeof State < T [ prop ] >
		)
	} ;	
}


/* */

export const leaf = < V > ( newV : V , composite ? : Branch.Composite ) : State < V > =>
{
	return new State.Leaf ( newV , composite ) ;
}
