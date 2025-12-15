import './style.css'

import { DOM , DD , ef } from "./Meh/Meh.ts" ;

const log = console.log ;

const e = document.getElementById ( "app" ) ;

e && tinyeval ( e ) ;

const f = () : DD.Mel => ef.section
(
	{  } ,
)


function tinyeval( com : Element ) : void
{
	const e = ecr ( com , { type : "section" , class : "EVAL" } ) ;
	const ed = ecr ( e , { type : "section" , class : "EDIT" } ) ;
	const src = ecr ( ed , { type : "textarea" } ) ;
	const output = ecr ( ed , { type : "textarea" } ) ;
	const inp = ecr ( ed , { type : "textarea" } ) ;

	src.value = "1 + 1" ;
	src.addEventListener
	(
		"keydown" ,
		ev =>
		{
			if ( ev.ctrlKey && ev.key == "Enter" )
			{
				let input = inp.value ;
				try { output.value = String ( eval ( src.value ) ) ; }
				catch ( exc ) { output.value = String ( exc ) ; }

				input ;
			}
		},
		{ passive : false }
	) ;
}

type edec < E extends keyof HTMLElementTagNameMap > =
{
	type : E ;
	class ? : string ;
}

function ecr < E extends keyof HTMLElementTagNameMap > ( com : Element , d : edec < E > ) : HTMLElementTagNameMap [ E ]
{
	const e = document.createElement ( d.type ) ;
	if ( d.class )  e.classList.add ( d.class ) ;
	com.appendChild ( e ) ;
	return e ;
}
