import { leaf , Renn , dom , ef , pl , log } from "../meh/index.js" ;

export namespace vc
{
	export const App = () =>
	{
		return ef.article
		(
			ef.h1 ( "URL Navi" ) ,
			ef.section
			(
				ef.p ( "「ブラウザ内ブラウザ」演習" )
			)
		)
	};
}
