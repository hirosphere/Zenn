import { root, model, dom, ef } from "../meh/index.js";
import * as HSL from "./hsl.js";
const log = console.log;

/**  */

export class VM extends model.Exist
{
	color = new HSL.Model( this, { hue: 95, sat: 0.7, light: 0.7 } );
	range = new HSL.VM( this, this.color );
}

const UI = ( vm : VM ) =>
{
	return ef.article
	(
		{ class: "app" },
	
		ef.h1( "HSL Quest" ),
		HSL.UI.HSLRange( vm.range )
	);
};

/** */

export const create = ( ce : string ) =>
{
	dom.create( root, UI( new VM( root ) ), ce );
}
