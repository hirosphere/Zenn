import { leaf, Renn, ef, each, dom, log } from "../../meh/index.js";

export const Block = ( m : ms.block ) =>
{
	return ef.section
	(
		{ class : "block" },
		ef.h2( m.title ),
		ef.ul
		(
			... m.parts.map ( i => Item( i ) ) ,
		),
	);
};

// const Item = ( m : ms.item ) => <li><a target="blank" href="{ m.url }">{ m.title }</a></li>

const Item = ( m : ms.item ) =>
{
	return ef.li
	(
		ef.a
		(
			{
				attrs:
				{
					href: m.url,
					target: "_blank",
				}
			},
			m.title
		)
	);
}

const { li, a } = ef ;

const Item2 = ( m : ms.item ) => li( a( { attrs: { href: m.url, target: "_blank" } } ), m.title );

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
