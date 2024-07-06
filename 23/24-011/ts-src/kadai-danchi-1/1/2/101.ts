import { Exist, Leaf, root } from "../../../meh/index.js";

class SelItem < SRC, STAT extends string > extends Exist
{
	constructor( con : Exist, protected source : SRC )
	{
		super( con );
	}

	protected _states = new Map < STAT, Leaf.Boolean >;

	public state( name : STAT ) : Leaf.Boolean | undefined
	{
		if( ! this._states.has( name ) )
		{
			this._states.set( name, new Leaf.Boolean( this, false ) );
		}

		return this._states.get( name );
	}
}

const mod = new SelItem < object, "selected" | "hovered" > ( root, {} );

mod.state( "selected" )?.set( true );
