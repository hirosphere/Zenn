import { Leaf } from "./leaf.js"; 
const log = console.log;

export interface Exist
{
	delete() : void ;
}

export namespace Exist
{
	interface Ref
	{
		source ? : Exist ;
		delete() : void ;
	}
}

export interface Orderable
{
	readonly order : Leaf.Ro.Number ;
}

export interface Selectable
{
	readonly selected : Leaf.Ro.Boolean ;
}
