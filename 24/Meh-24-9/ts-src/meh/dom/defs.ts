import { Leaf, lol, Renn } from "../model/index.js";
import * as nodet from "./nodet.js";

export namespace defs
{
	export type primitive = string | number | boolean ;
	export type leaf = Leaf.str | Leaf.num | Leaf.bool ;
	export type text = primitive | leaf ;

	export type acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type act < Ev extends Event = any > = ( ev : Ev ) => void ;


	export type attrs < E extends Element > =
	{
		[ name in keyof E ] ? : lol < E [ name ] > ;
	};

	export type style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : lol.str ;
	};

	export type class_switch = Record < string, lol.bool > ;

	export type class_spec = lol.str | class_switch | ( lol.str | class_switch ) [] ;

	export type ec < E extends Element > =
	{
		class ? : class_spec ;
		style ? : style ;
		attrs ? : attrs < E > ;
		props ? : attrs < E > ;
		acts ? : acts ;
		actActs ? : acts ;
	};

	export class Place
	{
		constructor(){}

		protected isplace : typeof isplace = isplace
	}

	const isplace = Symbol();

	export class Free extends Place
	{
		public set content ( content : node ) {}
	}

	export class Each < v = any > extends Place
	{
		constructor
		(
			public readonly source : Renn < any > ,
			public readonly create_node : ( value : v ) => node
		)
		{ super() }
	}

	export type node = nodet.Element | text | Node ;
	export type part = node | Place ;
	export type parts =  part [] ;
}

export const each = < v >
(
	source : Renn < v > ,
	create_node : ( value : v ) => defs.node
)
 : defs.Each < v > =>
(
	new defs.Each( source, create_node )
);

export const free = () => new defs.Free();
