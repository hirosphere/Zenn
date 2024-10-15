import { Leaf, Renn, ef, each, dom } from "../meh/index.js" ;

export namespace vms
{
	export class App
	{
		public readonly title ;

		constructor( v  : App.value = App.defv )
		{
			this.title = new Leaf.str ( v.title );

			document.title = v.title ;
		}
	}

	export namespace App
	{
		export type value =
		{
			title : string ;
		};

		export const defv =
		{
			title : "ToDo 日本史" ,
		};
	}


	export class ToDoList
	{}

	export class ToDoItem
	{}
}

export namespace view
{
	export const App = () : dom.defs.node =>
	{
		const m = new vms.App ;

		return ef.article
		(
			ef.h1( m.title ),
		);
	}
}

const main = () =>
{
	dom.add( view.App() , "body" );
};

main() ;
