import { log } from "../Util.js" ;
import { Life } from "./Life.js" ;
import { Branch } from "./Branch.js" ;
import
{
	ru ,
	refs , notify ,
	setValue ,
	updateComposite ,
	terminate ,

} from "./Symbol.js" ;



/* State */

const rels = Symbol () ;

export abstract class State < V >  extends Life < State.Ref < V > >
{
	#_composite ? : Branch.Composite ;
	#_rels ? : Rels ;

	/* 公開 */

	constructor ( composite ? : Branch.Composite )
	{
		super () ;
		this.#_composite = composite ;
	}

	public get $ () : V { return this.getValue () ; }
	public set $ ( newV : V ) { this.setValue ( newV ) ; }

	public abstract getValue () : V ;
	public abstract setValue ( newV : V , isComposite ? : true ) : void ;


	public $conv < R > ( get : State.conv < R , V > ) : State < R >
	{
		return new Trans ( this , { get } ) ;
	}

	public override addRef ( ref : State.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vChan () ;
	}

	/* 非公開 */

	public [ setValue ] ( newV : V , isComposite ? : true ) : void
	{
		this.setValue ( newV , isComposite ) ;
	}

	protected [ notify ] ( isComposite ? : true )
	{
		this [ refs ].forEach ( ref => ref.vChan () ) ;
		! isComposite && this.#_composite ?. [ updateComposite ] () ;
	}

	protected get [ rels ] () : Rels
	{
		return this.#_rels ??= new Map ;
	}

	public override toString () { return String ( this.getValue () ) ; }

	override [ terminate ] ()
	{
		this [ rels ].forEach ( rel => rel [ terminate ] () ) ;
		super [ terminate ] () ;
	}
}

type Rels = Map < object , State < any > > ;

export namespace State
{
	export interface Ref < V >  extends Life.Ref < State < V > >
	{
		vChan () : void ;
	}

	/* */

	export type conv < Out , In > = ( inp : In ) => Out ;
	export type trans < V , Src > =
	{
		get : ( value : Src ) => V ;
		set ? : ( value : V ) => Src ;
	}

	export interface RO < V > extends Omit< State < V > , "setValue" | "$" >
	{
		get $ () : V ;
	}
}


/* Leaf */


export const leaf = < V > ( newV : V , composite ? : Branch.Composite ) : Leaf < V > =>
{
	return new Leaf ( newV , composite ) ;
}

export type ll < V > = State < V > | V ;
export namespace ll
{
	export type String = ll < string > ;
	export type Number = ll < number > ;
	export type Boolean = ll < boolean > ;
}

export type llr < V > = State.RO < V > | V ;
export namespace llr
{
	export type String = llr < string > ;
	export type Number = llr < number > ;
	export type Boolean = llr < boolean > ;
}


export class Leaf < V > extends State < V >
{
	#_value : V ;

	constructor
	(
		newV : V ,
		composite ? : Branch.Composite
	)
	{
		super ( composite ) ;
		this.#_value = newV ;
	}

	public override setValue ( newV : V, isComposite ? : true ) : void
	{
		if ( newV === this.#_value )  return ;
		this.#_value = newV ;
		this [ notify ] ( isComposite ) ;
	}

	public override getValue () : V {  return this.#_value ;  }
}

export class Trans < V , S >  extends State < V >
{
	constructor
	(
		private src : State < S > ,
		private trans : State.trans < V , S >
	)
	{
		super () ;

		const ref : State.Ref < S > =
		{
			vChan : () => this [ notify ] () ,
			lTerm : () => this [ terminate ] ()
		}
		src.addRef ( ref ) ;
	}

	public override setValue( newV : V , isComposite ? : true ) : void
	{
		this.trans.set && this.src.setValue ( this.trans.set ( newV ) , isComposite ) ;
	}

	public override getValue ( ) : V
	{
		return this.trans.get ( this.src.getValue () ) ;
	}
}
