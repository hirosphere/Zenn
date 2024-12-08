import { leaf , ksel , defs , ef } from "../index.js" ;
import { set_value } from "../model/leaf.js";

/* */

export namespace model
{
	/* Select > Option */

	class Select < K >
	{
		constructor
		(
			public readonly ksel : ksel < K > ,
		)
		{}

		protected options = new Map < Element , K > ;

		public add_option ( el : Element , key : K )
		{
			this.options.set ( el , key );
		}

		public remove_option ( el : Element )
		{
			this.options.delete ( el ) ;
		}
	}

	export interface option < K >
	{
		label : leaf.ll < K > ;
		item : ksel.item < K > ;
	}

	/* Radio Button */

	export interface rgroup < K >
	{
		name : string ;
		selector : ksel < K > ;
	}

	export interface radio < K >
	{
	}

	class RadioGroup
	{
		;
	}
}


/* */

export function input ( m : leaf.str , ec : defs.ec < HTMLInputElement > = {} )
{
	return ef.input ( input_ec ( m , ec  ) )
}

export function textarea ( m : leaf.str , ec : defs.ec < HTMLTextAreaElement > = {} )
{
	return ef.textarea ( textarea_ec ( m , ec ) )
}

function input_ec
(
	m : leaf.str ,
	ec : defs.ec < HTMLInputElement > ,
)
{
	return ec =
	{
		props :
		{
			value : m ,
			... ( ec?.props ?? {} )
		} ,

		acts :
		{
			... ( ec ?.acts ?? {} ) ,

			input ( ev )
			{
				if( ev.target instanceof HTMLInputElement )
				{
					m.value = ev.target.value;
				}
			}
		}
	}
}

function textarea_ec
(
	m : leaf.str ,
	ec : defs.ec < HTMLTextAreaElement > ,
)
{
	return ec =
	{
		props :
		{
			value : m ,
			... ( ec?.props ?? {} )
		} ,

		acts :
		{
			... ( ec ?.acts ?? {} ) ,

			input ( ev )
			{
				if( ev.target instanceof HTMLTextAreaElement )
				{
					m.value = ev.target.value;
				}
			}
		}
	}
}

export interface range
{
	title : leaf.ll.str ;
	value : leaf.num ;
	min ? : leaf.ll.num ;
	max ? : leaf.ll.num ;
	step ? : leaf.ll.num ;
	unit ? : leaf.ll.str ;
	to_lv ? : ( value : number ) => string ;
}

export function range ( m : range )
{
	const ec : defs.ec < HTMLInputElement > = {} ;

	ec.attrs =
	{
		type : "range" ,
		autocomplete : "off" ,
		min  : leaf.mk_str ( m.min  ?? 0 ) ,
		step : leaf.mk_str ( m.step ?? 1 ) ,
		max  : leaf.mk_str ( m.max  ?? 100 ) ,
	}

	ec.props =
	{
		value : m.value.mk_str () ,
	}

	ec.acts =
	{
		input ( ev )
		{
			if( ! ( ev.target instanceof HTMLInputElement ) )  return ;
			
			m.value.value = Number ( ev.target.value ) ;
		}
	}

	return ef.section
	(
		{ class : "Range" } ,
		ef.label ( { class : "title" } , m.title ) ,
		ef.input ( ec ) ,
		ef.span
		(
			{ class : "value-unit" } ,
			ef.span ( { class : "value" } , m.value.mk_str ( m.to_lv ) ) ,
			ef.span ( { class : "unit" } , m.unit )
		)
	);
}

export namespace range
{
	export type p = Partial < range > ;
}


/* */



/* */

let next_ru_ctr = 1 ;

export const next_ru = () : string => String ( "ru-" + ( next_ru_ctr ++ ) ) ;

