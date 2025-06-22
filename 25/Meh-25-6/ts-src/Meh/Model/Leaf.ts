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
		to_r : ( v : V ) => R ,
		to_v ? : ( r : R ) => V
	
	) : Leaf < R >
	{
		return new Leaf.Conv ( this , to_r , to_v ) ;
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
		{ super () ; }

		public override set ( new_v : V, is_branch: boolean ) : void
		{
			if ( new_v === this.p_value )  return ;
			this.p_value = new_v ;
			this.p_refs.forEach ( ref => ref.vchan ( new_v ) ) ;
		}

		public override get() : V {  return this.p_value ;  }
	}

	export const notify = Symbol () ;

	export class Rel < V > extends Leaf < V >
	{
		constructor
		(
			protected get_s : () => V ,
			protected set_s ? : ( new_v : V ) => void
		)
		{  super () ;  }

		public override set ( new_v : V ) {  this.set_s ?. ( new_v ) ;  }
		public override get ( ): V {  return this.get_s () ;  }

		public [ notify ] () : void
		{
			const new_v = this.get_s () ;
			this.p_refs.forEach ( ref => ref.vchan ( new_v ) ) ;
		}
	}

	export class Conv < V , S >  extends Rel < V >
	{
		constructor
		(
			src : Leaf < S > ,
			to_v : ( s : S ) => V ,
			to_s ? : ( v : V ) => S
		)
		{
			super
			(
				() => to_v ( src.$ ) ,
				to_s ? v => src.$ = to_s ( v ) : undefined
			) ;
			const ref : Ref < S > =
			{
				vchan : () => this [ notify ] () ,
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

	export interface r < V > extends Omit< Leaf < V > , "set" | "$" | "cv" >
	{
		get () : V ;
		get $ () : V ;
		cv < R > ( tor : ( v : V ) => R ) : void ;
	}
}
