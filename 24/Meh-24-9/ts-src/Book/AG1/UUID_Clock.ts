import { leaf , ef , log } from "../../meh/index.js" ;
import { HeartRails } from "../data-api/hr-ekimei.js" ;

namespace VM
{
	export class Eki
	{
		name = leaf ( "えき" ) ;
		current = leaf ( 0 ) ;

		station_list : HeartRails.station [] = [] ;

		constructor ( line : string , public readonly phase : number )
		{
			this.init ( line ) ;
			setInterval ( () => this.next () , 40 + phase * 0 ) ;
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
				new VM.Eki ( "京成本線" , 0 ) ,
				new VM.Eki ( "東武伊勢崎線" , 1 ) ,
				new VM.Eki ( "東武東上本線" , 2 ) ,
				new VM.Eki ( "西武池袋線" , 3 ) ,
				new VM.Eki ( "西武新宿線" , 4 ) ,
				new VM.Eki ( "JR山手線" , 5 ) ,
				new VM.Eki ( "東京メトロ有楽町線" , 6 ) ,
				new VM.Eki ( "東京メトロ千代田線" , 7 ) ,
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

		setInterval ( oninterval , 60000 ) ;

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
			ef.p
			(
				{
					class : "FH WRAP JC" ,
					style : { gap : "1em" , fontSize : "30px" ,
						lineHeight : "1em" ,
					}
				} ,
				... vm.eki.map ( vm => Eki ( vm ) ) ,
			)
		) ;
	}

	const Eki = ( vm : VM.Eki ) =>
	{
		return ef.span
		(
			{
				style :
				{
					minWidth : "8em" ,
					fontFamily : "sans serif" ,
					textAlign : "center" ,
					color : `hsl( ${ 80 + vm.phase * 360 / 20 } 50% 50% )` ,
				}
			} ,
			vm.name ,
		) ;
	}
}

export const UUID_Clock = VC.Applet ;
