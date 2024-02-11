import { Exist, Leafr } from "../model/index.js";
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

	export type Text = string | number | boolean | bigint | null | undefined | Leafr < any > ;

	/** class Each */

	export class Each < V >
	{
		constructor
		(
			public create ? : ( value : V ) => Node,
			public source ? : Array < V >	
		)
		{}

		public force ? ( value : V ) : void ;
	}

	export type Part = Node | Each < any > ;


	/** type Acts */


	export type Acts =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : Act < GlobalEventHandlersEventMap [ name ] > ;
	}	

	export type Act < Ev extends Event = any > = ( ev : Ev ) => void ;

	
	/** type Style */

	
	/** type Attrs */

	export type Attrs <  E extends gE = gE  > =
	(
		{ [ name in keyof E ] ? : Text; } |
		{ [ name : string ] : Text }
	);

	/** type Class */

	export type Class = string;

	
	/** type EChar */

	export type EChar < E extends gE = any > =
	{
		exist ? : Exist,
		class ? : Class ;
		attrs ? : Attrs < E > ;
		props ? : Attrs < E > ;
		acts ? : Acts ;
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
						( first instanceof Each ) ||
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

	export type Node = Element | Text ;
}
