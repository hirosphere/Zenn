import { leaf , ef , log } from "../../meh/index.js" ;
import { HeartRails } from "../data-api/hr-ekimei.js" ;

namespace VM
{
	export class Eki
	{
		name = leaf ( "えき" ) ;
		current = leaf ( 0 ) ;

		station_list : HeartRails.station [] = [] ;

		constructor ( line : string , interval : number )
		{
			this.init ( line ) ;
			setInterval ( () => this.next () , interval ) ;
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
		const sec = leaf ( "" ) ;
		const vm =
		{
			eki : 
			[
				new VM.Eki ( "京成本線" , 1100 ) ,
				new VM.Eki ( "東武伊勢崎線" , 1150 ) ,
				new VM.Eki ( "東武東上本線" , 1200 ) ,
				new VM.Eki ( "西武池袋線" , 1250 ) ,
				new VM.Eki ( "西武新宿線" , 1300 ) ,
				new VM.Eki ( "JR山手線" , 1350 ) ,
				new VM.Eki ( "東京メトロ有楽町線" , 1400 ) ,
				new VM.Eki ( "東京メトロ千代田線" , 1450 ) ,
			]
		}

		const uuid_update = () =>
		{
			sec.value = crypto.randomUUID () ;
		}
		uuid_update () ;
		
		const oninterval = () =>
		{
			uuid_update () ;
		}

		setInterval ( oninterval , 1000 ) ;

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
				sec
			) ,
			... vm.eki.map ( vm => Eki ( vm ) ) ,
		) ;
	}

	const Eki = ( vm : VM.Eki ) =>
	{
		return ef.p
		(
			{
				style :
				{
					fontSize : "42px" ,
					color : "oklch( 0.24  0  0 )" ,
				}
			} ,
			vm.name ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
