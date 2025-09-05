
export class Beepka
{
	constructor ()
	{
		;
	}

	/* */

	public beep () : void
	{
		;
	}


	/* */

	#_ac ? : AudioContext ;

	protected get ac () : AudioContext
	{
		if ( this.#_ac )  return this.#_ac ;
		return this.#_ac ??= new AudioContext () ;
	}
}

class Voix
{
	constructor ( protected ac : AudioContext )
	{}
}
