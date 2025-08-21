import { Leaf } from "../Model/Model.js" ;

export class Key < T >
{

	constructor ( public readonly current : Leaf < T | null > = Leaf ( null ) )
	{
		;
	}

	public item ( key : T | null ) : Leaf.RO.From < Match < T > >
	{
		return new Match < T > ( this , null ) ;
	}
}

export class Match < T > extends Leaf.Core.Entity < boolean >
{
	constructor ( public readonly srv : Key < T > , public readonly target : T | null )
	{
		super ( false ) ;
	}

	public set () : void
	{
		this.srv.current.$ = this.target ;
	}
}

type Index = { title : string } ;
const i : Index [] =
[
	{ title : "Poo" } ,
	{ title : "Piglette" }
] ;

const km = new Key < Index > () ;

km.current.$ = i [ 0 ] ;
km.current.$ = null ;

km.item ( { title : "" } ).$ === null ;
km.item ( null ).set () ;

