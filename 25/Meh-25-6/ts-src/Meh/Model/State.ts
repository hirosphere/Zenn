import { log } from "../Util.js" ;
import { Life , ru , refs } from "./Life.js" ;

const value = Symbol () ;
const branch = Symbol () ;
const update = Symbol () ;

export abstract class State < V >  extends Life < State.Ref < V > >
{
	public static readonly update = update ;

	public static new < V > ( new_v : V , branch ? : State.Branch )
	{
		return new State.Entity ( new_v , branch ) ;
	}


	/* */

	protected [ branch ] ? : State.Branch ;

	constructor ( br ? : State.Branch  )
	{
		super () ;
		this [ branch ] = br ;
	}

	public override addRef ( ref : State.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vchan ( this.get () ) ;
	}

	public set $ ( new_v : V )  {  this.set ( new_v , false ) ;  }
	public get $ () : V  {  return this.get () ;  }

	public abstract set ( new_v : V , is_branch ? : boolean ) : void ;
	public abstract get () : V ;

	public cv < R > ( cv : ( value : V ) => R ) : State < R >
	{
		return new State.Conv ( this , { get : cv } ) ;
	}

	public [ update ] () : void
	{
		log ( `update [ ${ this [ ru ] } ]` ) ;
		this.p_notify ( this.$ ) ;
	}

	protected p_notify ( new_v : V , is_branch ? : boolean )
	{
		this[ refs ].forEach ( ref => ref.vchan ( new_v ) ) ;
		! is_branch && this [ branch ] ?. [ update ] () ;
	}

	public override toString () { return String ( this.$ ) }
}

export namespace State
{
	export class Entity < V > extends State < V >
	{
		[ value ] : V ;

		constructor
		(
			newV : V ,
			branch ? : Branch
		)
		{
			super ( branch ) ;
			this [ value ] = newV ;
		}

		public override set ( new_v : V, is_branch ? : boolean ) : void
		{
			if ( new_v === this [ value ] )  return ;
			this [ value ] = new_v ;
			this.p_notify ( new_v , is_branch ) ;
		}

		public override get() : V {  return this [ value ] ;  }
	}


	export class Rel < V > extends State < V >
	{
		constructor
		(
			protected acc : { get : () => V , set ? : ( v : V ) => void }
		)
		{  super () ;  }

		public override set ( new_v : V ) {  this.acc.set ?. ( new_v ) ;  }
		public override get ( ): V {  return this.acc.get () ;  }
	}


	export class Conv < V , S >  extends Rel < V >
	{
		constructor
		(
			src : State < S > ,
			trans : trans < V , S >
		)
		{
			super
			({
				get : () => trans.get ( src.$ ) ,
				set : trans.set ? v => trans.set && src.set ( trans.set ( v ) ) : undefined
			}) ;
			
			const ref : Ref < S > =
			{
				vchan : () => this.p_notify ( this.$ ) ,
				lterm : () => this.terminate ()
			}
			src.addRef ( ref ) ;
		}
	}

	/* */

	export interface Ref < V >  extends Life.Ref
	{
		vchan ( new_v : V ) : void ;
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

	export interface Branch
	{
		[ update ] () : void ;
	}
}
