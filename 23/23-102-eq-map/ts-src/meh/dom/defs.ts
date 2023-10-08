import { Leaf, ToString } from "../model/leaf.js";
import { Lian } from "../model/lian.js";

type gE = globalThis.Element;

export namespace defs
{
	export type CreateElement < E > = ( first ? : ElementChar < E > | Part, ... rest : Part [] ) => Element ;

	export type Element < E extends gE = gE > =
	{
		type : string ;

		class ? : Class ;
		props ? : Props < E > ;
		attrs ? : Attrs < E > ;
		style ? : Style ;
		acts ? : Actions ;
		optActs ? : OptActions ;

		parts ? : Array < Part > ;		// "childNodes"
		isElement : true ;	// ElementChar とのユニオンやその他の識別のため。
	};

	type ElementChar < E = gE > =
	{
		class ? : Class ;
		props ? : Props < E > ;
		attrs ? : Attrs < E > ;
		style ? : Style ;
		acts ? : Actions ;
		optActs ? : OptActions ;
	}

	const e : Element = { isElement: true, type: "a" };

	
	export type Props < E > =
	{
		[ name : string ] : Text ;
	};

	
	type PropT < T > = T extends string ? Text : T | Leaf < T >;
	
	export type Class = Text | ClassSwitch | Class[];
	
	type ClassSwitch =
	{
		[ name : string ] : boolean | Leaf.Boolean
	};
	
	export type Attrs < E = gE > =
	{
		[ name : string ] : Text ;
	};
	

	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : Text ;
	};
	

	export type Actions =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : Action < GlobalEventHandlersEventMap [ name ] > ;
	}
	export type Action < Ev extends Event = Event > = ( ev : Ev ) => void ;
	

	export type OptActions =
	{
		[ name in keyof GlobalEventHandlersEventMap ] ? : OptAction < GlobalEventHandlersEventMap [ name ] > ;
	}
	export type OptAction < Ev extends Event = Event > = [ ( ev : Ev ) => void, AddEventListenerOptions ] ;
	

	export type Part = Element | Text;

	export type Text =
	(
		boolean | number | string | ToString
	);
	
	//  //

	export const createElement = ( type : string, first ? : ElementChar | Part, ... rest : Part [] ) : Element =>
	{
		if( typeof first == "object" )
		{
			if( ! ( "isElement" in first || first instanceof ToString ) )  // ! isPart
			{
				
				return {
					isElement: true,
					type,
					... first,
					parts: rest
				};
			}
		}
	
		return {
			isElement: true,
			type,
			parts: first ? [ first, ...rest ] : undefined
		};
	}	
}

