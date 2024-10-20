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
}

export namespace vm
{
	export class App
	{
		public readonly title ;
		public readonly items ;
		public readonly editor ;


		constructor( v : sv.app )
		{
			this.title = Leaf.str.new ( v.title );
			this.items = new Items ( v.items ) ;
			this.editor = new Editor( this.items ) ; 

			this.items.rand_check();
			document.title = v.title ;
		}
	}

	export class Editor
	{
		public readonly text = new Leaf.Entity ( "なにする？" ) ;

		constructor( protected items : Items )
		{
		}

		public post()
		{
			const item = new Item( { text : this.text.value } ) ;
			this.items.new ( [ item ] , 0 )
			this.text.value = "";
		}
	}

	export class Items extends Renn < Item >
	{
		constructor( v : sv.item [] )
		{
			super () ;
			this.value = v ;
		}

		public set value ( v : sv.item [] )
		{
			this.clear() ;
			const s = v.map( v => new Item ( v ) )
			this.new ( s ) ;
		}

		public clear_completed()
		{
			const list = this.orders.filter( o => o.src.completed.value );

			list.forEach ( o => o.remove () ) ;
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

		constructor( v : sv.item )
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

			Post( m.editor ),

			ef.section (
				{ class : "bar" },
				command
				(
					"Random" ,
					() => m.items.rand_check()
				),
				command
				(
					"削除",
					() => m.items.clear_completed ()
				)
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

	const Post = ( m : vm.Editor ) =>
	{
		return ef.form
		(
			{
				class : "post",
				acts :
				{
					submit( ev )
					{
						ev.preventDefault() ;
						m.post() ;
						log( "post" , m.text.value );
					}
				}
			},
			ef.input
			(
				{
					class : "text" ,
					props :
					{
						value : m.text
					},
					acts :
					{
						input( ev )
						{
							if( ! ( ev.target instanceof HTMLInputElement ) )  return ;

							m.text.value = ev.target.value;
						}
					}
				}
			),
			ef.input
			(
				{
					class : "submit",
					props : { type : "submit" , value : "作成" }
				} ,
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
	const v : sv.app =
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
