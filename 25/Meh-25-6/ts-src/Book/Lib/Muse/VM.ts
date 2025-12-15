import { Live , Ease , Renn , Key , Store , DD, ef , pl } from "../../../Meh/Meh.js" ;

const log = console.log ;
const ud = undefined ;
type ud = undefined ;


export class Player
{
	prog_q : Live.R.str ;

	constructor
	(
		public ss : Ease < player > ,
	)
	{
		this.ss.run.add_ref ( { vChan : s => this.update_clock () } ) ;
		this.prog_q = this.ss.progress.trans_r ( v => ( v / 960 ).toFixed ( 0 ) )
	}

	public start () : void
	{
		this.ss.run.$ = true ;
	}

	public stop () : void
	{
		this.ss.run.$ = false ;
		this.ss.progress.$ = 0 ;
	}

	public toggleRun () : void
	{
		this.ss.run.$ = ! this.ss.run.$ ;
	}

	/* */

	private onclock () : void
	{
		const clock_sec = 1 / clock_ms ;
		const prog_per_sec = this.ss.tempo.$ / 60 ;
		this.ss.progress.$ += prog_per_sec * clock_sec * 960 ;
	}

	private update_clock () : void
	{
		if ( this.ss.run.$ )
		{
			if ( this.#_clock_id )  return ;
			this.#_clock_id = setInterval ( () => this.onclock () , 10 ) ;
		}
		else
		{
			if  ( this.#_clock_id == 0 )  return ;
			clearInterval ( this.#_clock_id ) ;
			this.#_clock_id = 0 ;
		}
	}

	#_clock_id = 0 ;
}

const clock_ms = 100 ;

export class player
{
	tempo : number ;
	run : boolean ;
	progress : number ;

	constructor ( i : Ease.dp < player > | ud )
	{
		this.tempo = i ?.tempo  ??   120 ;
		this.run   = i ?.run    ?? false ;
		this.progress = i ?.progress ?? 0 ;
	}
}
