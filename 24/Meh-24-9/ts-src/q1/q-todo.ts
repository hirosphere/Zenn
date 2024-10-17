import { Leaf, Renn, ef, each, dom, log, Order } from "../meh/index.js" ;

export namespace vts
{
	export type app =
	{
		title : string ;
		items : item [] ;
	};

	export type item =
	{
		text : string ;
	};

	export const defv : app =
	{
		title : "ToDo 日本史" ,
		items :
		[
			{ text : "矢じりを作る" },
			{ text : "稲作を習う" },
			{ text : "製鉄する" },
			{ text : "民族を移動する" },
			{ text : "都を作る" },
			{ text : "都を移す" },
			{ text : "半島を統一する" },
			{ text : "アヘンを売る" },
			{ text : "ロシアに勝つ" },
			{ text : "ハイチュウを買う" },
			{ text : "たけのこの里を転売する" },
		]
	};
}

export namespace vms
{
	export class App
	{
		public readonly title ;
		public readonly items ;

		constructor( v : vts.app = vts.defv )
		{
			this.title = new Leaf.str ( v.title );
			this.items = new Renn < ToDoItem >
			(
				v.items.map
				(
					item => new ToDoItem( item )
				)
			);

			document.title = v.title ;
		}
	}

	export class ToDoItem
	{
		public readonly text ;

		constructor( v : vts.item )
		{
			this.text = new Leaf.str ( v.text ) ;

			log( v.text );
		}
	}
}

export namespace view
{
	export const App = () : dom.defs.node =>
	{
		const m = new vms.App ;

		return ef.article
		(
			{ class : "fc" },

			ef.h1( m.title ),

			ef.ul (
				each (
					m.items ,
					o => Item( o ) ,
				),
			),
		);
	}

	const Item = ( o : Order < vms.ToDoItem > ) =>
	{
		return ef.li( "(", o.count, ") ", o.src.text )
	};
}

const main = () =>
{
	dom.add( view.App() , "body" );
};

main() ;
