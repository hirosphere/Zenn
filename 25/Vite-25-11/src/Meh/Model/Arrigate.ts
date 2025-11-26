
import { Agg , agg_echan } from "./Life.js" ;
import { Live , ls_set , ls_get , ls_notify } from "./LiveState.js" ;

import { Renn } from "./Renn.js" ;

const log = console.log ;


/* */

export type Row < E , EL extends Live < any > > = Live < E [] > & Agg &
{
	get renn () : Renn < EL > ;

	at ( pos : number ) : EL | undefined ;
	insert ( vals : E [] , start ? : number ) : void ;
	delete ( start : number , length : number ) : void ;
	clear () : void ;
}

export abstract class RowCore < E , EL extends Live < any > >  extends Live.Core < E [] >  implements Row < E , EL >
{
	constructor ( vals : E [] , agg ? : Agg )
	{
		super ( agg ) ;
		this.insert ( vals ) ;
	}

	/* */

	public [ ls_set ] ( vals : E [] , ch ? : object ) : void
	{
		this.clear () ;
		this.insert ( vals , 0 ) ;
	}

	public [ ls_get ] () : E []
	{
		return this.#_renn.orders.map ( o => o.target.$ ) ;
	}

	/* */

	get renn () : Renn < EL > { return this.#_renn ; }

	public at ( pos : number ) : EL | undefined
	{
		return this.#_renn.at ( pos ) ?.target ;
	}
	
	public insert ( vals : E [] , start ? : number ) : void
	{
		this.#_renn.insert
		(
			vals.map ( val => this.createElement ( val ) , start ) ,
			start
		) ;
	}

	public delete ( start : number , length : number ) : void { this.#_renn.delete ( start , length ) ; }
	public clear () : void { this.#_renn.clear () ; }

	/* */

	public [ agg_echan ] () : void
	{
		this [ ls_notify ] ( undefined ) ;
	}

	protected abstract createElement ( val : E ) : EL ;

	#_renn = new Renn < EL > ( [] , this ) ;
}
