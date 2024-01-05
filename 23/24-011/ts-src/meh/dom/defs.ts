import { LeafrRefFactory } from "../model/index.js";
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

	export type Text = string | number | boolean | bigint | LeafrRefFactory < any > ;

	/** class Each */

	export class Each < V >
	{
		constructor( create : CreateNode < V > )
		{}
	}

	type CreateNode < V > = ( value : V ) => Node;

	export type Part = Node | Each < any > ;

	export const isechar = ( part : Part | EChar ) => !
	(
		( part instanceof Element ) ||
		( part instanceof Each ) ||
		( part instanceof LeafrRefFactory )		
	);

	/** type Acts */

	
	/** type Style */

	
	/** type Attrs */

	export type Attrs < E extends gE = any > =
	{

	}
	| { [ name : string ] : Text };

	/** type Class */

	export type Class = string;

	
	/** type EChar */

	export type EChar < E extends gE = any > =
	{
		class ? : Class ;
		attrs ? : Attrs < E > ;
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
						( first instanceof LeafrRefFactory )
					)				
			)
			{
				this.echar = first;
				this.parts = remain;
			}
			else
			{
				first && remain && log( "defs.Element", [ first, ... remain ] );
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
