import { leaf , df , ef , log  , dom } from "../../meh/index.js" ;
import { HeartRails } from "../data-api/hr-ekimei.js" ;

namespace VM
{
	export class Applet
	{
		uuid : item = { make_label : () => crypto.randomUUID () } ;

		clock : item = { make_label : () => df ( "YY.MM.DD (B) hh:mm:ss" ) }

		eki = new VM.Eki.App
		([
			"東京メトロ銀座線" ,
			"東京メトロ丸ノ内線" ,
			"東京メトロ日比谷線" ,
			"東京メトロ東西線" ,
			"東京メトロ千代田線" ,			
			"東京メトロ有楽町線" ,			
			"東京メトロ半蔵門線" ,			
			"東京メトロ南北線" ,			
			"東京メトロ副都心線" ,
			"都営浅草線" ,
			"都営三田線" ,
			"都営新宿線" ,
			"都営大江戸線" ,
			"日暮里・舎人ライナー" ,
			"新交通ゆりかもめ",
			"都電荒川線" ,
		]) ;
	}

	export type item =
	{
		interval ? : number ;
		make_label ? : () => string ;
	}	
}

namespace VM.Eki
{
	export class App
	{
		items : Item [] ;

		constructor ( lines : string [] )
		{
			this.items = lines.map ( ( name , i ) => new Item ( name , i ) ) ;
		}
	}

	export class Item
	{
		name = leaf ( "えき" ) ;
		current = leaf ( 0 ) ;

		station_list : HeartRails.station [] = [] ;

		constructor ( line : string , public readonly phase : number )
		{
			this.init ( line ) ;
			setInterval ( () => this.next () , 1200 + phase * 10 ) ;
		}

		protected async init ( line : string )
		{
			this.station_list = await HeartRails.get_stations ( line ) ;
			this.update () ;
		}

		next ()
		{
			const next = this.current.$ + 1 ;
			this.current.$ = next < this.station_list.length ? next : 0 ;
			this.update () ;
		}

		protected update ()
		{
			this.name.$ = this.station_list[ this.current.$ ]?.name ?? "--" ;
		}
	}
}

namespace VC
{
	export const Applet = () =>
	{
		const vm = new VM.Applet ;

		return ef.main
		(
			{ class : "FV PXX AC" } ,

			ef.h1 ( "UUID_CLOCK" ) ,

			Item ( vm.clock ) ,
			Item ( vm.uuid ) ,
			ef.p
			(
				{
					class : "FH WRAP JC" ,
					style :
					{
						gap : "1em" ,
						fontSize : "calc( 36px )" ,
						lineHeight : "1em" ,
					}
				} ,
				... vm.eki.items.map ( vm => Eki ( vm ) ) ,
			)
		) ;
	}

	const Item = ( vm : VM.item ) : dom.MehElement =>
	{
		const label = leaf ( "" ) ;

		const update = () =>
		{
			label.$ = vm.make_label ?.() ?? "" ;
		}

		update () ;

		setInterval ( update , vm.interval ?? 1000 ) ;

		return ef.span
		(
			{
				style :
				{
					fontSize : "20px" ,
				}
			} ,
			label
		) ;
	}

	const Eki = ( vm : VM.Eki.Item ) =>
	{
		const hue = 45 + vm.phase / 12 * 140 ;

		return ef.span
		(
			{
				style :
				{
					width : "8em" ,
					display : "flex" ,
					overflow : "hidden" ,
					padding : "0.6ex 1.0ex" ,
					fontFamily : "sans serif" ,
					textAlign : "center" ,
					whiteSpace : "nowrap" ,
					backgroundColor : `hsl( ${ hue } 0% 0% )` ,
					color : `hsl( ${ hue }  2%  80% )` ,
				}
			} ,
			vm.name ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
