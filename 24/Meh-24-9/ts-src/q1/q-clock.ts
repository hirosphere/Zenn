import { leaf , defs , ef , df , log } from "../meh/index.js" ;


export const Clock = ( ec ? : defs.ec < any > ) =>
{
	const time_str = leaf ( "" ) ;

	const update = () =>
	{
		time_str.value = df ( "Y年 MM月 DD日 B曜日 - hh:mm:ss" , new Date (  ) ) ;
	}

	let iid = setInterval ( update , 1000 ) ;

	update () ;

	return ef.h1( { ... ec } , time_str );
}
