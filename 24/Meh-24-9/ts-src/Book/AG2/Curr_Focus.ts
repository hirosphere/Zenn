import { leaf , Renn , ksel , navi , ef , pl , MehElement , log } from "../../meh/index.js" ;

namespace VM
{
	export class Applet
	{
		listsel_1 = new FocusList
		(
			[ undefined , "秋葉原" , "浅草橋" , "両国" , "錦糸町" , "亀戸" , "平井" , "新小岩" , "小岩" , "市川" , "本八幡" ]
		) ;

		listsel_2 = new FocusList
		(
			[ undefined , "上中里" , "田端" , "西日暮里" , "日暮里" , "鶯谷" , "上野" , "御徒町" , "秋葉原" , "神田" , "東京" ]
		) ;
	}

	export class FocusList
	{
		items : FocusItem [] ;
		selection = new ksel.Selector < FocusItem > () ;
		focus = new ksel.Selector < FocusItem > () ;

		constructor ( titles : ( string | undefined ) [] )
		{
			let prev : FocusItem ;
			this.items = titles.map ( title => prev = new FocusItem ( this , title , prev ) ) ;

			this.items [ 0 ] ?.selected .select () ;
			this.items [ 0 ] ?.focuced .select () ;
		}
	};

	export class FocusItem
	{
		selected : ksel.Item < FocusItem > ;
		focuced : ksel.Item < FocusItem > ;
		next ? : FocusItem ;

		constructor
		(
			list : FocusList ,
			public target : string | undefined ,
			public prev ? : FocusItem ,
		)
		{
			this.selected = list.selection.make_item ( this ) ;
			this.focuced = list.focus.make_item ( this ) ;
			prev && ( prev.next = this ) ;
		}
	}
}


namespace VC
{
	const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	:host
	{
		display : flex ;
		flex-direction : column ;
		align-items : center ;
	}

	button
	{
		height : 3em ;
		padding : 0 1em ;
		white-space : nowrap ;
		font-size : 16px ;
	}

	.UNITS
	{
		display : flex ;
		flex-direction : column ;
		align-items : stretch ;
		gap : 1ex ;
	}

	.UNIT
	{
		width : 600px ;

		border : 2px solid oklch( 60%  0%  0 ) ;
		border-radius : 1ex ;

		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		gap : 1ex ;
		align-items : stretch ;
	}

	.SELECTOR
	{
		background : oklch( 90%  0%  150 ) ;
		padding : 1em ;

		display : flex ;
		gap : 0.1ex ;
		overflow : auto ;
	}
	
	.SELECTED
	{
		background : oklch( 50%  0%  0 ) ;
		color : oklch( 100%  0%  0 ) ;
	}

	.CONTENT
	{
		background : oklch( 100%  0%  0 ) ;

		padding : 1em ;
		text-align : center ;
		font-size : 36px ;
	}

	` ;

	export const Applet = ( vm : VM.Applet = new VM.Applet ) : MehElement =>
	{
		return ef.main
		(
			{ class : "BS" , shadow : { css } } ,

			ef.h1 ( "Curr Focus" ) ,

			ef.section
			(
				{ class : "UNITS" } ,
				Unit ( vm.listsel_1 ) ,
				Unit ( vm.listsel_2 ) ,	
			) ,
		) ;
	}

	/* */

	const Unit = ( vm : VM.FocusList ) : MehElement => ef.section
	(
		{ class : "UNIT" } ,

		List ( vm ) ,
		ContentSwitch ( vm ) ,
	) ;

	const List = ( vm : VM.FocusList ) : MehElement => ef.section
	(
		{} ,
		ef.section
		(
			{ class : "SELECTOR" } ,
			... vm.items.map ( item_vm => Item ( item_vm ) )
		) ,
	) ;

	const Item = ( vm : VM.FocusItem ) : MehElement =>
	{
		const keydown = ( ev : KeyboardEvent ) =>
		{
			log ( vm.target , ev.code ) ;
			switch ( ev.code )
			{
				case "ArrowRight" : vm.next ?.focuced.select () ; break ;
				case "ArrowLeft" : vm.prev ?.focuced.select () ; break ;
				default : return ;
			}
			ev.preventDefault () ;
		}

		return  ef.button
		(
			{
				class : { SELECTED : vm.selected } ,
				focus : { state : vm.focuced },
				action : { click () { log ( vm.target , "click" )  ;  vm.selected.select () } } ,
				aa : { keydown }
			} ,
			vm.target ?? ".."
		) ;
	}

	const ContentSwitch = ( vm : VM.FocusList ) : MehElement =>
	{
		return ef.section
		(
			{ class : "CONTENT" } ,
			pl.switch
			(
				vm.selection.current ,
				item => item?.target ? ef.span ( item.target  ) : undefined
			)
		) ;
	}
}

export const Curr_Focus = VC.Applet ;