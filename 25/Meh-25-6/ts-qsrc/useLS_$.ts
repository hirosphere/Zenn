import { Life , LS } from "./LiveState.js" ;

const log = console.log ;



type Craft < T > = LS < T > &
{
	add_ref ( ref : LS.Ref ) : void ;
	remove_ref ( ref : LS.Ref ) : void ;

	set $ ( newv : T ) ;
	get $ () : T ;

	trans < R > ( tr : LS.trans < R , T > ) : Craft < R > ;
}



namespace Craft
{
	class Leaf < T > extends LS.Leaf < T > implements Craft < T >
	{
		public set $ ( newv : T ) { LS.set ( this , newv ) }
		public get $ () : T { return LS.get ( this ) ; }

		public add_ref ( ref : LS.Ref ) : void { LS.add_ref ( this , ref ) ; }
		public remove_ref ( ref : Life.Ref ) : void { Life.remove_ref ( this , ref ) ; }

		public trans < R > ( tr : LS.trans < R , T > ) : Craft < R > { return new Trans ( this , tr ) }
	}

	class Trans < T , S > extends LS.Trans < T , S > implements Craft < T >
	{
		public set $ ( newv : T ) { LS.set ( this , newv ) }
		public get $ () : T { return LS.get ( this ) ; }

		public add_ref ( ref : LS.Ref ) : void { LS.add_ref ( this , ref ) ; }
		public remove_ref ( ref : Life.Ref ) : void { Life.remove_ref ( this , ref ) ; }

		public trans < R > ( tr : LS.trans < R , T > ) : Craft < R > { return new Trans ( this , tr ) ; }
	}

	const ls = new Leaf ( "Primo " ) ;

	ls.add_ref ( { vChan : () => log ( ls.$ ) } ) ;

	ls.$ += "* .. " ;
	ls.$ += "* .. " ;
	ls.$ += "* .. " ;
	ls.$ += "* .. " ;
	
}











