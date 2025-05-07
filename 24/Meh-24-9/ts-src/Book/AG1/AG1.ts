import { ef , navi } from "../../meh/index.js" ;
import { PartList } from "../UI/PartList.js" ;


export const Index = ( index : navi.Index ) =>
{
	return ef.main
	(
		{ class : "FV AC PXX" } ,
		ef.h1 ( index.title ) ,
		 ef.p ( "!````" ),
		PartList ( index , "APP_NAVI_PARTS" ) ,
	)
}
