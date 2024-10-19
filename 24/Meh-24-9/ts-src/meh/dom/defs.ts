import { log } from "../common.js";
import { Leafr, lolr, Renn, Order } from "../model/index.js";
import * as nodet from "./nodet.js";

export namespace defs
{
	export type primitive = string | number | boolean | undefined ;
	export type leafr = Leafr < string > | Leafr < number > | Leafr < boolean > | Leafr < Order.pos > ;
	export type text = primitive | leafr ;

	export type acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type act < Ev extends Event = any > = ( ev : Ev ) => void ;

	export type binds =
	{
	}

	export type attrs < E extends Element > =
	{
		[ name in keyof E ] ? : lolr < E [ name ] > ;
	};

	export type style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : lolr < CSSStyleDeclaration [ name ] > ;
	};

	export type class_switch = Record < string, lolr.bool > ;

	export type class_spec =
	(
		lolr.str | class_switch | ( string | class_switch ) []
	);

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

		protected isplace : Symbol = isplace
	}

	const isplace = Symbol();

	export class Free extends Place
	{
		public set content ( content : node ) {}
	}

	export class Each < S = any > extends Place
	{
		constructor
		(
			public readonly source : Renn < any > ,
			public readonly create_node : ( order : Order < S > ) => node
		)
		{ super() }
	}

	export type node = nodet.Element | text | Node ;
	export type part = node | Place ;
	export type parts =  part [] ;
}

export const each = < S >
(
	source : Renn < S > ,
	create_node : ( order : Order < S > ) => defs.node
)
 : defs.Each < S > =>
(
	new defs.Each( source, create_node )
);

export const free = () => new defs.Free();
