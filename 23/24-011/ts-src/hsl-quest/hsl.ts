import { Exist, Branch, Leafr, _setvalue, Leaf, ef } from "../meh/index.js";
import * as Range from "./ui-range.js";

type toargs < VS > = { [ name in keyof VS ] : VS [ name ] };

export type Values =
{
	hue : number ;
	sat : number ;
	light : number ;
};

export class Model extends Branch
{
	hue ; sat ; light ;

	constructor( owner : Exist.Container, a : toargs < Values > )
	{
		super( owner );

		this.hue = new Leaf.Number( this, a.hue );
		this.sat = new Leaf.Number( this, a.sat );
		this.light = new Leaf.Number( this, a.light );

		this.update();
	}

	public readonly css = new Leafr.String( this, "" );

	public override update() : void
	{
		this.css[ _setvalue ]( `hsl( ${ this.hue.v }, ${ this.sat.v * 100 }%, ${ this.light.v * 100 }% )` );
	}
}


const tol = ( v : number ) => String( v * 100 ).replace( /\.d/, "" );

export class VM extends Exist
{
	readonly hue ;
	readonly sat ;
	readonly light ;

	constructor( owner : Exist.Container, m : Model )
	{
		super( owner );

		this.hue = new Range.VM( this, { title: "Hue", value: m.hue, max: 360 } );
		this.sat = new Range.VM( this, { title: "Sat", value: m.sat, unit: "%", max: 1, step: 0.01, tol } );
		this.light = new Range.VM( this, { title: "Light", value: m.light, unit: "%", max: 1, step: 0.01, tol } );
	}
}

export namespace UI
{
	export const HSLRange = ( vm : VM ) =>
	{
		return ef.section
		(
			{ class: "hsl-range" },
	
			Range.UI( vm.hue ),
			Range.UI( vm.sat ),
			Range.UI( vm.light ),
		);
	};	
}
