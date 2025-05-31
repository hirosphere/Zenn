import { leaf , Renn , ef , pl , dom , log } from "../../meh/index.js" ;

export const Clock = () =>
{
	const time = leaf ( "" ) ;

	const update = () =>
	{
		time.value = new Date () .toLocaleString () ;
	}

	setInterval ( update , 1000 ) ;

	update () ;

	return ef.main
	(
		{ class : "CLOCK_PAGE BS FV PXX JC AC" } ,
		ef.section
		(
			{ class : "_MAIN" } ,
			time ,
		)
	) ;
}
