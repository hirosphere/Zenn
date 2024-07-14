import { Exist, Leaf, dom, ef, root, log } from "../../meh/index.js";

const ClockView = ( com : Exist ) =>
{
	const label = new Leaf.String( com, "---" );

	new Clock
	(
		com,
		( now ) =>
		{
			label.value = now.toLocaleString();
		}
	);

	return ef.main
	(
		ef.h1( { style: { fontSize:"2.3rem" } },label )
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
