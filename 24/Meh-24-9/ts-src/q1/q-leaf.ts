import { model, Leaf, leaf, Leafr, leafr, log } from "../meh/index.js";
import { _set_value_ } from "../meh/common.js";
import { HSL } from "./color.m.js";


export function main()
{
	console.log( "Surf Meh-24-9 q1" );

	const lf1 = leaf < string > ( "zz" );
	const r1 = new Leafr.Ref < string >
	(
		lf1,
		( new_v, old_v ) =>
		{
			log( new_v, old_v );
		}
	);
	
	lf1.value = "所沢";
	lf1.value = "入間市";
	lf1.value = "飯能";
	
	const fr = leafr.str ( "和光市" );
	
	const col = new HSL( { hue: 0, sat: 0.6, light: 0.6 } );
	col.sat.value *= 1.1;

}

