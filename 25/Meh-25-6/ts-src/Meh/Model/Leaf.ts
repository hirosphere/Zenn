import { log } from "../Util.js" ;
import { Life , ru } from "./Life.js" ;

const update = Symbol () ;

export abstract class Leaf < V >  extends Life < Leaf.Ref < V > >
{
	public static readonly update = update ;

	public static new < V > ( new_v : V , branch ? : Leaf.Branch )
	{
		return new Leaf.Entity ( new_v , branch ) ;
	}

	/* */

	constructor (  protected p_branch ? : Leaf.Branch  ) {  super () ;  }

	public override addRef ( ref : Leaf.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vchan ( this.get () ) ;
	}

	public set $ ( new_v : V )  {  this.set ( new_v , false ) ;  }
	public get $ () : V  {  return this.get () ;  }

	public abstract set ( new_v : V , is_branch ? : boolean ) : void ;
	public abstract get () : V ;

	public cv < R > ( cv : ( value : V ) => R ) : Leaf < R >
	{
		return new Leaf.Conv ( this , { get : cv } ) ;
	}

	public [ update ] () : void
	{
		log ( `update [ ${ this [ ru ] } ]` ) ;
		this.p_notify ( this.$ ) ;
	}

	protected p_notify ( new_v : V , is_branch ? : boolean )
	{
		this.p_refs.forEach ( ref => ref.vchan ( new_v ) ) ;
		! is_branch && this.p_branch ?. [ update ] () ;
	}

	public override toString () { return String ( this.$ ) }
}

type leaf < V > = Leaf < V > ;

export namespace Leaf
{
	export class Entity < V > extends Leaf < V >
	{
		constructor
		(
			protected p_value : V ,
			branch ? : Branch
		)
		{ super ( branch ) ; }

		public override set ( new_v : V, is_branch ? : boolean ) : void
		{
			if ( new_v === this.p_value )  return ;
			this.p_value = new_v ;
			this.p_notify ( new_v , is_branch ) ;
		}

		public override get() : V {  return this.p_value ;  }
	}

	export class Rel < V > extends Leaf < V >
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
			src : Leaf < S > ,
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

	export interface r < V > extends Omit< Leaf < V > , "set" | "$" >
	{
		get () : V ;
		get $ () : V ;
	}

	export interface Branch
	{
		[ update ] () : void ;
	}
}
