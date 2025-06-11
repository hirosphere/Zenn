import { Renn } from "../../meh/index.js" ;

interface Existence
{
	add_ref ( ref : Existence.Ref ) : void ;
}

namespace Existence
{
	export interface Ref
	{
		source_terminate ( source : Existence ) : void ;
	}
}

export interface Node < T extends Node < any > >
{
	get path () : T [] ;

	get com () : T | null ;
	get prev () : T | null ;
	get next () : T | null ;
	get parts () : Renn < T > ;

	part ( pos : number ) : T | null ;
}

interface StringNode extends Node < StringNode >
{
	title : string ;
}

( node : StringNode ) =>
{
	node.title = "" ;
	node.next?.title ;
	node.parts.new ( [ node ] ) ;
	node.part ( 5 ) ?.title
}

