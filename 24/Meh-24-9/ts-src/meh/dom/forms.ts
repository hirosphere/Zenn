import { leaf , ksel , defs , ef } from "../index.js" ;

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

export namespace input
{	
	const ec : defs.ec < HTMLInputElement > =
	{
		attrs :
		{} ,
	}

	export const text = () => ef.input ( ec ) ;
}


/* */



/* */

let next_ru_ctr = 1 ;

export const next_ru = () : string => String ( "ru-" + ( next_ru_ctr ++ ) ) ;

