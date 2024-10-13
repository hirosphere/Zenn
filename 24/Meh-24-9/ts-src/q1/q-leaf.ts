import { model, Leaf, Leafr, log } from "../meh/index.js";
import { _set_ } from "../meh/common.js";
import { HSL } from "./color.m.js";


export function main()
{
	console.log( "Surf Meh-24-9 q1" );

	const lf1 = new Leaf < string > ( "zz" );
	const r1 = new Leaf.Ref < string >;
	
	r1.on_value_change = ( new_v, old_v ) =>
	{
		log( new_v, old_v );
	};
	
	r1.src = lf1;
	lf1.value = "所沢";
	lf1.value = "入間市";
	lf1.value = "飯能";
	
	const fr = new Leafr < string > ( "和光市" );
	r1.src = fr;
	
	const col = new HSL( { hue: 0, sat: 0.6, light: 0.6 } );
	col.sat.value *= 1.1;

}

