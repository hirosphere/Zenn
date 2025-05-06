import { leaf , Renn , navi , ef , pl , log } from "../../meh/index.js" ;

export const PartList = ( index : navi.Index , classname : string ) =>
{
	return ef.ul
	(
		{ class : classname } ,
		pl.each
		(
			index.parts ,
			o => ef.li ( PageLink ( o.target ) ) ,
		)
	) ;
}

const PageLink = ( index : navi.Index ) =>
{
	const link = navi.link
	(
		{
			index ,
			class : [ "APP_NAVI_LINK" , { SELECTED : index.sel_item } ] ,
		}
	) ;

	return link ;
}

