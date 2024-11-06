import { log } from "../common.js";
import { Leafr , leaf , Renn, Position } from "../model/index.js";
import * as nodet from "./node.js";

export namespace defs
{
	export type El = HTMLElement | SVGElement ;

	type lolr < V > = V | Leafr < V > ;

	export type primitive = string | number | boolean | undefined ;
	export type leafr = Leafr.str | Leafr.num | Leafr.bool | lolr < Position.value > ;
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

	export type class_switch = Record < string, lolr < boolean > > ;

	export type class_spec =
	(
		string | class_switch | Leafr.str | ( string | class_switch ) []
	);

	export type ec < E extends Element > =
	{
		class ? : class_spec ;
		style ? : style ;
		attrs ? : attrs < E > ;
		props ? : attrs < E > ;
		acts ? : acts ;
		active_acts ? : acts ;
	};

	//  //

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

	export class Switch < K > extends Place
	{
		constructor
		(
			public readonly selector : leaf.types.lol < K | undefined > ,
			public readonly items : [ K , defs.element ] [] | ( ( key : K ) => defs.element ) ,
			public readonly pre ? : K []

		)
		{ super() ;}
	}

	export class Each < S = any > extends Place
	{
		constructor
		(
			public readonly source : Renn < any > ,
			public readonly create_node : ( order : Position < S > ) => node
		)
		{ super() }
	}

	export type element = nodet.MehElement ;
	export type node = nodet.MehElement | text ;
	export type part = node | Place ;
	export type parts =  part [] ;
}

export abstract class place
{
	public static each = < S >
	(
		source : Renn < S > ,
		create_node : ( order : Position < S > ) => defs.node
	)
	 : defs.Each < S > =>
	(
		new defs.Each( source, create_node )
	);

	public static switch < K >
	(
		sel : leaf.types.lol < K | undefined > ,
		items : [ K , defs.element ] [] | ( ( key : K ) => defs.element ) ,
		pre ? : K [] 
	)
	{
		return new defs.Switch < K > ( sel , items , pre ) ;
	}
}

export const pl = place ;
export const each = place.each ;

export const free = () => new defs.Free();
