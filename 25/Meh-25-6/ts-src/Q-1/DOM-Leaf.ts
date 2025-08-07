import { Life , Leaf , leaf , DOM , DD , ef , log } from "../Meh/Meh.js" ;

namespace VM
{
	const new_counter = ( time : number ) : Leaf < number > =>
	{
		const lf = leaf ( 0 ) ;

		setInterval ( () => lf.$ ++ , time ) ;

		return lf ;
	}

	export const ct1 = new_counter ( 1000 ) ;
	export const ct2 = new_counter ( 1200 ) ;
	export const ct3 = new_counter ( 1400 ) ;

	const toggle_ct = new_counter ( 1000 ) ;
	export const toggle1 = toggle_ct.$_conv ( v => ( v & 1 ) != 0 )
	export const toggle2 = toggle_ct.$_conv ( v => ( v & 2 ) != 0 )

}


const tag = ( literals : TemplateStringsArray, ...placeholders: string[] ) =>
{
	;
}

tag `na na ${ VM.ct1.$.toString () } ` ;


namespace VC
{
	export const Sample1 = () : DD.Part =>
	{
		const lfy = leaf < boolean > ( true ) ;
		lfy.$ = false ;

		const lfx : Leaf < boolean > = lfy ;
		lfx.$ = false ;

		const p : DD.Actions =
		{
			keydown ( ev )
			{
				ev.code
			}
		}

		return ef.article
		(
			Class_Sample () ,
			Action_Prevent_Sample () ,
		);
	}

	const Class_Sample = () : DD.Part =>
	{
		return ef.article
		(
			ef.h2 ( "Class" ) ,
			ef.p ( "string , ClassSwitch , Leaf < string > の動作確認。" ,  ) ,

			ef.section ( { class : [ "" , { TestA : VM.toggle1 } ] , style : { transition : "all 0.3s ease" } } , "Sample 1 - " , VM.ct1 ) ,
			ef.section ( { class : [ "" , { TestB : VM.toggle2 } ] } , "Sample 2 - " , VM.ct1 ) ,
			ef.section ( { style : { cursor : "default" } , passive : { click () { alert ( VM.ct1.$ ) } } } ) ,
		) ;
	}

	const Action_Prevent_Sample = () : DD.Part =>
	{
		return ef.article
		(
			ef.h2 ( "Action" ) ,
			ef.p ( "passive と preventDefault() の動作確認。" ) ,

			ef.a ( { attrs : { href : "./zz-index.html" , title: VM.ct1 } } , "Link" ) ,
			ef.a
			(
				{
					attrs : { href : "./zz-index.html" , title: VM.ct2 } ,
					active : { click ( ev ) { ev.preventDefault () } }
				} ,
				ef.s ( "Link" )
			) ,

		)
	}
}


const $ = ef ;

const Counter = () =>
{
	const count = leaf ( 0 ) ;

	return $.div
	(
		$.button ( { passive : { click : () => count.$ -- } } , "-" ) ,
		$.button ( { passive : { click : () => count.$ ++ } } , "+" ) ,
		$.span ( count ) ,
	) ;
}



() => Counter ;

DOM.add
(
	[ "DOM-1 " , 555 , " " , true , " " , false , " " , null , undefined , " - " , VM.ct1 , " , " , VM.ct2 ] ,
	"#q1"
) ;	

DOM.add ( VC.Sample1 () , "#q2" ) ;
