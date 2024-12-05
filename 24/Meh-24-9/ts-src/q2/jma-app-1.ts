import { leaf , Renn , dom , ef , log } from "../meh/index.js" ;
import * as jma from "./map.js" ;

namespace VM
{
	export type IndexKey = leaf < string | undefined > ;

	type node = { name : string , enName ? : string , officeName ? : string , children ? : string [] } ;

	export abstract class Node
	{
		props : node ;

		expanded ;
		parts_maked = false ;
		parts ? : Renn < Node > ;

		constructor ( public readonly code : string )
		{
			this.props = this.get_props ( code ) ;
			this.expanded = leaf ( false , this ) ;
		}

		abstract get_props ( code : string ) : node ;

		update ()
		{
			if ( ! this.parts || this.parts_maked || this.expanded.value == false ) return ;
			this.make_parts () ;
		}

		get title () : string
		{
			return this.props ?.name ?? "---." ;
		}

		make_parts () : void {}
	}

	abstract class Com extends Node
	{
		override parts? = new Renn < Node > ;

		override make_parts() : void
		{
			const parts = this.props.children ?.map
			(
				code => this.mk_part ( code as string )
			) ;

			parts &&  this.parts?.new ( parts ) ;

			this.parts_maked = true ;
		}

		abstract mk_part ( code : string ) : Node ;
	}

	//

	class Class20 extends Node
	{
		override get_props ( code: string ) : node
		{
			return jma.lists.class20s [ code as jma.class20_code ] ;
		}
	}

	class Class15 extends Com
	{
		override get_props ( code: string ) : node
		{
			return jma.lists.class15s [ code as jma.class15_code ] ;
		}

		override mk_part ( code : string ) : Node
		{
			return new Class20 ( code );
		}
	}

	class Class10 extends Com
	{
		override get_props ( code: string ) : node
		{
			return jma.lists.class10s [ code as jma.class10_code ] ;
		}

		override mk_part ( code : string ) : Node
		{
			return new Class15 ( code );
		}
	}

	class Office extends Com
	{
		override get_props ( code: string ) : node
		{
			return jma.lists.offices [ code as jma.office_code ] ;
		}

		override get title () : string
		{
			return `${ this.props.name } (${ this.props.officeName })` ;
		}

		override mk_part ( code : string ) { return new Class10 ( code ) };
	}

	class Center extends Com
	{
		override get_props ( code: string ) : node
		{
			return jma.lists.centers [ code as jma.center_code ] ;
		}

		override get title () : string
		{
			return `${ this.props.name } (${ this.props ?.officeName })` ;
		}

		override mk_part ( code : string ) { return new Office ( code ) };
	}

	export const centers = Object.keys ( jma.lists.centers ).map
	(
		( code ) => new Center ( code )
	) ;
}

namespace VC
{
	export const App = () =>
	{
		return ef.main
		(
			ef.h1 ( "JMA-App 1" ) ,
			ef.p ( "jma-app 1" ) ,
			Centers () ,
		);
	}

	const Centers = (  ) =>
	{
		return ef.ul
		(
			{  } ,
			... VM.centers.map ( i => TreeNode ( i ) )
		) ;
	}

	const TreeNode = ( m : VM.Node ) : dom.defs.element =>
	{
		const button = ef.button
		(
			{
				attrs : { disabled : m.parts == null } ,
				acts : { click () { m.expanded.value = ! m.expanded.value ; } }
			} ,
			m.expanded.cv ( state => state ? "-" : "+" )
		) ;

		const head = ef.span
		(
			{ class : "node-head" } ,

			button ,
			
			ef.span ( m.code ) ,
			ef.span ( m.title ) ,
		) ;

		log ( m.title , m.parts != null )
		const body = m.parts ? ef.ul
		(
			{ class : [ "node-body" , { expanded : m.expanded } ] } ,
			dom.each ( m.parts , o => TreeNode ( o.target ) )
		)
		: undefined ;

		return ef.li ( { class : "tree-node" } , head , body ) ;
	}

	const TabSwitch = (  ) =>
	{
		;
	}
}

export const main = ( ce : string ) =>
{
	dom.add ( VC.App () , ce ) ;
}

