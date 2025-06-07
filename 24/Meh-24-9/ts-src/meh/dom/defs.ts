import { log } from "../common.js";
import { leaf , Renn , Order } from "../model/index.js";
import * as nodet from "./meh-node.js";

export namespace defs
{
	export type El = HTMLElement | SVGElement ;

	export type primitive = string | number | boolean | undefined ;
	export type reactive = leaf.r.str | leaf.r.num | leaf.r.bool | leaf.r.ll < Order.value > ;
	export type text = primitive | reactive ;

	export type acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type act < Ev extends Event = any > = ( ev : Ev ) => void ;

	export type binds =
	{
		value_input ? : leaf.str ;
		value_change ? : leaf.str ;
		checked ? : leaf.bool ;
	}

	export type attrs < E extends Element > =
	{
		[ name in keyof E ] ? : leaf.r.ll < E [ name ] > ;
	};

	export type style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : leaf.r.ll < CSSStyleDeclaration [ name ] > ;
	};

	export type class_switch = Record < string, leaf.r.ll < boolean > > ;

	export type class_spec =
	(
		string | class_switch | leaf.r.str | ( string | class_switch ) []
	);

	export type hook < E extends El = El > =
	{
		el ? : El ;
		init ? ( el : Element ) : void ;
		term ? ( el : Element ) : void ;
	};

	export type shadow =
	{
		mode ? : "open" | "closed" ;
		css ? : string | CSSStyleSheet | ( string | CSSStyleSheet ) [] ;
	}

	export type focus =
	{
		state ? : leaf.bool ;
	}

	export type ec < E extends El > =
	{
		hook ? : hook < E > ;
		class ? : class_spec ;
		style ? : style ;
		attrs ? : attrs < E > ;
		props ? : attrs < E > ;
		binds ? : binds ;
		action ? : acts ;
		shadow ? : shadow ;
		focus ? : focus ;
		aa ? : acts ;
	};

	//  //

	export class Place
	{
		constructor(){}

		protected isplace : Symbol = isplace ;
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
			public readonly selector : leaf.r.ll < K > ,
			public readonly items : [ K , defs.element ] [] | ( ( key : K ) => defs.element | undefined ) ,
			public readonly pre ? : K []

		)
		{ super() ;}
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

	

	export type element = nodet.MehElement ;
	export type node = nodet.MehElement | text ;
	export type part = node | Place ;
	export type parts =  part [] ;
}


export abstract class place
{
	public static each < S >
	(
		source : Renn < S > ,
		create_node : ( order : Order < S > ) => defs.node
	)
	 : defs.Each < S >
	{
		return new defs.Each( source, create_node )
	}

	public static switch < K >
	(
		sel : leaf.r.ll < K > ,
		items : [ K , defs.element ] [] | ( ( key : K ) => defs.element | undefined ) ,
		pre ? : K [] 
	)
	{
		return new defs.Switch < K > ( sel , items , pre ) ;
	}
}

export const pl = place ;
export const each = place.each ;
export const sw = place.switch ;

export const free = () => new defs.Free();
