import { Exist, Leaf, Renn, Order, dom, ef, each, root, log } from "../meh/index.js";
import { EQDrop } from "./jma-eq-son.js";
import cache from "./jma-eq-cache.js";

namespace UM
{
	export class App extends Exist
	{
		list = new EQList( this );
	}

	class EQList extends Renn < EQItem >
	{
		itemmap = new Map < string, EQItem >;

		json = new Leaf.String( this, "JSON" );
		list = new Leaf.String( this, "リスト" );
		tl = new Leaf.String( this, "timeline" );

		eid_map = new Map < string, any >;

		constructor( compos : Exist )
		{
			super( compos );
			// this.setsrcv( cache as eq [] );
		}

		async load()
		{
			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status == 200 )
			{
				const data = await res.json();
				this.setsrcv( data );
			}

		}

		async setsrcv( srcv : eq [] )
		{
			this.clear();

			const list = srcv.map( ( i : any, n : number ) =>
			[
				String( n + 1 ),
				i.at.slice( 0, 19 ).replace( "T", " " ),
				i.anm,
				i.mag,
				i.maxi,
				i.cod
			]
			.join( "\t" ) ).join( "\n" );
			
			this.list.value = list;

			const eqlist : Record < eid, eq > = {};
			const start = new Date().getTime() - ( 32 * 24 * 60 * 60 * 1000 );

			srcv.forEach
			(
				eq =>
				{
					delete eq.int;
					const x = eqlist[ eq.eid ];
					if( ! x || eq.ctt > x?.ctt )
					{
						const date = new Date( eq.at );
						eq.date = date.toLocaleString().slice( 0, -3 );
						eq.time = ( date.getTime() - start ) / ( 24 * 60 * 60 * 1000 );
						eqlist[ eq.eid ] = eq;
					}
				}
			);

			this.tl.value = Object.values( eqlist ).map( i => [ i.time, i.date, i.mag, i.anm, i.cod, ].join( "  \t" ) ).join( "\n" );


			// this.json.value = JSON.stringify( srcv, null, "\t" );
			this.json.value = JSON.stringify( eqlist, null, "    " );
		}

		override clear()
		{
			this.json.value = "";
			this.list.value = "";
			this.tl.value = "";

			super.clear();
		}

		clear_json() { this.json.value = ""; }

	}

	type eid = string ;
	type ctt = string ;

	type eq =
	{
	    "ctt" : ctt ;	//	"20240427061406",
		"eid" : eid ;	//	"20240427061009",
		"rdt" : string ;	//	"2024-04-27T06:14:00+09:00",
		"ttl" : string ;	//	"震源・震度情報",
		"ift" : string ;	//	"発表",
		"ser" : string ;	//	"1",
		"at" : string ; 	//	"2024-04-27T06:10:00+09:00",
		"anm" : string ;	//	"奄美大島近海",
		"acd" : string ;	//	"793",
		"cod" : string ;	//	"+28.4+129.0+0/",
		"mag" : string ;	//	"4.0",
		"maxi" : string ;	//	"3",
		"int" : any ;

		time ? : number ;
		date ? : string ;
	};

	class EQItem extends Exist
	{}
}

namespace UI
{
	export const App = ( um : UM.App ) =>
	{
		const drop = new EQDrop();

		return ef.article
		(
			ef.h1( "気象庁 地震リスト" ),
			ef.section
			(
				ef.button( { acts: { click() { um.list.load() } } }, "ロード" ),
				ef.button( { acts: { click() { drop.test() } } }, "son" ),
				ef.button( { acts: { click() { um.list.clear() } } }, "消去" ),
			),
			ef.section
			(
				// ta( um.list.list ),
				// ta( um.list.json ),
				ta( um.list.tl ),
			),
		);
	};

	const ta = ( value : Leaf.String ) => ef.textarea
	(
		{
			style:
			{
				width: "100%",
				height: "330px",
			},
			props: { value },
		}
	);
}

export const App = () => UI.App( new UM.App( root ) );
