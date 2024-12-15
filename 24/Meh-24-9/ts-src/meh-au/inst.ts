
export interface instrument
{
	put_schedule () : void ;
}

export interface schedule
{
	type : string ;
	time ? : number ;
}

export interface note extends schedule
{
	type : "on" | "off" ;
	id : string ;
	key : number ;
	velocity : number ;
}

const note : note = { type : "on" , id : "" , key : 64 , velocity : 1 }