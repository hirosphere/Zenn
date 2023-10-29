const log = console.log;

export interface Exist
{
	delete() : void ;
}

export namespace Exist
{
	interface Ref
	{
		source ? : Exist ;
		delete() : void ;
	}
}
