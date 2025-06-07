import { leaf , ksel , dom , defs , ef , forms , navi , log } from "../meh/index.js" ;
import { Clock } from "./q-clock.js" ;

const ents = Object.entries ;

namespace vm
{
	export class App
	{
		gr1 = { "LF" : "長波" , "MW" : "中波" , "SW" : "短波" , "VHF" : "超短波" , } ;
		gr2 = { "AM" : "AM" , "FM" : "FM" , "DSB" : "DSB" , "SSB" : "SSB" , "PM" : "PM" , } ;
		gr3 = { "N" : "ノーマル" , "S" : "ソフト" , "H" : "ハード" , "M" : "ミュート"  }

		sel1 = ksel ( "SW" ) ;
		sel2 = ksel ( "AM" ) ;
		sel3 = ksel ( "N" ) ;

		bg = colors () ;

		constructor ()
		{
			const n = new navi.Application ( { title : "Form Quest" , create_root_index : { name : "" , title : "Form Quest" } } ) ;
			n.set_current ( n.root ) ;
		}
	}

	class Colors
	{
		items =
		{
			"green" : [ 90 , 0.5 , 0.5 ] ,
			"blue" : [ 210 , 0.6 , 0.6 ] ,
			"red" : [ 357 , 0.55 , 0.65 ] ,
		};

		color = leaf ( "" ) ;
	}

	const colors = () =>
	{
		const sel = ksel ( "緑" ) ;

		const update = () =>
		{
			// document.documentElement.style.backgroundColor = "hsl( 355, 50% , 50% )" ;
		}

		update () ;

		return { sel }
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
			r_grp ( "波長" , forms.next_ru () , m.gr1 , m.sel1 ) ,
			r_grp ( "波長" , forms.next_ru () , m.gr1 , m.sel1 ) ,
			r_grp ( "変調方式" , forms.next_ru () , m.gr2 , m.sel2 ) ,
			r_grp ( "音質" , forms.next_ru () , m.gr3 , m.sel3 ) ,

			Clock ( { style : { fontSize : "1.9em" } } ) ,
		)
	} ;

	const r_grp = ( title : string , name : string , m : vm.opts , sel : ksel < string > ) =>
	{
		return ef.section
		(
			ef.h3 ( title ) ,
			ef.section
			(
				{ class : "fl-bar" },
				... radios ( name , m , sel ),
				ef.b ( { style : { width : "5em" } } , "[ " , sel.current.mk_str () , " ]" ),
				// ef.input ( { props : { value : sel.current } } ) ,
				select ( m , sel ) ,
			)
		) ;
	}

	const radios = ( name : string , m : vm.opts , sel : ksel < string > ) =>
	{
		return ents ( m ) .map
		(
			( [ key , label ] ) => radio ( sel.make_item ( key ) , name , key , label )
		)
		.flat () ;
	}

	const radio = ( m : ksel.Item < string > , name : string , key : string , label : string ) =>
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
				action :
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

	const select = ( m : vm.opts , sel : ksel < string > ) =>
	{
		const map = new Map < Element , string > ;

		return ef.select
		(
			{
				attrs : { autocomplete : "off" } ,
				action :
				{
					input ( ev )
					{
						if( ! ( ev.target instanceof HTMLSelectElement ) )  return ;

						const i = ev.target.selectedIndex ;
						const opt = ev.target.options [ i ] ;
						const key = map.get ( opt ) ;
						if ( key !== undefined )  sel.current.value = key ;
					},
				}
			},

			... ents ( m ) .map
			(
				( [ key , label ] ) => option
				(
					label ,
					sel.make_item ( key ) ,
					map
				)
			)
		)
	}

	const option =
	(
		label : string ,
		m : ksel.Item < string > ,
		map : Map < Element , string > ,
	
	) => ef.option
	(
		{
			props : { selected : m } ,
			hook :
			{
				init ( el ) { map.set ( el , m.key ) ; } ,
				term ( el ) { map.delete ( el ) ; } ,
			} ,
		} ,
		label
	);
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

