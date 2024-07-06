
export type path = string ;
export type index = string ;

export type danchi =
{
	title : string ;
	blocks : Record < index, block >
};

export type block =
{
	title : string ;
	buildings : Record < index, building > ;
};

export type building =
{
	title : string,
	rooms : Record < index, room > ;
};

export type room =
{
	title ? : string ;
	available ? : boolean ;
};
