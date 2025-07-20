import { State , Renn , log } from "../Meh/Meh.js" ;

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
			this.title = State.new ( i.title ) ;
			this.conpleted = State.new ( i.completed ) ;
		}
	}

	export type todoitem = { title : string , completed : boolean } ;
}
