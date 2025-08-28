import { Life , Leaf , Renn , Order , Live , DD , ef , pl , DOM } from "../../Meh/Meh.js" ;
const log = console.log ;


export namespace DM
{
	export type node =
	{
		title : string ;
		parts : node [] ;
	}

	/* */

	export type Nodes = Live < node [] >
	export type Node = Live < node > ;
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
		public readonly root = Live ( sample ) ;
		public readonly ct = Leaf ( 0 ) ;

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
		node.parts.renn.clear () ;
		
		let ct = 0;

		const create = ( limit : number , path : number [] = [] ) : DM.node [] =>
		{
			if ( limit <= 0 )  return [] ;
			
			return each
			(
				r ( 4 , 5 ) ,
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
			width : clamp( 300px , 28em , 100% ) ;

			font-size : 2.0rem ;
		}

		.NODES:not(:empty)
		{
			display : flex ;
			flex-direction : column ;
			padding : 0.3ex 1.1ex 1.1ex 2em ;
			gap : 0.5ex ;

			font-size : 80% ;
		}
	
		.NODE
		{
			border : 0.1ex  solid  hsl( 0  0%  80% ) ;
			border-radius: 2.5ex ;
			list-style : none ;
			cursor : default ;
			overflow : hidden ;

			transition : background-color 0.1s ,  border-color 0.1s ;
		}

		.NODE:hover
		{
			border-color : hsl( 185  50%  50% ) ;
			background : hsl( 185  100%  45% / 14% ) ;
		}

		.NODE .HEAD
		{
			display : grid ;
			height : 2em ;
			grid-template-columns : 1fr auto  auto  auto ;
			padding-inline : 1.0em 1.2em ;
			white-space : nowrap ;
			align-items : center ;
			gap : 1.2ex ;
		}

		.NODE > .HEAD > .TITLE
		{
			border-radius : 0.8ex ;
			padding-inline : 1ex ;

			transition : background-color 0.1s ;
		}

		.NODE:hover > .HEAD > .TITLE
		{
			background : hsl( 0  0%  0% / 60% ) ;
			color : hsl( 0  0%  90% ) ;
		}

		.NODE .COMMAND
		{
			border : none ;  background : none ;  font-size : 70% ;
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
					"ts-src" )
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
				( o ) => Node ( appVM , o.target )
			)
		) ;
	}

	const Node = ( appVM : VM.Applet , node : DM.Node ) : DD.Node =>
	{
		return ef.li
		(
			{ class : "NODE AC" } ,
			ef.span
			(
				{ class : "HEAD" } ,
				ef.span ( { class : "TITLE" } , node.title ) ,
				Command ( "CLR" , "Clear" , () => node.parts.clear () ) ,
				Command ( "TREE" , "New Tree" , () => appVM.ct.$ = VM.testTree ( node ) ) ,
				Command ( "PART" , "New Part" , () => VM.newPart ( node ) ) ,
			) ,
			Nodes ( appVM , node.parts )
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
