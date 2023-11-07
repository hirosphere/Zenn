import { Leaf } from "./leaf.js";

// Selector //

export class Selector < Value extends {} >
{
	protected readonly current = new Leaf < Selector.ItemBase < Value > | null > ( null );

	constructor()
	{
		this.current.ref( ( newitem, olditem ) => this.update( newitem, olditem ) );
	}

	protected update( newitem : Selector.ItemBase < Value > | null, olditem ? : Selector.ItemBase < Value > | null )
	{
		if( olditem ) olditem.selected.value = false;
		if( newitem ) newitem.selected.value = true;
	}
}

export namespace Selector
{
	export interface Item < Value >
	{
		readonly selected : Leaf.Boolean ;
		get value() : Value ;
	}

	export class ItemBase < Value > implements Item < Value >
	{
		constructor( public readonly _value : Value ) {}

		public readonly selected = new Leaf.Boolean( false );
		get value() : Value { return this._value; }
	}
}
