import { Leaf, StringSource } from "../model/leaf.js";
import { Hook } from "./nodette.js";

type gE = globalThis.Element;

export namespace defs
{
	export type CreateElement < E extends gE > = ( first ? : ElementChar < E > | Part, ... rest : Part [] ) => Element ;

	export type Node = Element | Text ;

	export type Element < E extends gE = gE > =
	{
		ns : string ;
		type : string ;

		class ? : Class ;
		props ? : Props < E > ;
		attrs ? : Attrs < E > ;
		style ? : Style ;
		acts ? : Actions ;
		actActs ? : Actions ;
		optActs ? : OptActions ;
		hook ? : Hook ;

		parts ? : Parts ;		// "childNodes"
		isElement : true ;	// ElementChar とのユニオンやその他の識別のため。
	};

	type ElementChar < E extends gE = gE > =
	{
		class ? : Class ;
		props ? : Props < E > ;
		attrs ? : Attrs < E > ;
		style ? : Style ;
		acts ? : Actions ;
		actActs ? : Actions ;
		optActs ? : OptActions ;
		hook ? : Hook < E > ;
	}

	export type Class = Text | ClassSwitch | Class[];
	
	type ClassSwitch =
	{
		[ name : string ] : boolean | Leaf.Boolean
	};

	//  //
	
	export type Props < E > =
	{
		[ name : string ] : Text ;
	};

	type PropT < T > = T extends string ? Text : T | Leaf < T >;

	//  //
	
	export type Attrs < E = gE > =
	{
		[ name : string ] : Text ;
	};
	
	//  //

	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : Text ;
	};
	
	//  //

	export type OptActions =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : OptAction < GlobalEventHandlersEventMap [ name ] > ;
	}
	export type OptAction < Ev extends Event = Event > = [ ( ev : Ev ) => void, AddEventListenerOptions ] ;


	export type Actions =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
	}
	export type Action < Ev extends Event = Event > = ( ev : Ev ) => void ;
	

	//  //

	export type Parts = Part [];
	export type Part = Element | Text | ArrayParts < any > | null | undefined;

	export const ap = < ITEM > ( source : Array < ITEM >, create : ( item : ITEM ) => Element | Text ) =>
	{
		return new ArrayParts( source, create );
	};

	export const each = ap;

	export class ArrayParts < ITEM >
	{
		constructor
		(
			public source : Array < ITEM > ,
			public create : ( item : ITEM ) => Element | Text
		){}
	}

	//  //

	export type Text =
	(
		boolean | number | string | StringSource
	);
	
	//  //

	export const createElement = ( ns : string, type : string, first ? : ElementChar | Part, ... rest : Part [] ) : Element =>
	{
		if( first && typeof first == "object" )
		{
			if( ! ( "isElement" in first || first instanceof StringSource || first instanceof ArrayParts ) )  // ! isPart
			{
				return {
					isElement: true,
					ns, type,
					... first,
					parts: rest
				};
			}
		}

		return {
			isElement: true,
			ns, type,
			parts: first ? [ first, ...rest ] : undefined
		};
	}	
}

export const ap = defs.ap;
export const each = defs.each;
