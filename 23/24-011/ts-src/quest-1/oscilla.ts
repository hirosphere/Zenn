import { Exist, Leafr, Leaf, Branch, ef, each, root, log } from "../meh/index.js";


namespace docs
{
	export class App extends Exist
	{
		osc1 = Osc( this );
	}

	export const Osc = ( com : Exist ) =>
	{
		const self = new Exist( com );

		const update= () =>
		{
			rt.freq.value = Math.pow( 2, ( rt.pitch.value - 69 ) ) / 12;
		};

		const rt =
		{
			pitch: new Leaf.Number( self, 69, update ),
			freq: new Leaf.Number( self, 0 ),
		};

		return rt;
	};

}

namespace um
{
	export class App extends Exist
	{
		constructor( com : Exist )
		{
			super( com );

			const doc = new docs.App( this );

			this.pitch = new PitchRange
			(
				this,
				{
					title: "Pitch",
					value: doc.osc1.pitch,
					min: 0,
					max: 144,
					step: 0.01
				}
			);

			let o : undefined | {};
			o = { x : 1 }
			o = undefined;
		}

		pitch;
	}

	export interface iRange
	{
		title : Leaf.LoL.String;
		value : Leaf.LoL.Number;
		min ? : Leaf.LoL.Number;
		max ? : Leaf.LoL.Number;
		step ? : Leaf.LoL.Number;
	}

	export class Range extends Exist
	{
		constructor( com : Exist, props : iRange )
		{
			super( com );

			this.title = Leaf.make( this, props.title );
			this.value = Leaf.make( this, props.value );
			this.min = Leaf.make( this, props.min ?? 0 );
			this.max = Leaf.make( this, props.max ?? 100 );
			this.step = Leaf.make( this, props.step ?? 1 );
		}

		title;
		value;
		min;
		max;
		step;
		masure = new Leaf.Number( this, 0 );
	}

	export class PitchRange extends Range
	{
		constructor( com : Exist, props : iRange )
		{
			super( com, props );

			this.freq = Leaf.make( this, 0 );

			const new_value = ( v : number ) =>
			{
				this.freq.value = ptof( v );
			};

			new Leaf.Ref( this, { new_value }, this.value );
		}

		freq;
	}

	const ptof = ( pitch : number ) : number =>
	{
		return 440 * Math.pow( 2, ( pitch - 69 ) / 12 );
	};
}

namespace ui
{
	export const Range = ( model : um.Range ) =>
	{
		const input = ( ev : Event ) =>
		{
			if( ! ( ev.target instanceof HTMLInputElement ) ) return;

			model.value.set( Number( ev.target.value ) );
		};

		return ef.div
		(
			{ style: { display: "grid" } },

			ef.span( { style: { grid: "4em" } }, model.title ),
			ef.input
			(
				{
					attrs: { type: "range" },
					props:
					{
						value: model.value,
						min: model.min,
						max: model.max,
						step: model.step
					},
					acts: { input }
				}
			),
			ef.span( model.value ),
		);
	}

	export const PitchRel = ( um : um.PitchRange ) =>
	{
		return ef.section
		(
			ef.p( um.freq ),
		);
	};
}

export const Oscilla = () =>
{
	const model = new um.App( root )

	return ef.article
	(
		ef.h1( "Oscilla" ),
		ui.Range( model.pitch ),
		ui.PitchRel( model.pitch ),
	);
}
