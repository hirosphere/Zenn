import { leaf , selector , dom , defs , ef , forms , log } from "../meh/index.js" ;
import { Clock } from "./q-clock.js" ;

const ents = Object.entries ;

namespace vm
{
	export class App
	{
		gr1 = { "lf" : "長波" , "mw" : "中波" , "sw" : "短波" , "vhf" : "超短波" ,  } ;

		sel1 = selector ( "mw" );
	}

	export type opts = { [ key : string ] : string } ;
}

namespace vc
{
	export const App = () =>
	{
		const m = new vm.App ;
		
		return ef.article
		(
			ef.h2 ( "Article 1" ) ,
			GroupA ( forms.next_ru () , m.gr1 , m.sel1 ) ,
			GroupA ( forms.next_ru () , m.gr1 , m.sel1 ) ,
			GroupA ( forms.next_ru () , m.gr1 , m.sel1 ) ,

			Clock ( { style : { fontSize : "1.9em" } } ) ,
		)
	} ;

	const GroupA = ( name : string , m : vm.opts , sel : selector < string > ) =>
	{
		return ef.section
		(
			ef.h3 ( "Group A" ) ,
			ef.section
			(
				{ class : "fl-bar" },
				... radios ( name , m , sel ),
				ef.b ( { style : { width : "5em" } } , "[ " , sel.current , " ]" ),
			)
		) ;
	}

	const radios = ( name : string , m : vm.opts , sel : selector < string > ) =>
	{
		return ents ( m ) .map
		(
			( [ key , label ] ) => radio ( sel.make_item ( key ) , name , key , label )
		)
		.flat () ;
	}

	const radio = ( m : selector.Item < string > , name : string , key : string , label : string ) =>
	{
		const input = ef.input
		(
			{
				attrs :
				{
					type : "radio" ,
					autocomplete : "off" ,
					name ,
					value : key ,
					checked : m ,
				},
				props :
				{
					checked : m ,
				} ,
				acts :
				{
					change()
					{
						m.select () ;
					}
				}
			}
		);

		return ef.label ( input , label ) ;
	}
}

export const main = () =>
{
	dom.add
	(
		ef.main
		(
			ef.h1 ( "Form Quest" ) ,
			vc.App ()
		),
		"body"
	);
}

