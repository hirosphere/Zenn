import { leaf , Renn , ef , pl , dom , log } from "../meh/index.js" ;
import { fontsets } from "../meh/app/fontsets.js" ;


namespace VM
{
	export class App
	{
		current  : leaf < Item > ;
		items = new Renn < Item >
		(
			Array( 8 ) .fill ( null ) .map ( ( i , n ) => new Item ( "Pad" + ( n + 1 ) ) )
		) ;

		constructor ()
		{
			this.current = leaf ( this .items .orders [ 0 ] .target ) ;
		}

		execute ()
		{
			this.current.value.execute () ;
		}
	}

	export class Item
	{
		code = leaf ( sample ) ;
		output = leaf ( "" ) ;
		input = leaf ( "" ) ;
		e ? : Element ;

		timer = new Timer ;

		constructor ( public title : string )
		{}

		execute ()
		{
			const input = this.input.value ;
			const e = this.e ;
			const timer = this.timer ;
			fontsets ;

timer.action = () =>
{

}

			try
			{
				this.output.value = eval ( this.code.value ) ;
			}
			catch ( err )
			{
				this.output.value = String ( err ) ;
			}
		}
	}

	class Timer
	{
		p_action ? : () => boolean | void ;
		iid = 0 ;

		set action ( action : () => boolean | void | undefined )
		{
			this.p_action = action ;
			
			if ( this.iid )
			{
				clearInterval ( this.iid ) ;
			}
			
			if ( action ) this.iid = setInterval ( action , 1000 ) ;
		}
	}

	const fontFamilies =
	{
		"sans-serif": "Arial, Helvetica, Roboto, 'Noto Sans JP', sans-serif",
		"serif": "Times New Roman, Georgia, 'Yu Mincho', 'Noto Serif JP', serif",
		"monospace": "Courier New, Consolas, 'Source Code Pro', 'Noto Mono', monospace",
		"cursive": "Comic Sans MS, 'Brush Script', 'Lucida Handwriting', 'Noto Sans JP', cursive",
		"fantasy": "Impact, Papyrus, 'Copperplate', 'Noto Sans JP', fantasy"
	};

	[
		[ "serif", "Times New Roman", "Georgia", "Droid Serif", "Liberation Serif" ],
		[ "sans-serif", "Arial", "Helvetica", "Roboto", "'Noto Sans JP'", "Segoe UI", "Ubuntu", "Open Sans" ],
		[ "monospace", "Courier New", "Menlo", "Droid Sans Mono", "Liberation Mono" ],
		[ "cursive", "Brush Script MT", "Apple Chancery", "Dancing Script", "Satisfy" ],
		[ "fantasy", "Comic Sans MS", "Papyrus", "Cursiva", "Impact" ]
	] ;


	const font_sets =
	[
		[ "serif", "Times New Roman", "Georgia", "Droid Serif", "Liberation Serif" ],
		[ "serif", "Merriweather", "Times New Roman", "Georgia", "'Noto Serif'", "Liberation Serif" ],
		[ "serif", "'Merriweather'", "'Georgia'", "'Tisa'", "'Roboto Slab'" ],
		[ "serif", "'Times New Roman'", "'Georgia'", "'Palatino'", "'Liberation Serif'" ],
		[ "serif", "'Playfair Display'", "'Merriweather'", "'Lora'", "'Roboto Slab'" ],


		[ "sans-serif", "Arial", "Helvetica", "Roboto", "'Noto Sans JP'", "Segoe UI", "Ubuntu", "Open Sans" ],
		[ "sans-serif", "'Helvetica Neue'", "'Roboto'", "'Open Sans'", "'Inter'", "'Noto Sans'" ],
		[ "sans-serif", "'Roboto'", "'Lato'", "'Montserrat'", "'Source Sans Pro'", "'Poppins'" ],
		[ "sans-serif", "'Helvetica Neue'", "'Arial'", "'Segoe UI'", "'Ubuntu'", "'Nunito'" ],
		[ "sans-serif", "'Arial'", "'Verdana'", "'Tahoma'", "'Trebuchet MS'", "'Segoe UI'" ],


		[ "monospace", "Courier New", "Menlo", "Droid Sans Mono", "Liberation Mono" ],
		[ "monospace", "'Fira Code'", "'Source Code Pro'", "'Inconsolata'", "'Consolas'" ],
		[ "monospace", "'Courier New'", "'Consolas'", "'Ubuntu Mono'", "'DejaVu Sans Mono'" ],
		[ "monospace", "'Roboto Mono'", "'Space Mono'", "'IBM Plex Mono'", "'Source Code Pro'" ],
		[ "monospace", "Courier", "Monaco", "Lucida Console", "Consolas" ],
		
		
		[ "cursive", "Brush Script MT", "Apple Chancery", "Dancing Script", "Satisfy" ],
		[ "cursive", "'Dancing Script'", "'Pacifico'", "'Satisfy'", "'Allura'" ],
		[ "cursive", "'Great Vibes'", "'Pacifico'", "'Sacramento'", "'Dancing Script'" ],
		[ "cursive", "'Dancing Script'", "'Satisfy'", "'Sacramento'", "'Lobster'" ],
		[ "cursive", "Comic Sans MS", "Brush Script MT", "Zapfino", "Mistral" ],


		[ "fantasy", "Comic Sans MS", "Papyrus", "Cursiva", "Impact" ],
		[ "fantasy", "Papyrus", "Impact", "Charlemagne", "Rockwell" ],
		[ "fantasy", "Garamond", "Algerian", "Papyrus", "Rockwell Extra Bold" ],
		[ "fantasy", "'Caveat Brush'", "'Rock Salt'", "'Russo One'", "'Ultra'" ],
		[ "fantasy", "Comic Sans MS", "Impact", "Forte", "Blippo" ]
	] ;
	  
}

export const EvalPage = () =>
{
	const vm = new VM.App ;

	return ef.main
	(
		{ class : "EVAL_PAGE" } ,
		ef.section
		(
			{ class : "EVAL_PAGE_BAR" } ,
			"Eval " , vm.current .value .title ,
			ef.button
			(
				{ acts : { click : () => vm.execute () } } ,
				"Eval"
			)
		) ,
		pl.switch
		(
			vm.current ,
			cur => Eval ( cur ) ,
		) ,
	)
}

const Eval = ( vm : VM.Item ) =>
{
	return ef.section
	(
		{ class : "EVAL" } ,
		ef.section
		(
			{ class : "EVAL_EDIT" } ,
			ef.textarea ( { class : "EVAL_CODE" , binds : { value_input : vm.code } } ) ,
			ef.textarea ( { class : "EVAL_OUTPUT" , binds : { value_input : vm.output } } ) ,
			ef.textarea ( { class : "EVAL_INPUT" , binds : { value_input : vm.input }  } ) ,
		) ,
		ef.section ( { class : "EVAL_DISPLAY" , hook : { init ( el ) { vm.e = el ; } } } ) ,
	)
}

const sample =
`const color = e.style.color = \`hsl( 0 , 0% , 0% , \${ 70 - Math.random() * 40 }% )\` ;
e.style.fontSize = \`\${ 50 + Math.random() * 0 }px\` ;
e.innerHTML = crypto.randomUUID () ;
`;
