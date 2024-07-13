import { Exist, Leafr, Leaf } from "./index.js";
import _ls from "../ls.js";

export abstract class Selection extends Exist {}

export namespace Selection
{
	export class Single < Source > extends Selection
	{
		protected readonly current_item = new Leafr < Index < Source > | null > ( this, null );
	}

	export class Multiple < Source > extends Selection
	{
		protected readonly current_items = new Set < Index < Source > >;
	}
}

export namespace Selection
{
	export class Index < Source > extends Exist
	{
		protected p_states = new Map < Selection, Leafr.Boolean > ;

		public states( selection : Selection, initv ? : boolean )
		{
			if( ! this.p_states.has( selection ) )
			{
				this.p_states.set( selection, new Leafr.Boolean( this, initv ?? false ) );
			}

			return this.p_states.get( selection );
		}
	}
}
