import { Leaf, ToStr } from "../model/leaf.js";
import { Lian } from "../model/lian.js";

type gE = globalThis.Element;

export namespace defs
{
	export type CreateElement < E > = ( first ? : Props < E > | Part, ... rest : Part [] ) => Element ;

	export type Element < E extends gE = gE > =
	{
		type : string ;			// "div" "p" などの「タグ名」
		props ? : Props < E > ;	// "id"  "href"  "value" などのプロパティー
		parts ? : Part [] ;		// "childNodes" と名づけるべきですが、好みで。
		isElement : true ;	// Props とのユニオンやその他の識別のため。
	};
	
	export type Props < E = {} > =
	{
		[ prop in keyof Omit< E, "style" > ] ? : PropT < E [ prop ] > ;
	}
	&
	{
		class ? : Class ;
		attrs ? : { [ name : string ] : Text } ;
		style ? : Style ;
	};
	
	type PropT < T > = T extends string ? Text : T | Leaf < T >;
	
	export type Class = string | Leaf.String | ToStr | ClassSwitch | Class[];
	
	type ClassSwitch =
	{
		[ name : string ] : boolean | Leaf.Boolean
	};
	
	export type Attrs =
	{
		[ name : string ] : Attr ;
	};
	export type Attr = string | Leaf.String | ToStr;
	
	export type Style =
	{
		[ name in keyof CSSStyleDeclaration ] ? : StyleProp ;
	};
	export type StyleProp = string | Leaf.String | ToStr ;
	
	
	export type Part = Element | Text;

	interface LPB
	{
		source : Lian < any > ;
		create : ( item : any ) => void ;
	}

	class LP < T > implements LPB
	{
		source;
		create;

		constructor
		(
			source : Lian < T >,
			create : ( item : T ) => void
		)
		{
			this.source = source;
			this.create = create;
		}
	}

	const clp = < T > ( src : Lian < T >, create : ( item : T ) => void ) => new LP( src, create );

	const l = new Lian < string > ( ... [ "a", "b", "c" ] );

	const lp : LPB = new LP < string > ( l, ( v ) => console.log( "LP", v ) );
	
	lp.source.forEach( item => lp.create( item ) );

	export type Text =
	(
		boolean | number | string |
		Leaf.Boolean | Leaf.Number | Leaf.String |
		ToStr
	);
	
	//  //
	
	export const createElement = ( type : string, first ? : Props | Part, ... rest : Part [] ) : Element =>
	{
		if( typeof first == "object" )
		{
			if( ! ( "isElement" in first || first instanceof Leaf || first instanceof ToStr ) ) 
			{
				return {
					isElement: true,
					type,
					props: first,
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

type evs =
{
	[ name in keyof HTMLElementEventMap ] ? : ( ev : HTMLElementEventMap [ name ] ) => void ;
};

const x : evs = {};
x
