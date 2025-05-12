import { leaf , df , ef , log } from "../../meh/index.js" ;
import { HeartRails } from "../data-api/hr-ekimei.js" ;

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

namespace VM.UUID
{
	export class App
	{
		datetime = leaf.str ( "" );

		constructor ()
		{
			this.update () ;
			
			setInterval ( () => this.update () , 1000 )
		}

		update ()
		{
			this.datetime.$ = df ( "MMDDhhmmss" , new Date ) ;
		}
	}

	export class Item
	{
		constructor
		(
			datetime : leaf.str ,
			digit : number
		)
		{
			datetime.conv ( t => t [ digit ] ) ;
		}
	}
}

namespace VC
{
	export const Applet = () =>
	{
		const vm =
		{
			uuid : new VM.UUID.App () ,
			eki : new VM.Eki.App 
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
			])
		}

		return ef.main
		(
			{ class : "FV PXX AC" } ,

			ef.h1 ( "UUID_CLOCK" ) ,

			ef.p
			(
				{
					style :
					{
						fontSize : "4.0vw" ,
						textAlign : "center" ,
						fontFamily : "serif" ,
						color : "oklch( 0.5  0  0 )" ,
					}
				} ,
				vm.uuid.datetime
			) ,
			ef.p
			(
				{
					class : "FH WRAP JC" ,
					style :
					{
						gap : "1em" ,
						fontSize : "calc( 30px + 2vw )" ,
						lineHeight : "1em" ,
					}
				} ,
				... vm.eki.items.map ( vm => Eki ( vm ) ) ,
			)
		) ;
	}

	const Eki = ( vm : VM.Eki.Item ) =>
	{
		return ef.span
		(
			{
				style :
				{
					minWidth : "5em" ,
					fontFamily : "sans serif" ,
					textAlign : "center" ,
					color : `hsl( ${ 40 + vm.phase * 360 / 20 } 80% 40% )` ,
				}
			} ,
			vm.name ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
