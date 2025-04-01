import { leaf , Renn , ef , pl , dom , log } from "../meh/index.js" ;

export const Clock = () =>
{
	const time = leaf ( "" ) ;

	setInterval
	(
		() =>
		{
			time.value = new Date () .toLocaleString () ;
		},
		1000
	) ;

	return ef.main
	(
		{ class : "CLOCK_PAGE" } ,
		ef.section
		(
			{ class : "_MAIN" } ,
			time ,
		)
	) ;
}
