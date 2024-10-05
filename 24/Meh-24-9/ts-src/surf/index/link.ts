import { Leaf, Renn, ef, each, dom, log } from "../../meh/index.js";

export const Block = ( m : ms.block ) =>
{
	return ef.section
	(
		{ class : "block" },
		ef.h2( m.title ),
		ef.ul
		(
			... m.parts.map ( i => ef.li( i.title ) ) ,
		),
	);
};

export namespace ms
{
	export type block =
	{
		title : string ;
		parts : item [] ;
	};

	export type item =
	{
		title : string ;
		url : string ;
	};
}
