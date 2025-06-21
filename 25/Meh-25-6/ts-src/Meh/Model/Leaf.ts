import { Life } from "./Life.js" ;

export const set = Symbol () ;

export abstract class Leaf < V >  extends Life < Leaf.Ref < V > >
{
	public static cr < V > ( new_v : V ) {  return new Leaf.Entity ( new_v ) ;  }

	/* */

	public override addRef ( ref : Leaf.Ref < V > ) : void
	{
		super.addRef ( ref ) ;
		ref.vchan ( this.get () ) ;
	}

	public set $ ( new_v : V )  {  this.set ( new_v , false ) ;  }
	public get $ () : V  {  return this.get () ;  }

	public [ set ]  ( new_v : V , is_branch : boolean ) : void  {  this.set ( new_v , is_branch ) ;  }

	public abstract set ( new_v : V , is_branch : boolean ) : void ;
	public abstract get () : V ;

	public cv < R >
	(
		tor : ( v : V ) => R ,
		tov ? : ( r : R ) => V
	
	) : Leaf.Rel < R >
	{
		return new Leaf.Rel < R >
		(
			() => tor ( this.get () ) ,
			tov ? r => this.set ( tov ( r ) , false )  : undefined
		) ;
	}
}

export namespace Leaf
{
	export class Entity < V > extends Leaf < V >
	{
		constructor
		(
			protected p_value : V ,
		)
		{
			super () ;
		}

		public override set ( new_v : V, is_branch: boolean ) : void
		{
			if ( new_v === this.p_value )  return ;

			const old_v = this.p_value ;
			this.p_value = new_v ;

			this.p_refs.forEach
			(
				ref => ref.vchan ( new_v , old_v )
			) ;
		}

		public override get() : V {  return this.p_value ;  }
	}

	export class Rel < V > extends Leaf < V >
	{
		constructor
		(
			protected from_s : () => V ,
			protected to_s ? : ( new_v : V ) => void
		)
		{  super () ;  }

		public override set ( new_v : V ) {  this.to_s ?. ( new_v ) ;  }
		public override get ( ): V {  return this.from_s () ;  }
	}

	/* */

	export interface Ref < V >  extends Life.Ref
	{
		vchan ( new_v : V , old_v ? : V ) : void ;
	}

	/* */

	export interface r < V > extends Omit< Leaf < V > , "set" | "$" | "cv" >
	{
		get () : V ;
		get $ () : V ;
		cv < R > ( tor : ( v : V ) => R ) : void ;
	}
}
