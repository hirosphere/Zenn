import { Leaf, log } from "../meh/index.js";

export class HSL
{
	constructor( i : HSL.value )
	{
		this.hue = new Leaf( i.hue, this );
		this.sat = new Leaf( i.sat, this );
		this.light = new Leaf( i.light, this );
	}

	public readonly hue;
	public readonly sat;
	public readonly light;

	public update() : void
	{
		log( "HSL", this.value );
	}

	public get value() : HSL.value
	{
		return null ||
		{
			hue: this.hue.value,
			sat: this.sat.value,
			light: this.light.value
		};
	}

	public term()
	{
		;
	}
}

export namespace HSL
{
	export type value =
	{
		hue : number ;
		sat : number ;
		light : number ;
	};
}
