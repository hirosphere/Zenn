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

