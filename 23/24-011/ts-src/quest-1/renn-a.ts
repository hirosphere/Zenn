import { Exist, Leaf, Renn, Order, ef, each, log } from "../meh/index.js";



export function RennA( um : RennA.Model )
{
	return ef.article
	(
		{  },

		ef.h1( "Renn A" ),
		ef.section
		(
		//	ef.button( { acts: { click: () => um.renn.new_orders( [ "平井" ] ) } }, "追加" ),
		//	ef.button( { acts: { click: () => ins( mo.renn , [ "新小岩", "小岩" ] ) } }, "追加" ),
		//	ef.button( { acts: { click: () => ins( mo.renn, [ "水道橋", "御茶ノ水" ], 0 ) } }, "追加" ),
		//	ef.button( { acts: { click: () => ins( mo.renn, [ "西船橋", "津田沼" ], 10 ) } }, "追加" ),
		//	ef.button( { acts: { click: () => mo.renn.clear() } }, "消去" ),
		),
		ef.section
		(
			ef.ul
			(
				{
					style: { overflowX: "auto" }
				},
				",,,", each( um.renn, o => RennA.Item( o ) ), " ... "
			),
		),
	);
}

export namespace RennA
{
	const sources = ( com : Exist ) =>
	[
		"秋葉原", "浅草橋", "両国", "錦糸町", "亀戸",
	]
	.map( v => new Leaf.String( com, v ) );

	export class Model extends Exist
	{

		renn = new Renn < Leaf.String > ( this, sources( this ) );
	}
	
	export function Item( um : Order < Leaf.String > )
	{
		return ef.li
		(
			{ style: { display: "grid", gap: "1ex", gridTemplateColumns: "12em 3fr" } },
			ef.span
			(
				// um.conv( v => v + 1 ), " - ", um.source,
				um, " ",
				ef.sub( um.runiq ), " - ", 
				um.source,
			),
			Ctrl( um ),
		);
	}

	function Ctrl( um : Order < Leaf.String > )
	{
		function keydown( ev : KeyboardEvent )
		{
			log( ev.key );
			switch( ev.key )
			{
				case "x": um.delete() ;  break ;
			}
		}

		return ef.a
		(
			{
				attrs:
				{
					href: "javascript: void(0)",
				},

				style:
				{
					cursor: "default",
					display: "flex",
					padding: "0 1ex",
					gap: "1ex",
					border: "0px solid hsl( 45, 3%, 50% )"
				},

				acts:
				{
					keydown
				}
			},
			Cmd( "p", () => 0 ),
			Cmd( "n", () => um.move( um.value - 1 ) ),
			Cmd( "x", () => um.delete() ),
		);
	}

	function Cmd( ch : string, act : () => void )
	{
		return ef.span
		(
			{
				acts: { click: act },
			},
			ch
		);
	}
}
