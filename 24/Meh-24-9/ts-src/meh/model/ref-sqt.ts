
type sv = string | sv [] ;
type node < sv = any > = { v : sv }
type arr = ( node | arr ) [] ;

function branch < T extends sv > ( v : T ) : node | arr
{
	if( v instanceof Array )
	{
		return v.map ( v => branch ( v ) ) ;
	}
	return { v } ;
}

const v : sv =
[
	"",
	[
		"",
		""
	]
] ;

branch ( v );
