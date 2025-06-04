import { leaf , Renn , ksel , navi , ef , pl , MehElement , log } from "../../meh/index.js" ;

namespace VM
{
	export class Applet
	{
		listsel_1 = listsel
		(
			[ "秋葉原" , "浅草橋" , "両国" , "錦糸町" , "亀戸" , "平井" , "新小岩" , "小岩" , "市川" , "本八幡" ]
		) ;

		listsel_2 = listsel
		(
			[ "上中里" , "田端" , "西日暮里" , "日暮里" , "鶯谷" , "上野" , "御徒町" , "秋葉原" , "神田" , "東京" ]
		) ;
	}

	export type listsel = { items : string [] ; sel : ksel < number > } ;

	const listsel = ( items : string [] ) =>
	{
		return null ||
		{
			items ,
			sel : ksel ( -1 ) ,
		}
	}
}


namespace VC
{
	const css = /* css */ `

	:host
	{
		display : flex ;
		flex-direction : column ;
		align-items : center ;
		gap : 1ex ;
	}

	button
	{
		height : 3em ;
		padding : 0 1em ;
	}

	.SELECTOR
	{
		display : flex ;
		gap : 0.1ex ;
	}
	
	.SELECTED
	{
		background : oklch( 50%  0%  0 ) ;
		color : oklch( 100%  0%  0 ) ;
	}

	.CONTENT
	{
		max-width : 800px ;
		width : 100% ;
		background : oklch( 100%  0%  0 ) ;
		text-align : center ;
		font-size : 36px ;
	}

	` ;

	export const Applet = ( vm : VM.Applet = new VM.Applet ) : MehElement =>
	{
		return ef.main
		(
			{ shadow : { css } } ,

			ef.h1 ( "Curr Focus" ) ,
			Selector ( vm.listsel_1 ) ,
			ContentSwitch ( vm.listsel_1 ) ,

			Selector ( vm.listsel_2 ) ,
			ContentSwitch ( vm.listsel_2 ) ,
		) ;
	}

	/* */

	const Selector = ( vm : VM.listsel ) : MehElement => ef.section
	(
		{} ,
		ef.section
		(
			{ class : "SELECTOR" } ,
			SelItem ( vm , -1 ) ,
			... vm.items.map ( ( label , key ) => SelItem ( vm , key ) )
		) ,
	) ;

	const SelItem = ( vm : VM.listsel , key : number ) : MehElement =>
	{
		const self = vm.sel.make_item ( key ) ;
		const next = ( key < vm.items.length - 1 ) ? vm.sel.make_item ( key + 1 ) : undefined ;
		const prev = ( key >= 0 ) ? vm.sel.make_item ( key - 1 ) : undefined ;

		const label = vm.items [ key ] ?? ".." ;

		const click = ( ev : MouseEvent ) => self.select () ;

		const keydown = ( ev : KeyboardEvent ) =>
		{
			log ( label , ev.code ) ;
			switch ( ev.code )
			{
				case "ArrowRight" : next?.select () ; break ;
				case "ArrowLeft" : prev?.select () ; break ;
			}
		}

		return  ef.button
		(
			{
				class : { SELECTED : self } ,
				focus : { state : self , tabindex : [ , 0 ] },
				acts : { click , keydown }
			} ,
			label
		) ;
	}

	const ContentSwitch = ( vm : VM.listsel ) : MehElement =>
	{
		return ef.section
		(
			{ class : "CONTENT" } ,
			pl.switch
			(
				vm.sel.current ,
				key => key >= 0 ? ef.p ( vm.items [ key ] )  :  undefined
			)
		) ;
	}
}

export const Curr_Focus = VC.Applet ;