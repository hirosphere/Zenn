import { leaf, Renn, Order, defs, ef, place, each, sw, dom, log, pl } from "../meh/index.js" ;

dom ;

export namespace sv
{
	export type node =
	{
		name : string ;
	};
}

export namespace vm
{
	export class App
	{
		root = new Root() ;
		curr = leaf < Node > ( this.root ) ;
	}

	export class Node < P extends Node = any >
	{
		public readonly parts ;
		public title ;

		constructor ( v ? : sv.node , parts ? : P []  )
		{
			this.parts = new Renn ( parts );
			this.title = v ?.name ?? "" ;
		}

		public fetch() : void {}

		public get url ()
		{
			return "" ;
		}
	}

	export class Root extends Node < Area >
	{
		constructor()
		{
			super
			(
				{ name : "Root" } ,
				[ "関東" ].map ( i => new Area ( i ) )
			) ;
			
			setTimeout ( () => this.fetch () , 1000 ) ;
		}

		public override fetch() : void
		{
			const parts = [ "北海道" , "東北" , "九州" ].map ( i => new Area( i ) ) ;
			this.parts.new ( parts ) ;
		}
	}

	export class Area extends Node
	{
		constructor( public readonly name : string )
		{
			super( { name } );
		}
	}

	export type sel = leaf < Node > ;
}


export namespace vc
{
	export const App = ( m : vm.App ) =>
	{
		return ef.article
		(
			{ class : "lt" } ,

			ef.h1( { class : "lt" } , "Heart Rails" ) ,

			pl.switch
			(
				m.curr ,
				node => create_page ( node , m.curr )
			) ,
		);
	};

	const create_page = ( node : vm.Node , sel : vm.sel ) =>
	{
		if( ! node )  return ;

		return NaviPage ( node , sel ) ;
	}

	const NaviPage = ( node : vm.Node , sel : vm.sel ) =>
	{
		const p = node.parts.orders [ 0 ] ;

		return ef.article
		(
			ef.h2 ( node.title ) ,

			ef.section
			(
				{ class : "links" } ,
				
				each
				(
					node.parts ,
					pos => link ( pos.src , sel )
				),

				link ( node , sel )
			),
		);
	}
}

export namespace vc
{
	export const link = ( node : vm.Node , sel : vm.sel ) =>
	{
		return ef.a
		(
			{
				class : "link" ,
				attrs : { href : node.url } ,
				acts :
				{
					click ( ev : MouseEvent )
					{
						ev.preventDefault();
						sel.value = node ;
					}		
				}
			} ,
			node.title
		) ;
	};
}

export const main = ( qs : string ) =>
{
	const m = new vm.App ;
	dom.add ( vc.App ( m ) , qs ) ;
};
