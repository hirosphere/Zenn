import { Life , LS , Ease } from "./LiveState.js" ;

const log = console.log ;

function row_test ()
{
	( row : Ease < string [] > ) =>
	{
		const e = row.at ( 5 ) ;
		e && LS.set ( e , "" ) ;
	}
	
	type xy = { x : number , y : number }
	type shape = { pos : xy , size : xy } ;

	( r : Ease < shape [] > ) =>
	{
		const e = r.at ( 0 ) ;
		e && LS.set ( e.pos.x , 55 ) ;

		LS.get ( r ).map ( v => v.pos.x = 0 ) ;

		e?.pos.x

	}
}


function br_test ()
{
	type xy = { x : number , y : number }

	( ls : Ease < xy > ) =>
	{
		LS.set ( ls.x , 5 ) ;
		LS.set ( ls , { x : 10 , y : 15 } ) ;
	}

	type shape = { pos : xy , size : xy } ;

	( ls : Ease < shape > ) =>
	{
		LS.set ( ls.pos , { x : 75 , y : 4 } ) ;
		LS.set ( ls.pos.x , 5 ) ;
	}
}

function ls_test ()
{
	const ls1 = new LS.Leaf ( 5 ) ;
	const tr1 = new LS.Trans ( ls1 , { get : s => s * 1000 } ) ;

	LS.add_ref
	(
		ls1 ,
		{
			vChan : () => log ( "ls1 vch" , LS.get ( ls1 ) .toFixed ( 0 ) ) ,
			lTerm : () => log ( "ls1 term" )
		}
	) ;

	LS.add_ref
	(
		tr1 ,
		{
			vChan : () => log ( "tr1 vch" , LS.get ( tr1 ).toFixed ( 0 ) ) ,
			lTerm : () => log ( "tr1 term" )
		}
	) ;

	LS.set ( ls1 , 1000 ) ;
	LS.mod ( ls1 , v => v * 0.618 ) ;
	LS.mod ( ls1 , v => v * 0.618 ) ;
	LS.mod ( ls1 , v => v * 0.618 ) ;

	LS.mod ( ls1 , v => v * 1.618 ) ;
	LS.mod ( ls1 , v => v * 1.618 ) ;
	LS.mod ( ls1 , v => v * 1.618 ) ;

	Life.terminate ( ls1 ) ;
}


function life_test ()
{
	const life1 = new Life () ;
	const life2 = new Life () ;
	const life3 = new Life () ;

	Life.add_ref ( life1 , { lTerm : () => log ( "life1 ref term" ) } ) ;

	Life.terminate ( life1 ) ;
	Life.terminate ( life2 ) ;
	Life.terminate ( life3 ) ;
}


// ls_test () ;
// life_test () ;
