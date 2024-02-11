import { Owner, Branch, ef, Leafr, Leaf, _setvalue } from "../meh/index.js";

type toargs < M > =
{
	[ name in keyof M ] ? : Leaf.LoL < M [ name ] > ;
};

type toleaf < M > =
{
	[ name in keyof M ] : Leaf < M [ name ] > ;
};

const mkleaf = < T > ( lol : Leaf.LoL < T >, owner : Owner ) =>
{
	return lol instanceof Leaf ? lol : new Leaf < T > ( owner, lol );
};



/**  */

export type Model =
{
	title : string ;
	value : number ;
	unit : string ;
	min : number ;
	max : number ;
	step : number ;
	tol : tol ;
};

type tol = ( value : number ) => string ;
const deftol = ( v : number ) => String( v );

export class VM extends Branch implements toleaf < Model >
{
	title ; value ; unit ; min ; max ; step ; tol;

	labelvalue = new  Leafr.String( this, "lvvvv" );

	constructor( owner : Owner, a : toargs < Model > )
	{
		super( owner );

		Leafr.make;
		Leaf.make;

		this.title = mkleaf( a.title ?? "", this );
		this.value = mkleaf( a.value ?? 0, this );
		this.unit = mkleaf( a.unit ?? "", this );
		this.min = mkleaf( a.min ?? 0, this );
		this.max = mkleaf( a.max ?? 100, this );
		this.step = mkleaf( a.step ?? 1, this );
		this.tol = Leaf.make( this, a.tol ?? deftol );

		this.update();
	}

	public override update() : void
	{
		this.labelvalue[ _setvalue ]( this.tol.val( this.value.val ) );
	}
}

export const UI = ( vm : VM ) =>
{
	const { value, min, max, step } = vm;

	const inputact = ( ev : Event ) =>
	{
		if( ! ( ev.target instanceof HTMLInputElement ) )  return;
		
		value.set( Number( ev.target.value ) );
	}

	return ef.section
	(
		{ class: "range" },

		ef.span( { class: "_title" }, vm.title ),
		ef.input
		(
			{
				class: "_input",
				attrs: { type: "range" },
				props: { value, min, max, step },
				acts: { input: inputact }
			}
		),
		ef.span
		(
			{ class: "_valueunit" },

			ef.span( { class: "_value" }, vm.labelvalue ),
			ef.span( { class: "_unit" }, vm.unit ),	
		)
	);
};
