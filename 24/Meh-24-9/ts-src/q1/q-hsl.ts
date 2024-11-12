import { leaf , dom , ef , navi , log } from "../meh/index.js" ;

/* static values */

export namespace sv
{
	export type hsl =
	{
		hue : number ;
		sat : number ;
		light : number ;
		alpha ? : number ;
	};

	export type index =
	{
		title : string ;
	}
}


/* doc models */

type toleaf < S extends {} > =
{
	[ prop in keyof S ] : leaf < S [ prop ] > ;
}

export namespace docm
{
	export class App
	{
		public readonly color_1 = new HSL ( { hue : 90 , sat : 0.6 , light : 0.6 } ) ;
	}

	export class HSL
	{
		public readonly hue ;
		public readonly sat ;
		public readonly light ;
		public readonly alpha ;

		public readonly css ;

		constructor ( v : sv.hsl )
		{
			this.hue = leaf.num ( v.hue , this ) ;
			this.sat = leaf.num ( v.sat , this ) ;
			this.light = leaf.num ( v.light , this ) ;
			this.alpha = leaf.num ( v.alpha ?? 1 , this ) ;

			this.css = leaf.str ( "" ) ;
			this.update () ;
		}

		public set value ( v : sv.hsl )
		{
			this.hue.set ( v.hue , this ) ;
			this.sat.set ( v.sat , this ) ;
			this.light.set ( v.light , this ) ;
			this.alpha.set ( v.alpha ?? 1 , this ) ;

			this.update () ;
		}

		public get value () : sv.hsl
		{
			const rt =
			{
				hue : this.hue.value ,
				sat : this.sat.value ,
				light : this.light.value ,
				alpha : this.alpha.value
			};

			return rt ;
		}

		public update ()
		{
			const { hue , sat , light , alpha = 1 } = this.value ;
			this.css.value = `hsl( ${ hue }, ${ sat * 100 }%, ${ light * 100 }%, ${ alpha * 100 }% )` ;
		}
	}
}


/* view models */

export namespace vm
{
	export class App
	{
		public readonly doc = new docm.App ;

		protected br = new navi.Browser < sv.index > ();
		public readonly color_1 = new  HSLRange ( this.doc.color_1 ) ;

		constructor()
		{
			this.br.make_title = i => i?.title ?? "..." ;

			this.br.set_current ( { title : "HSL App" } ) ;
		}
	}

	export class HSLRange
	{
		hue ;  sat ; light ; alpha ;

		constructor ( m : docm.HSL )
		{
			const p =
			{
				max : 1 ,
				step : 0.01 ,
				unit : "%" ,
				to_m : ( n : number ) => String ( Math.round ( n * 100 ) ) ,
			}

			this.hue = Range ( { title : "Hue" , value : m.hue , max : 360 } ) ;
			this.sat = Range ( { title : "Sat" , value : m.sat , ... p } ) ;
			this.light = Range ( { title : "Light" , value : m.light , ... p } ) ;
			this.alpha = Range ( { title : "Alpha" , value : m.alpha , ... p } ) ;
		}
	}

	export type Range =
	{
		title : leaf.ll.str ;
		value : leaf.num ;
		min : leaf.ll.num ;
		max : leaf.ll.num ;
		step : leaf.ll.num ;
		unit : leaf.ll.str ;
		to_m : ( v : number ) => string
	};

	const Range = ( m : Partial < Range > ) : Range =>
	{
		const
		{
			title = "" ,
			value = leaf ( 0 ),
			min = 0 ,
			max = 100 ,
			step = 1 ,
			unit = "" ,
			to_m = def_to_m
		} = m ;

		return { title , value , min , max , step , unit , to_m } ;
	}

	const def_to_m = ( v : number ) => String( v ) ;
}


/* view components */

export namespace vc
{
	export const App = ( m : vm.App ) => ef.main
	(
		ef.h1 ( "HSL App" ) ,
		ef.section
		(
			{ class : "f-col" } ,
			ef.section
			(
				{
					class : "color_display" ,
					style : { backgroundColor : m.doc.color_1.css } ,
				} ,
				m.doc.color_1.css ,
			) ,
			HSLARange ( m.color_1 ) ,
		) ,
	);

	const HSLARange = ( m : vm.HSLRange ) =>
	{
		return ef.section
		(
			Range ( m.hue ) ,
			Range ( m.sat ) ,
			Range ( m.light ) ,
			Range ( m.alpha ) ,
		);
	}

	const Range = ( m : vm.Range ) => ef.section
	(
		{ class : "range" } ,

		ef.span ( { class : "_name" } , m.title ) ,
		range ( m ) ,
		ef.span
		(
			{ class : "_value_unit" } ,
			ef.span ( { class : "_value" } , m.value.mk_str ( m.to_m ) ) ,
			ef.span ( { class : "_unit" } , m.unit )
		)
	);

	const range = ( m : vm.Range ) => ef.input
	(
		{
			class : "_input" ,
			attrs : { type : "range" } ,
			props :
			{
				step : leaf.mk_str ( m.step ) ,
				max : leaf.mk_str ( m.max ) ,
				value : m.value.mk_str () ,
			} ,
			acts :
			{
				input ( ev )
				{
					if ( ev.target instanceof HTMLInputElement )
					{
						m.value.set ( Number ( ev.target.value ) ) ;
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

