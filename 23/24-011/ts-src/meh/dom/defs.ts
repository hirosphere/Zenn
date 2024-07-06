import { Exist, Leafr, Renn, Order } from "../model/index.js";
const log = console.log;

type gE = globalThis.Element;

export namespace defs
{
	/**
	 * type Node
	 * class Element < E >
	 * type EChar < E >
	 * type Class
	 * type Attrs < E >
	 * type Props < E >
	 * type Acts < E >
	 * type Part
	 * class Each
	 * type Text
	 */

	/** type Text */

	type ll < t > = t | Leafr < t > ;

	export type Text = ll < string > | ll < bigint > | ll < number > | ll < boolean > ;

	/** Part */

	export class PartsFragment
	{
		constructor( public items : Array < Part > ){}
		
		public add ? ( def : Node ) : void ;
	}

	export class RennEach < S extends Exist >
	{
		constructor
		(
			public source : Renn < S >,
			public create : ( order : Order < S > ) => Node,
		)
		{}

		public force ? ( value : S ) : void ;
	}

	export type Part = Node | RennEach < any > | undefined ;


	/** type Acts */


	export type Acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : Act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type Act < Ev extends Event = any > = ( ev : Ev ) => void ;

	
	/** type Style */

	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : Text ;
	};
	
	/** type Attrs */

	export type Attrs <  E extends gE = gE  > =
	(
		{ [ name in keyof E ] ? : Text ; } |
		{ [ name : string ] : Text ; }
	);

	/** type Class */

	export type ClassSwitch = Record < string, Leafr.LoL.Boolean > ;

	export type Class = string | ClassSwitch | Class [] ;

	
	/** type EChar */

	export type EChar < E extends gE = any > =
	{
		exist ? : Exist,
		class ? : Class ;
		attrs ? : Attrs < E > ;
		props ? : Attrs < E > ;
		acts ? : Acts ;
		style ? : Style ;
	};

	/** class Element */

	export class Element < E extends gE = any >
	{
		constructor
		(
			public ns : string,
			public type : string,
			first ? : EChar < E > | Part,
			remain ? : Part []
		)
		{
			if( first === undefined )  return;

			if
			(
					first instanceof Object
				&&
					!
					(
						( first instanceof Element ) ||
						( first instanceof RennEach ) ||
						( first instanceof Leafr )
					)				
			)
			{
				this.echar = first;
				this.parts = remain;
			}
			else
			{
				this.parts = first && ( remain && [ first, ... remain ] || [ first ] ) || undefined;
			}
		}

		public echar ? : EChar < E > ;
		public parts ? : defs.Part [] ;

		public terminate()
		{
			this.parts = undefined;
		}
	}
	
	/** type Node */

	export type Node = Element | Text;
}
