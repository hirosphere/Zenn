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
		actActs ? : Actions ;
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
		actActs ? : Actions ;
		optActs ? : OptActions ;
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

	export type Part = Element | Text | ArrayParts;

	export const ap = < ITEM = any > ( source : Array < ITEM >, create : ( item : ITEM ) => Element | Text ) =>
	{
		return new ArrayParts( source, create );
	};

	export class ArrayParts < ITEM = any >
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
		boolean | number | string | ToString
	);
	
	//  //

	export const createElement = ( type : string, first ? : ElementChar | Part, ... rest : Part [] ) : Element =>
	{
		if( typeof first == "object" )
		{
			if( ! ( "isElement" in first || first instanceof ToString || first instanceof ArrayParts ) )  // ! isPart
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


// questplace //

{
	type sact = EventListener ;
	type oact = [ sact, AddEventListenerOptions ];

	type cact = sact | oact;
	type acts = { [ name in "a" | "b" | "c" ] ? : cact };

	const c1 : cact = () => {};
	const c2 : cact = [ () => {}, {} ];

	const as1 : acts = {};
	as1.a = () => {};
	as1.b = [ () => {}, { passive: false } ];

	const ae = ( e : Element | null, n : string, a : EventListener ) =>
	{
		e?.addEventListener( n, a );
	};

	ae( null, "", ( ev : Event ) => { ev.target } );
}