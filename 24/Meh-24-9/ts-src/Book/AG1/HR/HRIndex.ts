import { navi , ef } from "../../../meh/index.js" ;

export const HRIndex : navi.types.index =
{
	name : "HR駅名" ,
	parts : [
		{ name : "東京" , page : index => ef.h1 ( "** " , index.title , " **" ) } ,
		{ name : "名古屋" } ,
		{ name : "大阪" } ,
	] ,
}

