import { leaf , Renn , Position , ef , each , dom , log } from "../meh/index.js" ;

dom ;

export namespace sv
{
}

export namespace vm
{
	export class App
	{
		root = new Root() ;
	}

	export class Node < P extends Node = any >
	{
		public readonly parts ;

		constructor ( parts ? : P []  )
		{
			this.parts = new Renn ( parts );
		}

		public fetch() : void {}
	}

	export class Root extends Node < Pref >
	{
		constructor()
		{
			super () ;
			setTimeout ( () => this.fetch () , 1000 ) ;
		}

		public override fetch() : void
		{
			const parts = [ "北海道" , "東北" , "九州" ].map ( i => new Pref( i ) ) ;
			this.parts.new ( parts ) ;
		}
	}

	export class Pref extends Node
	{
		constructor( public readonly name : string )
		{
			super();
		}
	}
}


export namespace vc
{
	export const App = ( m : vm.App ) =>
	{
		return ef.article
		(
			{ class : "lt" } ,

			ef.h1( { class : "lt" } , "Heart Rails" ) ,

			// ef.section( ps (  ) ),

			ef.ul
			(
				{ class : "list lt" } ,

				each
				(
					m.root.parts ,
					p => Pref( p ) ,
				),
			),
		);
	};

	const Pref = ( p : Position < vm.Pref > ) =>
	{
		const m = p.src ;

		return ef.li
		(
			{ class : "lt" } ,
			ef.span ( { class : "number" } , p.count ) ,
			ef.span ( m.name ) ,
		);
	};
}

export const main = ( qs : string ) =>
{
	const m = new vm.App ;
	dom.add ( vc.App( m ) , qs ) ;
} ;
