
type ls  = Item <
	{
		dom : Item <
		{

		}>
	}
>;

class Item < P extends { [ partname : string ] : Item < any > } >
{
	public get s() : boolean { return true; }
}

export const _ls =
{
	s: true,
	model:{
		s: true,
		exist:{
			s: true,
			life: { s: false },
			src: { s: false },
			ref: { s: false },
		},
	},
	dom: {
		s: true,
		nodet: { s: true,
			life: { s: true },
			val: { s: true },
			evh: { s: false },
		},
		parts: { s: false,
			reader: { s: false },
			each: { s: false },
		},
	}
};


//  //

type node =
	{ s : boolean ; }
	| { [ partname : string ] : node }
;

const rel = ( node : node, path : string [], com_state : boolean ) =>
{
	node.s &&= com_state;

	// console.log( "ls", path.join( "." ), node.s )

	for( const [ name, part ] of Object.entries( node ) )
	{
		if( typeof part == "boolean" ) continue;
		rel( part, [ ... path, name ], node.s && part.s );
	}
}

rel( _ls, [], true );