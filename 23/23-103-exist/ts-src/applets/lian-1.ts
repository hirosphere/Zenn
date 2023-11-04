import { leaf, Lian, ef, ap, } from "../meh/index.js";
const log = console.log;



class Lian1Model
{
	lian = Lian.create( lines.sobu );
	clicks = Lian.create();

	shuffle()
	{
		const a = arrnd( this.lian );
		const b = arrnd( this.lian );
		this.lian.swap( a, b );
	}
}



const arrnd = ( ar : Array < any > ) => Math.floor( Math.random() * ar.length );

const lines =
{
	sobu: ["三鷹","吉祥寺","西荻窪","荻窪","阿佐ケ谷","高円寺","中野","東中野","大久保","新宿","代々木","千駄ケ谷","信濃町","四ツ谷","市ヶ谷","飯田橋","水道橋","御茶ノ水","秋葉原","浅草橋","両国","錦糸町","亀戸","平井","新小岩","小岩","市川","本八幡","下総中山","西船橋","船橋","東船橋","津田沼","幕張本郷","幕張","新検見川","稲毛","西千葉","千葉"],
}

export const Lian1Applet = ( model : Lian1Model = new Lian1Model ) =>
{
	const { div, h2, h3, span, button } = ef;

	div( { attrs: {  } } );

	return div( { class: "applet lian-1" },
		h2( "Lian-1 Applet" ),
		div ( { class: "applet-body " },
			div( { class: "cols-3" },
				h3( "総武線" ),
				div( button( { acts: { click(){ model.shuffle(); } } }, "シャッフル" ) ),
				div( { class: "stations" },
					ap
					(
						model.lian,
						i => button( { acts: { mouseover: () => model.clicks.add( i.value, 0 ) } }, i )
					),
				),
			),
			div( { class: "cols-3" },
				h3( "クリック履歴" ),
				div( button( { acts: { click(){ model.clicks.clear(); } } }, "消去" ) ),
				div( { class: "stations" },
					ap( model.clicks,
						i => button( { acts: { mouseleave(){ i.remove(); } } },
							i.order.strconv( v => v + 1 + "" ), " ", i
						)
					),
					"あいうえお",
				),
			),
		),
	);
}

export const Lian1 = { Model: Lian1Model, UI: Lian1Applet };
