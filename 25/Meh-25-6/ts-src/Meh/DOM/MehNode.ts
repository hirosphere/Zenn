import * as DD from "./DD.js" ;

export class MehNode
{
	protected bindValue ( value : DD.Primitive ) : void
	{
		;
	}
}

export class MehText extends MehNode
{
	constructor ( arg : DD.Primitive )
	{
		super () ;
		
		this.bindValue ( arg ) ;
	}
}

export class MehElement extends MehNode
{}
