import { Life , Live , Ease , Renn , Order , ef , pl , DOM } from "../Meh/Meh.js" ;

const log = console.log ;

namespace DM
{
	export type node = { title : string ; parts : node [] } ;

	export type Node = Ease < node > ;
	export type Nodes = Ease < node [] > ;
}

namespace VM
{
	const sample : DM.node =
	{
		title : "Node" ,
		parts :
		[
			{ title : "おおみや" , parts : [] } ,
			{ title : "とろ" , parts : [] } ,
			{ title : "ひがしおおみや" , parts : [] } ,
		]
	} ;

	export class App
	{
		root : DM.Node = Ease ( sample ) ;

		constructor ()
		{
			this.root ;
		}
	}
}

namespace VC
{
	const css = /* CSS */ `
	
	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	.FC { display : flex ; flex-direction : column ; }
	.FR { display : flex ; flex-direction : row ; }
	.OA { overflow : auto ; }
	.PGMM { padding : 1ex ; gap : 1em ; }
	.PGMX { padding : 1ex ; gap : 1ex ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }
	.TC { text-align : center ; }
	
	h1 { text-align : center ; }

	.Tree
	{
		width : min( 40em , 100% ) ;

		border : 0.2ex  solid  hsl( 50  2%  50% ) ;
		border-radius : 0.3ex ;

		overflow : auto ;
		padding : 1ex ;
	}

	ul.Nodes
	{
	}

	li.Node
	{
		list-style : none ;
	}
	
	
	` ;

	export const App = () =>
	{
		const app = new VM.App ;

		log ( app.root.parts.renn.length.$ )

		const main = ef.main
		(
			{ class : "FC PGMX AC" } ,
			ef.h1 ( "PQ-1" ) ,
			Tree ( app.root ) ,
		) ;

		return ef.div ( { shadow : css } , main ) ;
	}

	const Node = ( node : DM.Node ) => ef.li
	(
		{ class : "Node" } ,
		node.title
	) ;

	const Nodes = ( nodes : DM.Nodes ) => ef.ul
	(
		{ class : "Nodes" } ,
		pl.each
		(
			nodes.renn ,
			node => Node ( node )
		)
	) ;

	const Tree = ( node : DM.Node ) => ef.section
	(
		{ class : "Tree" } ,
		Node ( node ) ,
	) ;

}


DOM.add ( VC.App () , "body" )
