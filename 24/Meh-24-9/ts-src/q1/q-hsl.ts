import { leaf , dom , ef , navi , log } from "../meh/index.js" ;

export namespace sv
{
	export type range =
	{
		title : string ;
		value : number ;
	};
}

export namespace vm
{
	export class App
	{
		public range = new Range ( { title : "Hue" , value : 70 } ) ;
	}

	type toleaf < S extends {} > =
	{
		[ prop in keyof S ] : leaf < S [ prop ] > ;
	}

	export class Range implements toleaf < sv.range >
	{
		public title ;
		public value ;

		constructor ( v : sv.range )
		{
			this.title = leaf ( v.title ) ;
			this.value = leaf ( v.value ) ;
		}
	}
}

export namespace vc
{
	export const App = ( m : vm.App ) => ef.main
	(
		ef.h1 ( "HSL App" ) ,
		ef.section
		(
			{ class : "f-col" } ,
			Range ( m.range ) ,
		) ,
	);

	const Range = ( m : vm.Range ) => ef.section
	(
		{ class : "range" } ,
		
		ef.span ( { class : "-title" } , m.title ) ,
		range ( m.value ) ,
		ef.span ( m.value ) ,
	);

	const range = ( m : leaf.num ) => ef.input
	(
		{
			class : "-input" ,
			attrs : { type : "range" } ,
			props :
			{
				value : m ,
			} ,
			acts :
			{
				input ( ev )
				{
					if ( ev.target instanceof HTMLInputElement )
					{
						m.set ( Number ( ev.target.value ) ) ;
					}
				}
			}
		}
	) ;

}

export const main = () =>
{
	dom.add ( vc.App ( new vm.App ) , "body" ) ;
};

