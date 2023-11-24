import { Owner, Exist, root, Leaf, Branch, toLeaf } from "../meh/index.js";
import { dom, defs } from "../meh/index.js";

const log = console.log;

export const main = () =>
{
	// dom1();
	dom2();
};



const dom2 = () =>
{
	const def : dom.defs.ElementCharactoristics =
	{
	};

	dom.create( new dom.defs.Element( "p", def ), document.body );
	dom.create( "", document.body );
};



const dom1 = () =>
{
	const def : dom.defs.ElementCharactoristics < HTMLDivElement > =
	{
		attrs:
		{
			"tabIndex": 5,
			"clientLeft": 491,
			"z" : "",
			"mumu mu": "z"
		},
	};

	const ec : dom.defs.ElementCharactoristics < HTMLTextAreaElement > =
	{
		"attrs":
		{
			"tabIndex": 2,
			"value": "帰りは山手線",
			"data-npoco": "",
		}
	};
};

