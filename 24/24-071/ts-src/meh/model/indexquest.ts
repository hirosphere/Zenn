import { Exist, Leafr, Leaf, ef, root } from "../../meh/index.js";

const log = console.log;

/*
	class Marker

	任意のExistとMarkを関連付けて管理。

	Existオブジェクトを selected : number や order : number などの属性で修飾する。

	Markインスタンスのライフを把握し、marks Mapオブジェクトに反映する。 

*/

abstract class Marker < SOURCE extends Exist, STATE > extends Exist
{
	protected marks = new Map < SOURCE, Mark < SOURCE, STATE > >;

	public get_mark( source : SOURCE, init_v ? : STATE ) : Mark < SOURCE, STATE >
	{
		const mark = this.marks.get( source ) ?? new Mark < SOURCE, STATE > ( this, init_v ?? this.default_state, source );
		this.marks.set( source, mark );
		return mark;
	}

	protected new_mark( source : SOURCE, init_v : STATE )
	{
		return new Mark < SOURCE, STATE > ( this, init_v, source );
	}

	protected abstract readonly default_state : STATE;
}


/*
	class Mark

	Leafを基底クラスとし、source プロパティーにてsourceをvalue値で修飾するクラス。

	class Marker を存在コンテナとし、生去をコンテナに通知。

	インスタンスのライフは、sourceに同期。

*/

class Mark < Source extends Exist, State > extends Leaf < State >
{
	constructor( con : Exist, init_v : State, public readonly source : Source )
	{
		super( con, init_v );
	}
}

class Selector < Source extends Exist, I extends Mark < Exist, boolean > = Mark < Source, boolean > > extends Marker < Source, boolean >
{
	public readonly current = new Leaf < I | null > ( this, null, ( n, o ) => this.curchange( n, o ) );

	protected curchange( n : I | null, o ? : I | null )
	{
		o?.set( false );
		n?.set( true );
	}

	protected override default_state = false;
}


namespace um
{

	export class App extends Exist
	{
		// list;

		public station_sel = new Selector < Station > ( this ); 
		public station_hov = new Selector < Station > ( this ); 

		constructor()
		{
			super( root );
			// this.list = new Renn < Leaf < string > > ();
			// this.list.new_items( Leaf.from_values( [ "錦糸町", "亀戸", "平井" ] ) );
		}
	}

	export class Station extends Exist
	{
		name = new Leaf.String( this, "" );
	}
}

namespace ui
{
	export const Item = ( app : um.App, station : um.Station ) =>
	{
		const selected = app.station_sel.get_mark( station );
		const hovered = app.station_hov.get_mark( station );

		return ef.section
		(
			{
				class: [ "station", { selected, hovered } ],
				acts:
				{
					mouseover: () => hovered.value = true,
					mouseout: () => hovered.value = false,
				},
			},
			ef.h1( station.name ),
			ef.button( { acts: { click() { selected.value = true } } }, "選択" ),
		);
	};
}

