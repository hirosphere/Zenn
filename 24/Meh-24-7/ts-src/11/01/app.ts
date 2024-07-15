import { Exist, Leaf, dom, ef, Browser, root, log } from "../../meh/index.js";
import { Eval } from "./eval.js";

const browser = new Browser( root, { title: "24-11-01 ." } );

const ClockView = ( com : Exist ) =>
{
	const self = new Exist( com );

	const label = new Leaf.String( com, "---" );

	new Clock
	(
		self,
		( now ) =>
		{
			label.value = now.toLocaleString();
		}
	);

	return ef.main
	(
		{
			style:
			{
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
			}
		},

		ef.h1( { style: {  } },label ),
		Eval( self ),
	);
};

class Clock extends Exist
{
	protected timeout : number = 0;

	constructor( com : Exist, protected update : ( now : Date ) => void )
	{
		super( com );
		this.next();
	}

	protected next()
	{
		if( this.timeout ) return;

		const now = new Date();
		const msec = now.getTime() % 1000;
		const next = 1000 - msec;

		this.timeout = setTimeout
		(
			() =>
			{
				clearTimeout( this.timeout );
				this.timeout = 0;
				this.next();
			},
			next
		);

		this.update( now );
		
		// log( "Clock", this.timeout, msec, next );
	}

	public override terminate(): void
	{
		if( this.timeout ) clearTimeout( this.timeout );
		super.terminate();
	}
}

dom.create( root, ClockView( root ), "body" );
