import { Exist, Leaf, Renn, ef, each, root, log } from "../meh/index.js";

namespace docs
{
	interface TodoIV
	{
		title : string;
		text : string;
	}

	type X = { xx : string };

	class Todo extends Exist
	{
		constructor( com : Exist, iv : TodoIV )
		{
			super( com );
			this.title = new Leaf.String( this, iv.title );
			this.text = new Leaf.String( this, iv.text );
		}

		title; text;
	}
	
	const newTodo = ( com : Exist, init : TodoIV ) =>
	{
		const ex = new Exist( com );

		return null ||
		{
			title: Leaf.String.make( ex, init.text ),
			text: Leaf.String.make( ex, init.text ),
		}
	}

	export class Todos extends Renn < Todo >
	{}
}

namespace umos
{
	export class App extends Exist
	{
		todos = new docs.Todos( this );
	}
}

namespace ui
{
	export const TodoApp = ( com : Exist = root ) =>
	{
		const mo = new umos.App( com );

		const inits =
		[
			{ title: "", text: "" },
		];

		mo.todos.new_orders;

		return ef.article
		(
			ef.h1( "Meh Todo App" ),
			Todos( mo.todos ),
		);
	};

	const Todos = ( model : docs.Todos ) =>
	{
		return ef.section
		(
			each
			(
				model,
				order => order.source.title
			),
		);
	};
}

export const TodoApp = ui.TodoApp;
