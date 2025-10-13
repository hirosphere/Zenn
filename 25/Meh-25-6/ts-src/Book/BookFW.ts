import { Live , Renn , Key , ef , pl , DD } from "../Meh/Meh.js" ;

const log = console.log ;

export namespace VM
{
	/* Navi */

	export class Navi
	{
		public readonly page = new Key ( Live < Index | undefined > ( undefined ) ) ;
		public readonly root : Index ;

		constructor ( index : index )
		{
			this.root = new Index ( this , index ) ;
		}
	}	


	/* Index */

	export type index =
	{
		type : string ;
		title : string ;
		open ? : boolean ;
		parts ? : { [ name : string ] : index }
	}

	export class Index
	{
		public readonly type : string ;
		public readonly name : Live.str ;
		public readonly title : Live.str ;
		public readonly parts : Renn < Index > ;

		public readonly url : Live.R.str ;
		public readonly page : Key.Match < Index | undefined > ;
		public readonly has_parts : Live.R.bool ;
		public readonly open : Live.bool ;

		constructor
		(
			navi : Navi ,
			i : index ,
			public readonly com ? : Index ,
			name ? : string
		)
		{
			this.type = i.type ;
			this.title = Live ( i.title ) ;
			this.name = Live ( name ?? "" ) ;
			this.url = Live ( "?" + name ) ;

			this.page = navi.page.match ( this ) ;
			this.open = Live ( i.open ?? false ) ;

			const parts = Object.entries ( i.parts ?? {} ) .map ( ( [ name , i ] ) => new Index ( navi , i , this , name ) ) ;
			this.parts = new Renn ( parts ) ;

			this.has_parts = this.parts.length.trans_r ( length => length > 0 ) ;
		}
	}

}


export namespace VC
{
	export const Index = ( vm : VM.Index ) : DD.Node =>
	{
		return ef.section
		(
			{ class : [ "INDEX" , { SEL : vm.page } ] } ,
			ef.section
			(
				{ class : "INDEX_HEAD" } ,
				Link ( vm ) ,
				Thumb ( vm ) ,
			) ,
			pl.key
			(
				vm.open ,
				state => ( state && vm.has_parts.$ ) ? Parts ( vm ) : undefined
			) ,
		) ;
	}

	export const Link = ( vm : VM.Index ) : DD.Node =>
	{
		const click = ( ev : MouseEvent ) =>
		{
			vm.page.select () ;
			ev.preventDefault () ;
		} ;

		return ef.a
		(
			{ class : "_LINK" , active : { click } } ,
			vm.title
		) ;
	}

	const Thumb = ( vm : VM.Index ) : DD.Node =>
	{
		const click = ( ev : MouseEvent ) : void =>
		{
			vm.open.$ = vm.has_parts.$ && ! vm.open.$
			ev.preventDefault () ;
		} ;

		return ef.span
		(
			{
				class : "INDEX_THUMB" ,
				active : { click } ,
			} ,
			vm.open.trans_r ( thumb_ch ) ,
		)
	} ;

	const thumb_ch = ( s : boolean ) : string => s ? ">" : "*" ;

	const Parts_ = ( vm : VM.Index ) => ef.p ( vm.title ) ;

	const Parts = ( vm : VM.Index ) : DD.Node => ef.ul
	(
		{ class : "INDEX_PARTS" } ,
		pl.each ( vm.parts , pvm => ef.li ( Index ( pvm ) ) ) ,
	) ;
}

