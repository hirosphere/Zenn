import { leaf , df , ef  , log  , dom } from "../../meh/index.js" ;
import { HeartRails } from "../data-api/hr-ekimei.js" ;


namespace Qst
{
	const symbols =
	[
		"FLH" ,
		"FLV" ,
		"FLWR" ,
		"BGS" ,
		"BGH" ,
		"PGX"
	] as const ;

	type symbols = typeof symbols [ number ] ;

	const ss : symbols [] = [ "FLH" , "FLWR" , "PGX" ] ;

}

namespace VM
{
	export class Applet
	{
		uuid : Item = { interval : 10000 , make_label : () => crypto.randomUUID () } ;

		clock : Item = { make_label : () => df ( "Y.MM.DD (B) hh:mm:ss" ) }

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

	export type Item =
	{
		interval ? : number ;
		make_label ? : () => string ;
	}	
}

namespace VM.Eki
{
	export class App
	{
		items : Line [] ;

		constructor ( lines : string [] )
		{
			this.items = lines.map ( ( name , i ) => new Line ( name , i ) ) ;
		}
	}

	export class Line
	{
		name = leaf ( "" ) ;
		tranlate = leaf ( "" ) ;
		current = leaf ( 0 ) ;
		dir : "UP" | "DOWN" = "UP" ;

		station_list : HeartRails.station [] = [] ;

		constructor ( line : string , public readonly phase : number )
		{
			this.init ( line ) ;
			setInterval ( () => this.next () , 250 + phase * 1 ) ;
		}

		protected async init ( line : string )
		{
			this.station_list = await HeartRails.get_stations ( line ) ;
			this.update () ;
		}

		next ()
		{
			let cur = this.current.$ ;
			const end = this.station_list.length - 1 ;

			switch ( this.dir )
			{
				case "UP" : if ( cur == end ) this.dir = "DOWN" ; else cur ++ ; break ;
				case "DOWN" : if ( cur == 0 ) this.dir = "UP" ; else cur -- ; break ;
			}

			this.current.$ = cur ;
			this.update () ;
		}

		protected update ()
		{
			const stat = this.station_list[ this.current.$ ] ;
			this.name.$ = stat ?.name ?? "--" ;

			const x = ( stat ?.x - 139.75 ) * 220 ;
			const y = ( 35.7 - stat ?.y ) * 220 ;

			this.tranlate.$ = `${ x }ex  ${ y }ex`
		}
	}

	class Spacer
	{
		css ;

		constructor
		(
			public widthEm : leaf.num
		)
		{
			const space = 0 ;
			const shrink = 1 ;

			this.css =
			{
				letterSpacing : space + "em" ,
				transform : `scale( ${ shrink } , 1 )` ,
				marginRight : - space + "em"	
			}
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
			{ class : "FV AS PPP OA" } ,

			Item ( vm.clock ) ,
			Item ( vm.uuid ) ,
			Lines ( vm.eki ) ,
		)
	}

	const Item = ( vm : VM.Item ) : dom.MehElement =>
	{
		const label = leaf ( "" ) ;

		const update = () =>
		{
			label.$ = vm.make_label ?.() ?? "" ;
		}

		update () ;

		setInterval ( update , vm.interval ?? 1000 ) ;

		return ef.div
		(
			{
				style :
				{
					borderRadius : "0.08ex" ,
					background : "oklch( 100%  0%  0 / 50% )" ,
					padding : "0.03ex 0.8ex" ,
					textAlign : "center" ,
					fontFamily : "Noto Sans JP" ,
					fontSize : "36px" ,
					color : "oklch( 20%  0%  0 / 70% )" ,
				}
			} ,
			label
		) ;
	}

	const Lines = ( vm : VM.Eki.App ) : dom.MehElement => ef.section
	(
		{
			style :
			{
				overflow : "hidden" ,
				display : "grid" ,
				height : "80vh" ,
				minHeight : "30em" ,
				padding : "1ex" ,
				justifyContent : "center" ,
				alignItems : "center" ,
				gap : "0.7em" ,
				fontSize : "calc( 6px + 0.8vw )" ,
				lineHeight : "1em" ,
			}
		} ,
		... vm.items.map ( vm => Line ( vm ) ) ,
	) ;


	const Line = ( vm : VM.Eki.Line ) =>
	{
		const hue = 45 + vm.phase / 12 * 140 ;

		return ef.span
		(
			{
				style :
				{
					gridArea : "1/1" ,
					translate : vm.tranlate ,

					width : "8em" ,
					display : "flex" ,
					overflow : "hidden" ,
					padding : "0.5ex 0.6ex 0.6ex" ,

					whiteSpace : "nowrap" ,
					justifyContent : "center" ,
					alignItems : "center" ,
					
					lineHeight : "1" ,
					backgroundColor : `hsl( ${ hue } 0%  0% / 45% )` ,
					color : `hsl( ${ hue }  2%  80% )` ,
				}
			} ,
			ef.span
			(
				{
					style :
					{
						fontFamily : "Noto Sans JP , Meiryo , sans serif" ,
					}
				} ,
				vm.name ,
			) ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
