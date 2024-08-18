import { dom, ef } from "../../../meh/index.js";

type index =
{
	create ? : () => dom.defs.Node ;
	parts ? : { [ name : string ] : index } ;
};

const index : index =
{
	parts:
	{
		welcome: { create: () => "wolcome" },
		list:
		{
			create()
			{
				return ef.article( ef.h2( "リスト" ) );
			}
		}
	}
};
