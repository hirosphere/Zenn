import { Owner, Exist, root, Leaf, Branch, toLeaf, each } from "../meh/index.js";
import { dom, defs, ef } from "../meh/index.js";

const log = console.log;

const m = { a: Symbol() };
const o = { [ m.a ]: "aa" };
o[ m.a ] = "bb";

export const quest2 = ( ce : Element ) =>
{
	// dom1();
	// dom2( ce );

	const self = new Exist( root );

	ef1( self, ce );
};

const ef1 = ( owner : Owner, ce : Element ) =>
{
	const ex = new Exist( owner );
	const x : defs.Text = new Leaf.Boolean( owner, false );

	const def = ef.p( { attrs: { "eoria": "" } }, ... [ "First Factory", 1, 2, 3, true, false ].join( " - " ) );

	const a = ef.ul
	(	
		{ style: { display: "flex", flexDirection: "column", gap: "0px" } },

		ef.li( ef.button( { acts: { click() { owner.terminate(); } } }, "terminate()" ) ),
		ef.li( "一本でも" ),
		each( [ "苺", "人参", "サンダル", "ヨット" ], v => ef.li( v ) ),
		... Phases( owner, 30, 3 ),
	);

	dom.create( owner, ef.section( def, a, ef.p( {}, "一本でも", PhaseApp( ex ), ) ), ce );
};

class PhaseAppState extends Branch
{
	public update(): void {
		;
	}

	public readonly mode = new Leaf < "Hue" | "Light" > ( this, "Hue" );
}

const PhaseApp = ( com : Owner ) =>
{

	return ef.section(
		ef.h2( "PhaseApp" ),
	);
};

const Phase = ( owner : Owner, step : number, framerate : number ) =>
{
	const phase = new Leaf.Number( owner, 90 );
	const color = new Leaf.String( owner, "" );
	setInterval( () => { phase.v = ( phase.v + ( step / framerate ) ) % 360; update(); }, 1000 / framerate );

	const update = () =>
	{
		color.v = `hsl( ${ fr( phase.v, 3 ) }, 65%, 65% )`;
	};

	update();

	return ef.li(
		{ style: {
		"display": "grid", "gridTemplateColumns": "12ex 60ex 0ex",
			"fontSize": "14px", backgroundColor: color, padding: "1.0ex"
			}
		},
		ef.b( { style: { color: "hsl( 0, 0%, 96% )" } }, "Phase" ), " ",
		// ef.span( phase.sc( v => fr( v, 2 ) ) ), " ",
		// ef.span( phase.sc( v => "" ) ), " ",
		ef.span( { style: { fontSize: "14px", color: "white" } }, color )
	);
};

const Phases = ( owner : Owner, count : number, step : number ) =>
{
	return loop( count, i => Phase( owner, 8 + i * 0.3, 50 ) );
};

const loop = < I = any > ( count : number, fn : ( i : number ) => I ) : I[] =>
{
	const rt : I[] = [];
	for( let i = 0; i < count; i ++ ) rt[ i ] = fn( i );
	return rt;
};

class Timer extends Exist
{
	constructor( owner : Owner, update : () => void, rate : number )
	{
		super( owner );
		this.iid = setInterval( update, 1000 / rate );
		update();
	}

	protected iid ? : number;

	public override terminate(): void
	{
		this.iid && clearInterval( this.iid );
		super.terminate();
	}
}

const fr = ( n : number, f : number ) =>
{
	const s = Math.round( n * 10 ** f ).toString();
	return s.slice( 0, -f ) + "." + s.slice( -f );
};

const dom2 = ( ce : Element ) =>
{
	const char : dom.defs.EChar < HTMLParagraphElement > =
	{
		attrs: {  },
	};
	const parts =
	[
		"Paragraph Element", new defs.Element( "", "br", {}, [] ),
		each < string > ( [ "One", "Deux", "Tri", "Vier", "O", "Liu", "Nana" ], v => v + "です。" ),
		" --- ",
		"12345678"
	];


	// dom.createNodet( new dom.defs.Element( "", "p", char, parts ), ce );
	// dom.createNodet( "WoW Wow", ce );
};



const dom1 = () =>
{
	const def : dom.defs.EChar < HTMLDivElement > =
	{
		attrs:
		{
			"tabIndex": 5,
			"clientLeft": 491,
			"z" : "",
			"mumu mu": "z"
		},
	};

	const ec : dom.defs.EChar < HTMLTextAreaElement > =
	{
		"attrs":
		{
			"tabIndex": 2,
			"value": "帰りは山手線",
			"data-npoco": "",
		}
	};
};

