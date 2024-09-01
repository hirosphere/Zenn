


namespace use
{
	() =>
	{
		const { bro } = i;

		const root = new i.Index( "" );

		bro.setIndex( root );
	};
}

namespace i
{
	export class Browser
	{
		setIndex( index : Index ) {}
	}

	export const bro = new Browser();

	export class Index
	{
		constructor
		(
			public name : string ,
		){}
	}
}
