import { Life , State } from "../Meh/Model/LiveState.js" ;

type todo =
{
	title : string ;
	completed : boolean ;
}

const change_ref = () =>
{
	log ( "change ref" ) ;

	const st = State ( 0 ) ;

	st.zzz_addRef ( { vChan() { log ( st.$ ) } , lTerm() {} } ) ;

	st.$ ++ ;
	st.$ ++ ;
	st.$ ++ ;

	st.$ *= 12 ;
	st.$ *= 12 ;
	st.$ *= 12 ;

	st.$ /= 7 ;
	st.$ /= 7 ;
	st.$ /= 7 ;
}

const acc_1 = () =>
{
	( s : State.Deep < todo > ) =>
	{
		s.title.$ += " (重要)" ;
		s.completed.$ = false ;
	}
}


const log = console.log ;

export const main = () =>
{
	log ( "STATE" ) ;

	change_ref () ;
}

