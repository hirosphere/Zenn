import { Leaf, lol, Renn, ef, each, dom, log, Order } from "../meh/index.js" ;

export namespace stats
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
}

export namespace vm
{
	export class App
	{
		public readonly title ;
		public readonly items ;

		constructor( v : stats.app )
		{
			this.title = Leaf.str.new ( v.title );
			this.items = new Items ( v.items ) ;
			this.items.rand_check();

			document.title = v.title ;
		}
	}

	export class Items extends Renn < Item >
	{
		constructor( v : stats.item [] )
		{
			super () ;
			this.value = v ;
		}

		public set value ( v : stats.item [] )
		{
			this.clear() ;
			const s = v.map( v => new Item ( v ) )
			this.new ( s ) ;
		}

		public rand_check()
		{
			this.orders.forEach
			(
				o => o.src.completed.value = bool_rand()
			);
		}
	}

	export class Item
	{
		public readonly text ;
		public readonly completed ;

		constructor( v : stats.item )
		{
			this.text = Leaf.str.new ( v.text ) ;
			this.completed = new Leaf.Entity ( false ) ;

			log( v.text );
		}
	}

	const bool_rand = ( r = 0.5 ) => Math.random() < r ;
}

export namespace vc
{
	export const App = ( m : vm.App ) : dom.defs.node =>
	{
		return ef.article
		(
			{ class : "fc" },

			ef.h1( m.title ),

			ef.section (
				command
				(
					"Random" ,
					() => m.items.rand_check()
				),
			),

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
			checkbox( m.completed )
		)
	};

	const command = ( label : string , act : () => void ) =>
	{
		return ef.button
		(
			{ acts : { click : act } },
			label
		);
	}

	const checkbox = ( state : Leaf.bool ) =>
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
	const v : stats.app =
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

	dom.add( vc.App( new vm.App ( v ) ) , "body" );
};

main() ;
