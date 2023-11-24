import { Owner, Exist, root, Leaf, Branch, toLeaf } from "../meh/index.js";
import { dom } from "../meh/index.js";

const log = console.log;

export const main = () =>
{
	branch2.quest();

	// leaf1();
	// exist1();
};

namespace branch2
{
	export const quest = () =>
	{
		const hsl = new HSLBranch( root );

		hsl.value = { hue: 90, sat: 0.5, light: 0.1 };
	};

	type HSL = { hue : number ;  sat : number ;  light : number ; };

	class HSLBranch extends Branch implements toLeaf < HSL >
	{
		public hue;
		public sat;
		public light;

		public css = new Leaf.String( this, "" );

		constructor( owner : Owner, initv : HSL = { hue: 9, sat: 0.8, light: 0.9 } )
		{
			super( owner );
			this.hue = new Leaf.Number( this, initv.hue );
			this.sat = new Leaf.Number( this, initv.sat );
			this.light = new Leaf.Number( this, initv.light );

			this.update();
		}

		public set value( newv : HSL )
		{
			this.hue.set( newv.hue, this );
			this.sat.set( newv.sat, this );
			this.light.set( newv.light, this );
			this.update();
		}

		public update()
		{
			const css = `hsl( ${ this.hue.v }, ${ this.sat.v * 100 }%, ${ this.light.v * 100 }% )`;
			this.css.v = css;
			log( "HSL update", css );
		}
	}
}


namespace branch1
{
	export const quest = () =>
	{
		const hsl = new HSLBranch( root );

		hsl.hue.v = 60;
		hsl.sat.v = 0.8;
		hsl.light.v = 0.9;
	};

	type HSL = { hue : number ;  sat : number ;  light : number ; };

	class HSLBranch extends Branch
	{
		public hue;
		public sat;
		public light;

		constructor( owner : Owner )
		{
			super( owner );
			this.hue = new Leaf.Number( this, 0 );
			this.sat = new Leaf.Number( this, 0 );
			this.light = new Leaf.Number( this, 0 );
		}

		public update()
		{
			log( "HSL update" );
		}
	}
}


const leaf1 = () =>
{
	const branch = new Exist( root );
	const leaf1 = new Leaf.String( branch, "埼京線" );
	const leaf2 = new Leaf.String( branch, "川越線" );
	const ref1 = new Leaf.String.Ref();

	log( ref1.v );

	ref1.source = leaf2;
	ref1.v = "武蔵野線";
	ref1.v = "高崎線";
	ref1.v = "宇都宮線";

	log( ref1.v );

	branch.terminate();
};

const exist2 = () =>
{
	const exist1 = new Exist( root );
	const exist2 = new Exist( root );
	const ref1 = new Exist.Ref();

	ref1.source = exist1;
	ref1.source = exist2;
	ref1.source = undefined;

	const ref2 = new Exist.Ref();

	ref2.source = exist1;
	ref2.source = undefined;
	ref2.source = exist2;

	root.terminate();
};

const exist1 = () =>
{
	const exist1 = new Exist( root );
	const ref1 = new Exist.Ref();

	ref1.source = exist1;
	ref1.source = undefined;

	root.terminate();
};

