const log = console.log;


type client = ( msg : string, name : string ) => void ;

function item( name : string, state : boolean )
{
	return ( msg : string, client : client ) => client( name, msg );
}

const ls =
{
	$:item( "root", false ),
	
	model:
	{
		$:item( "model", false ),

		exist: { $:item( "exist", false ), },
		leaf : { $:item( "leaf", false ), },
	},

	dom:
	{
		$:item( "dom", false ),

		nodet:
		{
			$:item( "nodet", false ),
		},
		
		parts:
		{
			$:item( "parts", false ),
			reader: { $: item( "reader", false ) },
			each: { $: item( "each", false ) },
		},
	}
}


export default ls;

