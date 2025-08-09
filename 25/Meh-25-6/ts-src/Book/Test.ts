import { Life , Leaf , Compo } from "../Meh/Model/LiveState.js" ;

const change_ref = () =>
{
	log ( "change ref" ) ;

	const st = Leaf.create ( 0 ) ;

	Leaf.addRef ( st , { vChan() { log ( st.$ ) } , lTerm() {} } ) ;

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

type todo =
{
	title : string ;
	completed : boolean ;
}

const acc_1 = () =>
{
	( s : Compo < todo > ) =>
	{
		s.title.$ += " (重要)" ;
		s.completed.$ = false ;
	}

	( s : Compo < 10 > ) =>
	{
		Leaf.addRef ( s , { lTerm(){  } } )
		s.$ = 10 ;
	} ;
}

type todo_app =
{
	title : string ;
	list : todo [] ;
}

const acc_2 = ( app : Compo < todo_app > ) =>
{
	app.list.insert ( [ { title : "銅山おこし" , completed : false } ] ) ;
}

const log = console.log ;

export const main = () =>
{
	log ( "STATE" ) ;

	change_ref () ;
}

