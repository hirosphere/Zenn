import { log } from "../common.js" ;
import { leaf , set_value } from "../model/index.js" ;

export namespace types
{
	export type player =
	{
		tempo ? : number ;
		state ? : boolean ;
		current_time ? : number ;
		frame_time ? : number ;
		delay ? : number ;
	}
}

export class Timeline
{
	public readonly frame_time : leaf.num ;
	public readonly tempo : leaf.num ;
	public readonly current : leaf.num ;
	public readonly state : leaf.r.bool ;
	public readonly offset : leaf.r.num = leaf ( 0 ) ;

	protected currenttime = 0 ;

	public readonly resolution = 960 ;

	public readonly iid = leaf ( 0 ) ;

	constructor ( i : types.player )
	{
		this.frame_time = leaf ( i.frame_time ?? 20 ) ;
		this.tempo = leaf ( i.tempo ?? 120 ) ;
		this.current = leaf ( i.current_time ?? 0 ) ;
		this.state = leaf.r ( i.state ?? false ) ;
	}

	public toggleplay () { this.state.value ? this.stop () : this.start () ; }
	public togglecontinue () { this.state.value ? this.suspend () : this.resume () ; }

	public start ()
	{
		if ( this.state.value ) return ;
		this.current.value = 0 ;
		this.resume () ;
	}

	public stop ()
	{
		this.current.value = 0 ;
		this.suspend () ;
	}

	public resume ()
	{
		if ( this.state.value ) return ;
		this.iid.value = setInterval ( () => this.oninterval () , this.frame_time.value ) ;

		this.currenttime = new Date () .getTime () ;
		this.offset [ set_value ] ( this.currenttime / 1000 ) ;
		this.state [ set_value ] ( true ) ;
	}

	protected oninterval ()
	{
		const now = new Date () .getTime () ;
		const timediff = now - this.currenttime ;
		this.currenttime = now ;
		const progress = ( this.tempo.value / 60 ) * ( timediff / 1000 ) * this.resolution ;
		this.current.value += progress ;
	}

	public suspend ()
	{
		if ( ! this.state.value ) return ;
		this.state [ set_value ] ( false ) ;
		clearInterval ( this.iid.value ) ;
	}

	protected render ( current : number , length : number )
	{
		;
	}
}
