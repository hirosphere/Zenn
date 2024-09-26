import { defs } from "./defs.js";
import { Renn } from "../model/index.js";

export const each = < V = any >
(
	model : Renn < V >,
	create_node : ( value : V ) => defs.node,	
) =>
{
	;
}

export class Each < V = any >
{
	constructor
	(
		protected model : Model < V > ,
		protected create_node : ( value : V ) => defs.node ,
	)
	{
		if( model instanceof Array )
		{
			model.forEach
			(
				value => create_node( value )
			);
		}
	}
}

type Model < V > = Renn < V > | Array < V > ;
