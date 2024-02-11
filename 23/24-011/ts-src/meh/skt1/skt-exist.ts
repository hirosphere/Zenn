
export class Exist
{}

export namespace Exist
{
	export class Ref 
	{
		constructor( acts : Ref.Acts )
		{
			;
		}
	}

	export namespace Ref
	{
		export class Acts
		{
			new_source?(){}
		}
	}
}

export class Leaf extends Exist
{}

export namespace Leaf
{
	export class Ref 
	{
		constructor( acts : Ref.Acts )
		{
			;
		}
	}

	export namespace Ref
	{
		export class Acts extends Exist.Ref.Acts
		{
			new_value?(){}
		}
	}
}
