import { Live , Renn , Key , ef , pl , DD } from "../Meh/Meh.js" ;

const log = console.log ;

export namespace VM
{
	export type type = string | ( ( i : Index ) => DD.Node ) ;

	export type index =
	{
		type : type ;
		title : string ;
		parts ? : { [ name : string ] : index }
	}

	export class Navi
	{
		public readonly page = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly root : Index ;

		constructor ( index : index )
		{
			this.root = new Index ( this , index ) ;
		}
	}	

	export class Index
	{
		public readonly type : type ;
		public readonly name : Live.str ;
		public readonly title : Live.str ;
		public readonly parts : Renn < Index > ;

		public readonly match ;

		constructor ( navi : Navi , i : index , name ? : string )
		{
			this.type = i.type ;
			this.title = Live ( i.title ) ;
			this.name = Live ( name ?? "" ) ;

			const parts = Object.entries ( i.parts ?? {} ) .map ( ( [ name , i ] ) => new Index ( navi , i , name ) ) ;
			this.parts = new Renn ( parts ) ;

			this.match =
			{
				page : navi.page.match ( this ) ,
			}

			log ( "Navi Index" , i.title ) ;
		}
	}

}


export namespace VC
{
	export const PeerNavi = ( m : VM.Index ) : DD.Node =>
	{
		return ef.ul
		(
			{ class : "PEER_NAVI" } ,
			pl.each ( m.parts , t => Index ( t ) ) ,
		) ;
	}

	export const Index = ( m : VM.Index ) : DD.Node =>
	{
		const click = () =>
		{
			m.match.page.select () ;
		}

		return ef.li
		(
			{ class : { SELECTED : m.match.page } } ,
			ef.a
			(
				{ class : "TITLE" , active : { click } } ,
				m.title
			) ,
		) ;
	}
}

