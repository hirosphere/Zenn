import { Lian } from "./meh/index.js";
const log = console.log;


{
	interface LPB
	{
		source : Lian < any > ;
		create : ( item : any ) => void ;
	}

	class LP < T > implements LPB
	{
		source;
		create;

		constructor
		(
			source : Lian < T >,
			create : ( item : T ) => void
		)
		{
			this.source = source;
			this.create = create;
		}
	}

	const clp = < T > ( src : Lian < T >, create : ( item : T ) => void ) => new LP( src, create );

	const l = Lian.create < string > ( [ "a", "b", "c" ] );

	const lp : LPB = new LP < string > ( l, ( v ) => console.log( "LP", v ) );
	
	lp.source.forEach( item => lp.create( item ) );


}

{
	type Element = { type : string };

	interface Context
	{
		( ... parts : Element [] ) : Element ;

		attrs ? : ( attrs : {} ) => Context ;
	}

	const ef = ( type : string ) =>
	{
		const rt : Context = ( ... parts : Element [] ) : Element =>
		{
			return { type };
		}

		rt.attrs = ( attrs ) =>
		{ 
			return rt;
		}

		return rt;
	}

	const div = () => ef( "div" );

	const e : Element | undefined = div().attrs?.({})();
}