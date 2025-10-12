import { Ease , Live , Renn , Order , DD , ef , pl , DOM } from "../../Meh/Meh.js" ;
const log = console.log ;


export namespace DM
{
	export type node =
	{
		title : string ;
		parts : node [] ;
	}

	export type Node = Ease < node > ;
	export type Nodes = Ease < node [] > ;
}



export namespace VM
{
	const sample : DM.node =
	{
		title : "Extreem" ,
		parts :
		[
		//	{ title : "人より 力持ち" , parts : [] } ,
		//	{ title : "ふるさと 後にして" , parts : [] } ,
		//	{ title : "みんなの 人気者" , parts : [] } ,
		]
	}

	export class Applet
	{
		public readonly root : DM.Node = Ease ( sample ) ;
		public readonly ct = Live ( 0 ) ;

		constructor ()
		{
			testTree ( this.root ) ;
		}
	}

	export const newPart = ( node : DM.Node ) : void =>
	{
		node.parts.insert ( [ { title : "Node" , parts : [] } ] ) ;
	}

	export const testTree = ( node : DM.Node ) : number =>
	{
		node.parts.clear () ;
		
		let ct = 0;

		const create = ( limit : number , path : number [] = [] ) : DM.node [] =>
		{
			if ( limit <= 0 )  return [] ;

			log ( path.join ( "." ) )
			
			return each
			(
				r ( 3 , 6 ) ,
				i =>
				{
					ct ++ ;
					const ipath = [ ... path , i + 1 ] ;
					const rt =
					{
						title : `Recursion ${ ipath.join ( "-" ) }` ,
						parts : create ( limit - 1 , ipath )
					}
					return rt ;
				}
			) ;
		}

		node.parts.insert ( create ( 3 ) ) ;
		log ( ct ) ;
		return ct ;
	}

	const each = < T > ( length : number , fn : ( i : number ) => T ) : T [] =>
	{
		const rt : T [] = Array ( length ) ;
		for ( let i = 0 ; i < length ; i ++ )  rt [ i ] = fn ( i ) ;
		return rt ;
	}

	const r = ( min : number , max : number ) => Math.floor ( min + Math.random () * ( ( max - min ) + 1 ) ) ; 
}



export namespace VC
{
	const rootCSS = /* CSS */ `

		* { margin : 0 ; padding : 0 ; box-sizing : border-box ; }

		.FR { display : flex ; }
		.FC { display : flex ; flex-direction : column ; }
		.JC { justify-content : center ; }
		.AC { align-items : center ; }
		.FWR { flex-wrap : wrap ; }
		.PGMM { padding : 1em ; gap : 1em ; }
		.PGMX { padding : 1em ; gap : 1ex ; }
		.PGXX { padding : 1ex ; gap : 1ex ; }
` ;

	const css = /* css */ `

		:host {}

		h1 { padding : 1ex ; text-align : center ; }

		.TEST { background : aqua ; }

		.TREE
		{
			width : clamp( 300px , 33em , 100% ) ;
			background : hsl( 210  100%  45% / 5% ) ;

			font-size : 1.2rem ;
		}

		.NODES:not(:empty)
		{
			display : flex ;
			flex-direction : column ;

			padding-block : 1ex 1ex ;
			padding-inline : 3em 1ex ;

			gap : 0.8ex ;

			font-size : 0.908em ;
		}
	
		.NODE
		{
			border : 0.4ex  solid  hsl( 0  0%  0% / 70% ) ;
			border-radius: 2.5ex ;

			background : hsl( 180  100%  45% / 5% ) ;

			list-style : none ;
			cursor : default ;
			overflow : hidden ;

			transition : background-color 0.2s ,  border-color 0.2s ;
		}

		/* .NODE:hover
		{
			border-color : hsl( 185  50%  50% ) ;
			background : hsl( 185  100%  100% ) ;
		} */

		.NODE > .HEAD
		{
			font-size : max( 1.2em , 0.5rem ) ;

			border-radius : 0.2ex ;
			background : hsl( 0  0%  0% / 7% ) ;

			display : grid ;
			height : 2.2em ;

			padding-inline : 1em ;

			grid-template-columns : auto 1fr auto  auto  auto ;
			align-items : center ;
			
			gap : 0.6ex ;
			white-space : nowrap ;
		}

		.NODE:hover > .HEAD
		{
			background : hsl( 0  0%  0% / 10% ) ;
		}

		.NODE > .HEAD > .TITLE
		{
			border-radius : 0.0ex ;
			padding-inline : 1ex ;
		}

		.NODE > .HEAD > .COMMAND
		{
			border : none ; border-radius : 1ex ;  background : none ;  font-size : 70% ;
			padding : 0.5ex 0.4ex ;
		}

		.NODE .COMMAND:hover
		{
			background : hsl( 28  10%  88% ) ;
		}

		a { text-decoration : none ; color : hsl( 0  0%  37% ) ; }
	
	` ;

	export const Applet = () : DD.Node =>
	{
		const vm = new VM.Applet ;

		return ef.main
		(
			{ class : "FC AC PGXX TEST" , shadow : [ rootCSS , css ] } ,
			ef.h1 ( "Extreem" ) ,
			ef.section
			(
				{ class : "TREE" } ,
				Node ( vm , vm.root ) ,
			) ,
			ef.footer
			(
				{ class : "FR PGMM" } ,
				ef.a ( { attrs : { href : "./zz-index.html" } } , "index" ) ,
				ef.a
				(
					{
						attrs :
						{
							href : "https://github.com/hirosphere/Zenn/blob/gh-pages/25/Meh-25-6/ts-src/Book/AG_1/Extreem.ts" ,
							target : "_blank"
						} ,
					} ,
					"ts-src"
				)
			)
		) ;
	} ;

	const Nodes = ( appVM : VM.Applet , dm : DM.Nodes ) : DD.Node =>
	{
		return ef.ul
		(
			{ class : "NODES" } ,
			pl.each
			(
				dm.renn ,
				( p ) => Node ( appVM , p )
			)
		) ;
	}

	const Node = ( app : VM.Applet , node : DM.Node ) : DD.Node =>
	{
		return ef.li
		(
			{ class : "NODE AC" } ,
			ef.span
			(
				{ class : "HEAD" } ,
				Command ( "+" , "" , () => 0  ) ,
				ef.span ( { class : "TITLE" } , node.title ) ,
				Command ( "CLR" , "Clear" , () => node.parts.clear () ) ,
				Command ( "TREE" , "New Tree" , () => app.ct.$ = VM.testTree ( node ) ) ,
				Command ( "PART" , "New Part" , () => VM.newPart ( node ) ) ,
			) ,
			Nodes ( app , node.parts )
		) ;
	}

	const Command = ( title : string , tip : string , oper : () => void ) => ef.button
	(
		{
			class : "COMMAND" ,
			attrs : { title : tip } ,
			passive : { click ( ev ) { oper () ; } }
		} ,
		title
	) ;


	export const main = () =>
	{
		DOM.add ( ef.body ( { shadow : rootCSS } , Applet () ) , "html" ) ;
	}
		
}
