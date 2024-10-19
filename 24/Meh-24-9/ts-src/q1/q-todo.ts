import { Leaf, lol, Renn, ef, each, dom, log, Order } from "../meh/index.js" ;

export namespace sv
{
	export type app =
	{
		title : string ;
		items : item [] ;
	};

	export type item =
	{
		text : string ;
		completed ? : boolean ;
	};

	export const defv : app =
	{
		title : "ToDo 日本史" ,
		items :
		[
			{ text : "矢じりを作る" },
			{ text : "稲作を教える" },
			{ text : "製鉄を教える" },
			{ text : "民族を移動する" },
			{ text : "都を作る" },
			{ text : "都を移す" },
			{ text : "半島を統一する" },
			{ text : "アヘンを売る" },
			{ text : "ロシアに勝つ" },
			{ text : "阪急電鉄を興す" },
			{ text : "箱根土地を始める" },
			{ text : "英米を倒す" },
			{ text : "ハイチュウを買う" },
			{ text : "たけのこの里を分譲" },
		]
	};
}

export namespace vm
{
	export class App
	{
		public readonly title ;
		public readonly items ;

		constructor( v : sv.app = sv.defv )
		{
			this.title = Leaf.str.new ( v.title );
			this.items = new Items ( v.items ) ;

			document.title = v.title ;
		}
	}

	export class Items extends Renn < Item >
	{
		constructor( sv : sv.item [] )
		{
			super () ;
			this.sv = sv ;
		}

		public set sv ( v : sv.item [] )
		{
			this.clear() ;
			const s = v.map( v => new Item ( v ) )
			this.new ( s ) ;
		}
	}

	export class Item
	{
		public readonly text ;
		public readonly completed ;

		constructor( v : sv.item )
		{
			this.text = Leaf.str.new ( v.text ) ;
			this.completed = Leaf.bool.new ( false ) ;

			log( v.text );
		}
	}
}

export namespace vc
{
	export const App = () : dom.defs.node =>
	{
		const m = new vm.App ;

		return ef.article
		(
			{ class : "fc" },

			ef.h1( m.title ),

			ef.ul (
				{ class : "todo-list" },
				each (
					m.items ,
					o => Item( o ) ,
				),
			),
		);
	}

	const Item = ( o : Order < vm.Item > ) =>
	{
		const m = o.src ;
		return ef.li
		(
			{ class : [ "todo-item" , { completed : m.completed } ] } ,
			ef.span( o.count ),
			ef.span( m.text ),
			checkbox( "済", m.completed )
		)
	};

	const checkbox = ( label : lol.str , state : Leaf.bool ) =>
	{
		return ef.input
		(
			{
				attrs : { type : "checkbox" } ,
				props : { checked : state } ,
				acts :
				{
					change ( ev )
					{
						if( ev.target instanceof HTMLInputElement )
						{
							state.value = ev.target.checked ;
						}
					}
				}
			}
		);
	};
}


const main = () =>
{
	dom.add( vc.App() , "body" );
};

main() ;
