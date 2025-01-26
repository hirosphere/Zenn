import { log } from "../common.js" ;
import { leaf , set_value } from "../model/index.js" ;

export namespace types
{
	export type player =
	{
		tempo : number ;
		state : boolean ;
		current_time : number ;
		rendering_rate : number ;
		delay : number ;
	}
}

export class Player
{
	public readonly tempo : leaf.num ;
	public readonly current : leaf.num ;
	public readonly state : leaf.r.bool ;

	constructor ( i : Partial < types.player > )
	{
		this.tempo = leaf ( i.tempo ?? 120 ) ;
		this.current = leaf ( i.current_time ?? 0 ) ;
		this.state = leaf.r ( i.state ?? false ) ;
	}

	public start () {}

	public stop () {}

	protected render ( current : number , length : number )
	{
		;
	}
}
