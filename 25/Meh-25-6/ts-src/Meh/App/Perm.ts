
const log = console.log ;

export class Perm
{
	constructor ( public readonly storage_key : string )
	{}

	public async read () : Promise < any >
	{
	}

	public async write ( data : any ) : Promise < boolean >
	{
		return true ;
	}
}

export namespace Perm
{

}
