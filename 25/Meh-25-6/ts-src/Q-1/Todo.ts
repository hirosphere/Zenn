import { Leaf , Renn , log } from "../Meh/Meh.js" ;

namespace DM
{
	export class ToDoApplet
	{}

	export class ToDoList
	{
		public readonly items = new Renn < ToDoItem > ;
	}

	export class ToDoItem
	{
		public readonly title ;
		public readonly conpleted ;

		constructor ( i : todoitem )
		{
			this.title = Leaf.new ( i.title ) ;
			this.conpleted = Leaf.new ( i.completed ) ;
		}
	}

	export type todoitem = { title : string , completed : boolean } ;
}
